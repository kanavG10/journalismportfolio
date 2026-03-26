
type AquilaArticle = {
  title: string
  link: string
  description: string
  pubDate: string
  author: string
  categories: string[]
  thumbnail: string | null
}

async function fetchAquilaArticles(): Promise<{ articles: AquilaArticle[]; filtered: boolean }> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch('https://harkeraquila.com/feed', {
      next: { revalidate: 3600 },
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio RSS reader)' },
    })
    clearTimeout(timeout)
    if (!res.ok) return { articles: [], filtered: false }

    const xml = await res.text()
    const items = parseItems(xml)
    const kanavsArticles = items.filter((a) => a.author.toLowerCase().includes('kanav'))
    const articles = kanavsArticles.length > 0 ? kanavsArticles : items.slice(0, 6)
    return { articles, filtered: kanavsArticles.length > 0 }
  } catch {
    return { articles: [], filtered: false }
  }
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    'i'
  )
  const m = xml.match(re)
  if (!m) return ''
  return (m[1] ?? m[2] ?? '').trim()
}

function extractAttr(xml: string, tag: string, attr: string): string | null {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i')
  const m = xml.match(re)
  return m ? m[1] : null
}

function parseItems(feed: string): AquilaArticle[] {
  const itemRe = /<item>([\s\S]*?)<\/item>/g
  const items: AquilaArticle[] = []
  let m: RegExpExecArray | null

  while ((m = itemRe.exec(feed)) !== null) {
    const block = m[1]
    const title = extractTag(block, 'title')
    const link = extractTag(block, 'link') || extractAttr(block, 'link', 'href') || ''
    const description = extractTag(block, 'description')
      .replace(/<[^>]+>/g, '')
      .slice(0, 180)
    const pubDate = extractTag(block, 'pubDate')
    const author = extractTag(block, 'dc:creator') || extractTag(block, 'author') || ''
    const catRe = /<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g
    const categories: string[] = []
    let cm: RegExpExecArray | null
    while ((cm = catRe.exec(block)) !== null) {
      const cat = cm[1].trim()
      if (cat && !categories.includes(cat)) categories.push(cat)
    }
    const thumbnail =
      extractAttr(block, 'media:content', 'url') ||
      extractAttr(block, 'enclosure', 'url') ||
      null
    items.push({ title, link, description, pubDate, author, categories, thumbnail })
  }

  return items
}

function formatDate(pubDate: string): string {
  try {
    return new Date(pubDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return pubDate
  }
}

function pickCategoryColor(categories: string[]): string {
  const cat = categories.join(' ').toLowerCase()
  if (cat.includes('stem') || cat.includes('science') || cat.includes('tech')) return 'text-harker border-harker'
  if (cat.includes('news')) return 'text-red-400 border-red-400'
  if (cat.includes('opinion')) return 'text-gray-400 border-gray-400'
  if (cat.includes('sport')) return 'text-green-400 border-green-400'
  return 'text-gold border-gold'
}

export default async function AquilaFeed() {
  const { articles, filtered } = await fetchAquilaArticles()

  if (articles.length === 0) return null

  return (
    <section className="py-24 px-6 border-t border-slate/20">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase">
            [ LIVE FROM HARKER AQUILA ]
          </p>
          <a
            href="https://harkeraquila.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted hover:text-gold transition-colors flex items-center gap-1.5"
          >
            harkeraquila.com
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3">
          {filtered ? 'My latest articles' : 'Latest from The Aquila'}
        </h2>
        {!filtered && (
          <p className="text-muted text-sm font-mono mb-10">
            Showing recent Aquila articles — byline filtering coming soon.
          </p>
        )}
        <div className="h-px w-16 bg-harker/60 mb-10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <AquilaCard key={article.link} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Client-side animation wrapper needed — export as a separate island if required.
// For now, render as plain card (server component).
function AquilaCard({ article, index }: { article: AquilaArticle; index: number }) {
  const categoryColor = pickCategoryColor(article.categories)
  const displayCategory = article.categories[0] ?? 'Article'

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card rounded-lg overflow-hidden border border-slate/30 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Thumbnail or color block */}
      <div className="relative w-full h-44 overflow-hidden">
        {article.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, #1a3a5c ${index * 20}%, #0d1b2a)`,
            }}
          />
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-mono tracking-widest uppercase border px-2 py-0.5 rounded bg-navy/70 backdrop-blur-sm ${categoryColor}`}>
            {displayCategory}
          </span>
        </div>
        {/* Harker left accent */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-harker opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif font-bold text-lg text-cream group-hover:text-gold transition-colors leading-snug mb-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {article.description}…
          </p>
        )}
        <div className="flex items-center justify-between text-xs font-mono text-muted/60">
          <span>{formatDate(article.pubDate)}</span>
          <span className="text-gold/60 group-hover:text-gold group-hover:translate-x-0.5 transition-all">
            Read →
          </span>
        </div>
      </div>
    </a>
  )
}
