'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getArticle } from '@/data/articles'
import { notFound } from 'next/navigation'

const categoryColors: Record<string, string> = {
  Features: 'text-gold border-gold',
  STEM: 'text-blue-400 border-blue-400',
  News: 'text-red-400 border-red-400',
  Opinion: 'text-gray-400 border-gray-400',
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = getArticle(slug)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!article) return notFound()

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-slate/20">
        <motion.div
          className="h-full bg-gold origin-left"
          style={{ scaleX: progress / 100 }}
          initial={{ scaleX: 0 }}
        />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6 pt-28 pb-20"
      >
        {/* Back nav */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-muted text-sm font-mono hover:text-gold transition-colors mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back to work
        </Link>

        {/* Category badge */}
        <span
          className={`inline-block text-xs font-mono tracking-widest uppercase border px-2 py-0.5 rounded mb-5 ${categoryColors[article.category]}`}
        >
          {article.category}
        </span>

        {/* Title */}
        <h1 className="font-serif font-bold text-cream leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {article.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-4 text-sm text-muted/70 font-mono border-b border-slate/30 pb-6 mb-8">
          <span>By <span className="text-cream">Kanav Gupta</span></span>
          <span className="text-gold/30">·</span>
          <span>{article.date}</span>
          <span className="text-gold/30">·</span>
        </div>

        {/* Hero color block */}
        <div
          className="w-full h-56 rounded-lg mb-10"
          style={{ backgroundColor: article.imageColor }}
        />

        {/* Content blocks */}
        <div className="article-body">
          <a
            href={article.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy font-semibold text-sm rounded hover:bg-gold/90 transition-colors tracking-wide"
          >
            Read full article
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h5m0 0v5m0-5l-9 9" />
            </svg>
          </a>
        </div>

        {/* End ornament */}
        <div className="ornament-divider mt-14 mb-8">
          <span className="font-serif text-lg">✦</span>
        </div>

        {/* Back link bottom */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted text-sm font-mono hover:text-gold transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Return home
        </Link>
      </motion.article>
    </>
  )
}
