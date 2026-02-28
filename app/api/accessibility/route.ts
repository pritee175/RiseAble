'use server'

import { prisma } from '@/lib/prisma'
import { AccessibilitySettingsSchema } from '@/lib/validations/accessibility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * GET /api/accessibility
 * Fetch accessibility settings for the current user
 * Returns default settings if none exist
 */
export async function GET(req: NextRequest) {
  try {
    // For now, we'll use a mock userId
    // In production, replace with: const userId = await getSessionUserId()
    const userId = req.headers.get('x-user-id') || 'demo-user-1'

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: No user ID provided' },
        { status: 401 }
      )
    }

    // Ensure a User row exists for this userId (required by FK)
    const existingUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!existingUser) {
      // Create a minimal user record so FK constraint is satisfied.
      // In production, remove this and rely on real auth/user provisioning.
      await prisma.user.create({ data: { id: userId, email: `${userId}@local` } })
    }

    // Try to find existing settings
    let settings = await prisma.accessibilitySettings.findUnique({
      where: { userId },
    })

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.accessibilitySettings.create({
        data: {
          userId,
          voiceNavigation: false,
          screenReader: false,
          highContrast: false,
          largeText: false,
          keyboardNav: false,
        },
      })
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error('Error fetching accessibility settings:', error)
    // provide more details in dev
    const message =
      error instanceof Error ? error.message : 'Unknown error'
    if (process.env.NODE_ENV !== 'production') {
      // include stack for debugging
      if (error instanceof Error) console.error(error.stack)
    }
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : message,
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/accessibility
 * Update accessibility settings for the current user
 */
export async function PUT(req: NextRequest) {
  try {
    // For now, we'll use a mock userId
    // In production, replace with: const userId = await getSessionUserId()
    const userId = req.headers.get('x-user-id') || 'demo-user-1'

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: No user ID provided' },
        { status: 401 }
      )
    }

    // Ensure a User exists for FK as well
    const existingUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!existingUser) {
      await prisma.user.create({ data: { id: userId, email: `${userId}@local` } })
    }

    // Parse and validate request body
    const body = await req.json()
    const validatedData = AccessibilitySettingsSchema.parse(body)

    // Update settings
    const updatedSettings = await prisma.accessibilitySettings.upsert({
      where: { userId },
      update: validatedData,
      create: {
        userId,
        ...validatedData,
      },
    })

    return NextResponse.json(updatedSettings, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating accessibility settings:', error)
    const message =
      error instanceof Error ? error.message : 'Unknown error'
    if (process.env.NODE_ENV !== 'production') {
      if (error instanceof Error) console.error(error.stack)
    }
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : message,
      },
      { status: 500 }
    )
  }
}
