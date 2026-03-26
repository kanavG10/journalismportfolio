'use client'

import { motion } from 'framer-motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface RedactionRevealProps {
  text: string
  as?: Tag
  staggerDelay?: number
  initialDelay?: number
  className?: string
}

export default function RedactionReveal({
  text,
  as: Tag = 'span',
  staggerDelay = 0.06,
  initialDelay = 0,
  className,
}: RedactionRevealProps) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="relative inline-block mr-[0.25em]">
          {word}
          <motion.span
            className="absolute inset-0 bg-[var(--navy)]"
            style={{ transformOrigin: 'left center' }}
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: initialDelay + i * staggerDelay,
              ease: [0.4, 0, 0.2, 1],
            }}
            aria-hidden
          />
        </span>
      ))}
    </Tag>
  )
}
