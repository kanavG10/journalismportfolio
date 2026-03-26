'use client'

import { motion } from 'framer-motion'
import TypewriterCycle from '../ui/TypewriterCycle'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Halftone background */}
      <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* AP Wire dateline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs text-harker tracking-[0.35em] uppercase mb-6"
        >
          LEADERSHIP TRANSITIONS // MARCH 2026
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 1.05 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="font-serif font-bold text-cream leading-none mb-6"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
        >
          Kanav Gupta
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-gold mx-auto mb-6"
        />

        {/* Cycling typewriter subtitle */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-muted text-xl md:text-2xl font-sans tracking-wide">
            <TypewriterCycle
              phrases={['Journalist', 'Assistant STEM Editor', ' Writer', 'Shreyas Karnam........enthusiast.']}
              speed={70}
              deleteSpeed={35}
              pauseMs={1800}
            />
          </p>
        </div>

        {/* Bio line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-muted/70 text-base mt-8 max-w-xl mx-auto leading-relaxed"
        >
          <span className="font-mono text-xs text-harker tracking-[0.2em] uppercase mr-2"></span>
          Assistant STEM Editor for{' '}
          <span className="text-gold/80 font-medium">Harker Journalism</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-2.5 bg-gold text-navy font-sans font-semibold text-sm rounded hover:bg-gold/90 transition-colors tracking-wide"
          >
            View my work
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-2.5 border border-muted/30 text-muted font-sans text-sm rounded hover:border-gold hover:text-gold transition-colors tracking-wide"
          >
            About me
          </a>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="text-muted/50 w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
