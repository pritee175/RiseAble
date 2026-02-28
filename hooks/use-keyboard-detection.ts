"use client"

import { useEffect } from 'react'

/**
 * Adds transient keyboard navigation outlines when the user presses Tab.
 * If `forceEnable` is true, keeps outlines enabled persistently.
 */
export function useKeyboardDetection(forceEnable: boolean) {
  useEffect(() => {
    const root = document.documentElement
    let autoEnabled = false

    function enable() {
      if (!root.classList.contains('keyboard-nav')) root.classList.add('keyboard-nav')
      root.setAttribute('data-keyboard-nav', 'true')
      autoEnabled = true
    }

    function disable() {
      if (!forceEnable) {
        root.classList.remove('keyboard-nav')
        root.removeAttribute('data-keyboard-nav')
        autoEnabled = false
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') enable()
    }

    function onPointer() {
      // If the user moves the mouse or clicks, disable transient keyboard outlines
      if (autoEnabled && !forceEnable) disable()
    }

    if (forceEnable) enable()

    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('mousemove', onPointer, true)
    window.addEventListener('mousedown', onPointer, true)

    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('mousemove', onPointer, true)
      window.removeEventListener('mousedown', onPointer, true)
      if (!forceEnable) disable()
    }
  }, [forceEnable])
}
