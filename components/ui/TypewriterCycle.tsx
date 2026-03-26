'use client'

import { useEffect, useState } from 'react'

interface TypewriterCycleProps {
  phrases: string[]
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
  className?: string
}

type Phase = 'typing' | 'pausing' | 'deleting' | 'switching'

export default function TypewriterCycle({
  phrases,
  speed = 70,
  deleteSpeed = 35,
  pauseMs = 1800,
  className,
}: TypewriterCycleProps) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  useEffect(() => {
    const current = phrases[phraseIndex]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, speed)
        return () => clearTimeout(t)
      } else {
        setPhase('pausing')
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), pauseMs)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, deleteSpeed)
        return () => clearTimeout(t)
      } else {
        setPhase('switching')
      }
    }

    if (phase === 'switching') {
      setPhraseIndex((i) => (i + 1) % phrases.length)
      setPhase('typing')
    }
  }, [displayed, phase, phraseIndex, phrases, speed, deleteSpeed, pauseMs])

  return (
    <span className={className}>
      {displayed}
      <span className="docs-cursor" aria-hidden>
        <span className="docs-cursor-flag">Kanav</span>
        <span className="docs-cursor-line" />
      </span>
    </span>
  )
}
