"use client"

import { useEffect, useState } from 'react'

export function useVoiceNavigation(enabled: boolean) {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition is not available in this browser')
      setIsListening(false)
      return
    }

    const recognizer = new SpeechRecognition()
    recognizer.continuous = true
    recognizer.interimResults = false
    recognizer.lang = 'en-US'

    recognizer.onstart = () => setIsListening(true)

    recognizer.onresult = (e: any) => {
      try {
        let transcript = e.results[e.results.length - 1][0].transcript.trim().toLowerCase()
        // strip punctuation to improve matching (user might say "jobs." etc)
        const normalized = transcript.replace(/[^\w\s]/g, '')
        console.log('[voice] command:', transcript, 'normalized:', normalized)

        // Very basic command matcher: click a button or link whose text includes the normalized phrase
        const interactive = Array.from(document.querySelectorAll('button, a, [role="button"]')) as HTMLElement[]
        let match = interactive.find((el) => {
          const txt = (el.textContent || '').toLowerCase()
          return txt.includes(normalized)
        })
        // if not found, try startsWith (user said the beginning of a label)
        if (!match && normalized) {
          match = interactive.find((el) => {
            const txt = (el.textContent || '').toLowerCase()
            return txt.startsWith(normalized)
          })
        }
        if (match) {
          console.log('[voice] matched element', match)
          // scroll into view if necessary
          match.scrollIntoView({ behavior: 'smooth', block: 'center' })
          match.click()
        } else {
          console.log('[voice] no matching element for', transcript)
        }
      } catch (err) {
        console.error('[voice] onresult error', err)
      }
    }

    recognizer.onerror = (ev: any) => {
      console.warn('[voice] recognition error', ev)
      setIsListening(false)
    }

    recognizer.onend = () => setIsListening(false)

    try {
      recognizer.start()
    } catch (err) {
      console.warn('[voice] could not start recognition', err)
      setIsListening(false)
    }

    return () => {
      try {
        recognizer.stop()
      } catch (e) {
        /* ignore */
      }
      setIsListening(false)
    }
  }, [enabled])

  return isListening
}
