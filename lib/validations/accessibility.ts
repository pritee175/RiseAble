import { z } from 'zod'

export const AccessibilitySettingsSchema = z.object({
  voiceNavigation: z.boolean().default(false),
  screenReader: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  largeText: z.boolean().default(false),
  keyboardNav: z.boolean().default(false),
})

export type AccessibilitySettings = z.infer<typeof AccessibilitySettingsSchema>

export const AccessibilitySettingsResponseSchema = AccessibilitySettingsSchema.extend({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type AccessibilitySettingsResponse = z.infer<
  typeof AccessibilitySettingsResponseSchema
>



