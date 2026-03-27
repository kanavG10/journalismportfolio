'use client'

import SectionWrapper from '../ui/SectionWrapper'
import ArticleCard from '../ui/ArticleCard'
import BreakingTicker from '../ui/BreakingTicker'
import RedactionReveal from '../ui/RedactionReveal'
import { getAllArticles } from '@/data/articles'

export default function FeaturedWork() {
  const articles = getAllArticles()

  return (
    <SectionWrapper id="work" className="py-24 px-6">
      {/* Breaking ticker — full bleed */}
      <div className="-mx-6 mb-10">
        <BreakingTicker items={articles.map((a) => a.title)} />
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase mb-4">
          [ FEATURED WORK ]
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-12">
          <RedactionReveal text="Featured articles" as="span" />
        </h2>
        <p className="text-muted text-sm mb-10"> I wanted to branch out to start my career on staff, and that meant writing at least one article
          in each section. While I haven't had the opportunity to write a Feature article quite just yet, I was pretty excited by the opportunity
          to cover my first A&E event! Just a very small sample size here, check out the rest on Aquila, and more Cycle 7 articles coming through!
          
          
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
