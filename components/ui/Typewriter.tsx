'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  triggerOnMount?: boolean
  className?: string
}

export default function Typewriter({
  text,
  delay = 0,
  speed = 45,
  triggerOnMount = false,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  const trigger = triggerOnMount || inView

  useEffect(() => {
    if (!trigger) return

    setDisplayed('')
    setDone(false)

    let intervalId: ReturnType<typeof setInterval>

    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [trigger, text, delay, speed])

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className={done ? 'cursor-blink done' : 'cursor-blink'} aria-hidden>|</span>
    </span>
  )
}
