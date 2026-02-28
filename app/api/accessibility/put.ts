'use server'

import { prisma } from '@/lib/prisma'
import { AccessibilitySettingsSchema } from '@/lib/validations/accessibility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
