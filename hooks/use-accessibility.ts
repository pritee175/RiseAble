'use client'

import { AccessibilitySettings } from '@/lib/validations/accessibility'
import { useEffect, useState, useCallback } from 'react'

const DEFAULT_SETTINGS: AccessibilitySettings = {
  voiceNavigation: false,
  screenReader: false,
  highContrast: false,
  largeText: false,
  keyboardNav: false,
}

interface UseAccessibilityReturn {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
  isLoading: boolean
  error: string | null
}

export function useAccessibility(userId?: string): UseAccessibilityReturn {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/accessibility', {
          method: 'GET',
          headers: {
            'x-user-id': userId || 'demo-user-1',
          },
        })

        if (!response.ok) {
          // attempt to read body for details
          let msg = response.statusText
          try {
            const err = await response.json()
            if (err && err.error) msg = err.error
          } catch {
            // ignore
          }
          throw new Error(`Failed to fetch settings: ${response.status} ${msg}`)
        }

        const data = await response.json()
        setSettings({
          voiceNavigation: data.voiceNavigation,
          screenReader: data.screenReader,
          highContrast: data.highContrast,
          largeText: data.largeText,
          keyboardNav: data.keyboardNav,
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching accessibility settings:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        // apply defaults so components can render without crashing
        setSettings(DEFAULT_SETTINGS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [userId])

  // Update single setting
  const updateSetting = useCallback(
    (key: keyof AccessibilitySettings, value: boolean) => {
      const newSettings = { ...settings, [key]: value }
      setSettings(newSettings)
      persistSettings(newSettings, userId)
    },
    [settings, userId]
  )

  // Update multiple settings
  const updateSettings = useCallback(
    (newSettings: Partial<AccessibilitySettings>) => {
      const merged = { ...settings, ...newSettings }
      setSettings(merged)
      persistSettings(merged, userId)
    },
    [settings, userId]
  )

  // Helper function to persist settings to backend
  const persistSettings = async (
    data: AccessibilitySettings,
    userId?: string
  ) => {
    try {
      const response = await fetch('/api/accessibility', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId || 'demo-user-1',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let msg = response.statusText
        try {
          const err = await response.json()
          if (err && err.error) msg = err.error
        } catch {
          // ignore
        }
        throw new Error(`Failed to save settings: ${response.status} ${msg}`)
      }

      setError(null)
    } catch (err) {
      console.error('Error saving accessibility settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    }
  }

  return {
    settings,
    updateSetting,
    updateSettings,
    isLoading,
    error,
  }
}
