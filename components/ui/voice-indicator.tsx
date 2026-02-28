import React from 'react'

type Props = {
  isListening: boolean
}

export default function VoiceIndicator({ isListening }: Props) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md text-sm">
      <span
        aria-hidden
        className={`w-3 h-3 rounded-full transition-colors duration-150 ${
          isListening ? 'bg-rose-500 shadow-[0_0_10px_rgba(255,99,132,0.35)]' : 'bg-neutral-300'
        }`}
      />
      <span className="sr-only">Voice navigation status</span>
      <span className="text-xs text-neutral-700 dark:text-neutral-200">{isListening ? 'Listening' : 'Idle'}</span>
    </div>
  )
}
