import { NextResponse } from 'next/server'

export const revalidate = 3600 // re-fetch once per hour

type AquilaArticle = {
  title: string
  link: string
  description: string
  pubDate: string
  author: string
  categories: string[]
  thumbnail: string | null
}

function extractTag(xml: string, tag: string): string {
  // Handle both <tag>value</tag> and namespaced <ns:tag>value</ns:tag>
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
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
    const description = extractTag(block, 'description').replace(/<[^>]+>/g, '').slice(0, 200)
    const pubDate = extractTag(block, 'pubDate')
    const author =
      extractTag(block, 'dc:creator') ||
      extractTag(block, 'author') ||
      ''

    // Categories
    const catRe = /<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g
    const categories: string[] = []
    let cm: RegExpExecArray | null
    while ((cm = catRe.exec(block)) !== null) {
      const cat = cm[1].trim()
      if (cat && !categories.includes(cat)) categories.push(cat)
    }

    // Thumbnail — try media:content, enclosure, then wp:featuredmedia
    const thumbnail =
      extractAttr(block, 'media:content', 'url') ||
      extractAttr(block, 'enclosure', 'url') ||
      null

    items.push({ title, link, description, pubDate, author, categories, thumbnail })
  }

  return items
}

export async function GET() {
  try {
    const res = await fetch('https://harkeraquila.com/feed', {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio RSS reader)' },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch feed', articles: [] }, { status: 502 })
    }

    const xml = await res.text()
    const allItems = parseItems(xml)

    // Filter to Kanav's articles (case-insensitive, partial match handles middle initials etc.)
    const kanavsArticles = allItems.filter((a) =>
      a.author.toLowerCase().includes('kanav')
    )

    // Fall back to all items if no byline match (feed may not include author)
    const articles = kanavsArticles.length > 0 ? kanavsArticles : allItems.slice(0, 6)

    return NextResponse.json({ articles, filtered: kanavsArticles.length > 0 })
  } catch (err) {
    console.error('Aquila feed error:', err)
    return NextResponse.json({ error: 'Feed unavailable', articles: [] }, { status: 500 })
  }
}
