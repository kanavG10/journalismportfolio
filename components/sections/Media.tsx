'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const photos = [
  { id: 1, color: '#1a3a5c', aspect: 'tall', caption: 'Lorem ipsum dolor sit amet' },
  { id: 2, color: '#2d1a3e', aspect: 'wide', caption: 'Consectetur adipiscing elit' },
  { id: 3, color: '#1a3020', aspect: 'square', caption: 'Sed do eiusmod tempor' },
  { id: 4, color: '#3a2010', aspect: 'tall', caption: 'Incididunt ut labore et dolore' },
  { id: 5, color: '#0d2a3a', aspect: 'wide', caption: 'Magna aliqua ut enim' },
  { id: 6, color: '#2a1a0d', aspect: 'square', caption: 'Quis nostrud exercitation' },
  { id: 7, color: '#1a2a1a', aspect: 'tall', caption: 'Ullamco laboris nisi aliquip' },
  { id: 8, color: '#2a0d1a', aspect: 'wide', caption: 'Duis aute irure dolor' },
  { id: 9, color: '#0d1a2a', aspect: 'square', caption: 'Excepteur sint occaecat' },
]

const aspectClasses: Record<string, string> = {
  tall: 'h-72',
  wide: 'h-40',
  square: 'h-52',
}

export default function Media() {
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null)

  return (
    <SectionWrapper id="media" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase mb-4">
          [ MEDIA ]
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-12">
          Lorem &amp; Ipsum
        </h2>

        {/* Masonry-style columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightbox(photo)}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
            >
              <div
                className={`w-full ${aspectClasses[photo.aspect]} rounded-lg`}
                style={{ backgroundColor: photo.color }}
              />
              {/* Caption overlay */}
              <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-lg">
                <motion.p
                  className="text-cream text-sm font-mono px-4 py-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  {photo.caption}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              layoutId={`photo-${lightbox.id}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-80 rounded-lg mb-4"
                style={{ backgroundColor: lightbox.color }}
              />
              <p className="text-cream font-serif text-xl mb-1">{lightbox.caption}</p>
              <button
                onClick={() => setLightbox(null)}
                className="mt-4 text-muted text-sm font-mono hover:text-gold transition-colors"
              >
                ← Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
