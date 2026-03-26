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

        {/* Dek */}
        <p className="text-muted text-lg leading-relaxed mb-6">{article.dek}</p>

        {/* Byline */}
        <div className="flex items-center gap-4 text-sm text-muted/70 font-mono border-b border-slate/30 pb-6 mb-8">
          <span>By <span className="text-cream">Kanav Gupta</span></span>
          <span className="text-gold/30">·</span>
          <span>{article.date}</span>
          <span className="text-gold/30">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Hero color block */}
        <div
          className="w-full h-56 rounded-lg mb-10"
          style={{ backgroundColor: article.imageColor }}
        />

        {/* Content blocks */}
        <div className="article-body">
          {article.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return (
                <p
                  key={i}
                  className={`text-cream/90 leading-[1.85] text-lg mb-6 ${i === 0 ? 'drop-cap' : ''}`}
                >
                  {block.text}
                </p>
              )
            }

            if (block.type === 'pullquote') {
              return (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="my-10 px-8 border-l-4 border-gold"
                >
                  <p className="font-serif italic text-2xl text-gold leading-relaxed">
                    &ldquo;{block.text}&rdquo;
                  </p>
                </motion.blockquote>
              )
            }

            if (block.type === 'subheading') {
              return (
                <h2
                  key={i}
                  className="font-serif font-bold text-2xl text-cream mt-10 mb-4"
                >
                  {block.text}
                </h2>
              )
            }

            if (block.type === 'annotation') {
              return (
                <aside
                  key={i}
                  className="my-6 p-4 bg-card border border-slate/30 rounded-lg text-sm text-muted font-mono leading-relaxed"
                >
                  <span className="text-gold/60 mr-2">→</span>
                  {block.text}
                </aside>
              )
            }

            return null
          })}
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
