'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const layouts = [
  {
    id: 'layout-a',
    label: 'Layout A',
    description: 'Placeholder — drop your first page layout image here.',
  },
  {
    id: 'layout-b',
    label: 'Layout B',
    description: 'Placeholder — drop your second page layout image here.',
  },
]

export default function PageLayouts() {
  const [active, setActive] = useState(0)

  return (
    <SectionWrapper id="layouts" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase mb-4">
          [ PAGE LAYOUTS ]
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
          My current pages from Winged Post.
        </h2>
        <p className="text-muted text-sm mb-10"> My first issue as an assistant working on Winged Post 
          was a new experience, as shown by Layout A, learning how to navigate inDesign and the intricacies of the layout process. However,
          I felt much more comfortable with the process by the time I was working on Layout B, and was more proud of the final product!
        </p>

        {/* Winged tabs */}
        <div className="flex items-center gap-0 mb-8">
          <div className="flex-1 h-px bg-slate/40" />
          {layouts.map((layout, i) => (
            <button
              key={layout.id}
              onClick={() => setActive(i)}
              className={`relative px-6 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                active === i
                  ? 'text-navy bg-gold'
                  : 'text-muted hover:text-cream bg-transparent'
              }`}
            >
              {layout.label}
            </button>
          ))}
          <div className="flex-1 h-px bg-slate/40" />
        </div>

        {/* Layout preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/layout-${active === 0 ? 'a' : 'b'}.jpeg`}
              alt={layouts[active].label}
              className="w-full rounded-lg border border-slate/30"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
