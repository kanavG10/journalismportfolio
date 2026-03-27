'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionWrapper from '../ui/SectionWrapper'

const photos = [
  { id: 1, src: '/images/photo1.jpg', width: 4928, height: 3264 },
  { id: 2, src: '/images/photo2.jpg', width: 3264, height: 4928 },
  { id: 3, src: '/images/photo3.jpg', width: 3264, height: 4928 },
  { id: 4, src: '/images/photo4.jpg', width: 4928, height: 3264 },
  { id: 5, src: '/images/photo5.jpg', width: 3264, height: 4928 },
  { id: 6, src: '/images/photo6.jpg', width: 4928, height: 3264 },
  { id: 7, src: '/images/photo7.jpg', width: 2864, height: 4369 },
  { id: 8, src: '/images/photo8.jpg', width: 4928, height: 3264 },
  { id: 9, src: '/images/photo9.jpg', width: 4928, height: 3264 },
]

export default function Media() {
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null)

  return (
    <SectionWrapper id="media" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase mb-4">
          [ MEDIA ]
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-12">
          Photos
        </h2>
        <p className="text-muted text-sm mb-10"> 4 words: Can't. Wait. For. Mirrorless. I'm proud of my progress with my handy DSLR by my side,
          and can't wait for the next chapter of my photo career!
        </p>

        {/* Masonry columns — images keep natural aspect ratio */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(photo)}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
            >
              <Image
                src={photo.src}
                alt={`Photo ${photo.id}`}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto rounded-lg block"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-6-3v6m-3-3h6" />
                </svg>
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={`Photo ${lightbox.id}`}
                width={lightbox.width}
                height={lightbox.height}
                className="rounded-lg object-contain max-w-[90vw] max-h-[90vh] w-auto h-auto"
                quality={100}
                priority
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
