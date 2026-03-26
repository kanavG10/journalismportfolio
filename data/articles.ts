export type Article = {
  slug: string
  title: string
  category: 'News' | 'Features' | 'Opinion' | 'STEM' | 'Sports' | 'A&E'
  date: string
  featured: boolean
  externalUrl: string  // link to the Aquila article
  image?: string       // photo URL or path in /public/images/
  imageColor?: string  // fallback color if no photo
}

export const articles: Article[] = [
  // Add your real articles here. Example:
  {
  slug: 'free speech',
  title: 'Free speech is failing its promise',
  category: 'Opinion',            // News | Features | Opinion | STEM
  date: 'October 10, 2025',
  featured: true,
  externalUrl: 'https://harkeraquila.com/91634/opinion/free-speech-is-failing-its-promise/',
  image: '/images/free_speech.jpeg', // put the file in /public/images/
  imageColor: '#1a3a5c',         // fallback color if no photo
  },
  {
    slug: 'streameast',
    title: 'Streameast shutdown highlights costly reality of watching sports',
    category: 'Sports',            // News | Features | Opinion | STEM
    date: 'October 23, 2025',
    featured: true,
    externalUrl: 'https://harkeraquila.com/91766/sports/streameast-shutdown-highlights-costly-reality-of-watching-sports/',
    image: '/images/streameast.jpeg', // put the file in /public/images/
    imageColor: '#1a3a5c',         // fallback color if no photo
    },
    {
      slug: 'hoco',
      title: 'Students celebrate a night of music at annual homecoming dance',
      category: 'News',            // News | Features | Opinion | STEM
      date: 'October 25, 2025',
      featured: true,
      externalUrl: 'https://harkeraquila.com/92039/news/students-celebrate-a-night-of-music-at-annual-homecoming-dance/',
      image: '/images/hoco.jpeg', // put the file in /public/images/
      imageColor: '#1a3a5c',         // fallback color if no photo
    },
    {
      slug: '93',
      title: '“Only a 93”',
      category: 'Opinion',            // News | Features | Opinion | STEM
      date: 'November 21, 2025',
      featured: true,
      externalUrl: 'https://harkeraquila.com/92901/opinion/only-a-93/',
      image: '/images/93.jpeg', // put the file in /public/images/
      imageColor: '#1a3a5c',         // fallback color if no photo
      },
      {
      slug: 'chocolate',
      title: 'The sweet perks of dark chocolate',
      category: 'STEM',            // News | Features | Opinion | STEM
      date: 'December 3, 2025',
      featured: true,
      externalUrl: 'https://harkeraquila.com/93231/science-and-technology/the-sweet-perks-of-dark-chocolate/',
      image: '/images/chocolate.jpeg', // put the file in /public/images/
      imageColor: '#1a3a5c',         // fallback color if no photo
      },
      {
      slug: 'seraph',
      title: 'Seraph Brass uplifts female musicians in Concert Series',
      category: 'A&E',            // News | Features | Opinion | STEM
      date: 'March 6, 2026',
      featured: true,
      externalUrl: 'https://harkeraquila.com/95254/arts-entertainment-lifestyle/seraph-brass-uplifts-female-musicians-in-concert-series/',
      image: '/images/seraph.jpeg', // put the file in /public/images/
      imageColor: '#1a3a5c',         // fallback color if no photo
      }
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured)
}

export function getAllArticles(): Article[] {
  return articles
}
