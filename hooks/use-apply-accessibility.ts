'use client'

import { AccessibilitySettings } from '@/lib/validations/accessibility'
import { useEffect } from 'react'

/**
 * Hook to apply accessibility settings globally to the document
 * Handles CSS classes, attributes, and other global state changes
 */
export function useApplyAccessibilitySettings(
  settings: AccessibilitySettings
) {
  useEffect(() => {
    const root = document.documentElement

    // Apply High Contrast Mode
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply Large Text
    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    // Apply Keyboard Navigation (explicit preference)
    if (settings.keyboardNav) {
      root.classList.add('keyboard-nav')
      // Enable outline on focus
      root.setAttribute('data-keyboard-nav', 'true')
    } else {
      // leave removal to keyboard-detection hook for transient behavior
      root.removeAttribute('data-keyboard-nav')
      root.classList.remove('keyboard-nav')
    }

    // Apply Screen Reader Mode (adds semantic ARIA attributes)
    if (settings.screenReader) {
      root.setAttribute('data-screen-reader', 'true')
      // Could add aria-live regions, etc.
    } else {
      root.removeAttribute('data-screen-reader')
    }

    // Apply Voice Navigation flag
    if (settings.voiceNavigation) {
      root.setAttribute('data-voice-nav', 'true')
    } else {
      root.removeAttribute('data-voice-nav')
    }

  }, [settings])
}
