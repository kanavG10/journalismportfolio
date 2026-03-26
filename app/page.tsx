import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PageLayouts from '@/components/sections/PageLayouts'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Media from '@/components/sections/Media'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedWork />
      <Media />
      <PageLayouts />
      <Contact />
    </main>
  )
}
