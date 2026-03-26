'use client'

import { motion } from 'framer-motion'
import { Article } from '@/data/articles'

const categoryColors: Record<Article['category'], string> = {
  Features: 'text-gold border-gold',
  STEM: 'text-blue-400 border-blue-400',
  News: 'text-red-400 border-red-400',
  Opinion: 'text-gray-400 border-gray-400',
  Sports: 'text-red-400 border-red-400',
  "A&E": 'text-gray-400 border-gray-400',
}

interface ArticleCardProps {
  article: Article
  large?: boolean
  index?: number
}

export default function ArticleCard({ article, large = false, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04, rotate: -0.8, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.09, ease: [0.175, 0.885, 0.32, 1.275] }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative h-full bg-card rounded-lg overflow-hidden border border-slate/30 transition-all duration-300 group-hover:border-gold/60 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] cursor-pointer">
          {/* Photo or color block */}
          <div className={`w-full ${large ? 'h-64' : 'h-44'} overflow-hidden`}>
            {article.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div
                className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundColor: article.imageColor ?? '#1a2a3e' }}
              />
            )}
            <div className="absolute bottom-3 left-3">
              <span className={`text-xs font-mono tracking-widest uppercase border px-2 py-0.5 rounded bg-navy/70 backdrop-blur-sm ${categoryColors[article.category]}`}>
                {article.category}
              </span>
            </div>
          </div>

          {/* Gold left border accent on hover */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="p-5">
            <h3 className={`font-serif font-bold text-cream group-hover:text-gold transition-colors duration-300 leading-snug mb-2 ${large ? 'text-2xl' : 'text-lg'}`}>
              {article.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted/70 font-mono">
              <span>{article.date}</span>
              <span className="text-gold/60 group-hover:text-gold group-hover:translate-x-0.5 transition-all">
                Read →
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}
