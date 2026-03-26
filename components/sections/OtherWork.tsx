'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const items = [
  {
    num: '01',
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    publication: 'Lorem Ipsum Press',
    href: '#',
  },
  {
    num: '02',
    title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    publication: 'Lorem Ipsum Press',
    href: '#',
  },
  {
    num: '03',
    title: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur',
    publication: 'Dolor Sit Amet',
    href: '#',
  },
  {
    num: '04',
    title: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    publication: 'Dolor Sit Amet',
    href: '#',
  },
  {
    num: '05',
    title: 'Nam libero tempore cum soluta nobis eligendi optio cumque',
    publication: 'Consectetur Review',
    href: '#',
  },
]

export default function OtherWork() {
  return (
    <SectionWrapper className="py-24 px-6 bg-card/40">
      <div className="max-w-6xl mx-auto">
        <p className="text-harker font-mono text-xs tracking-[0.3em] uppercase mb-12">
          [ OTHER WORK ]
        </p>

        <div className="divide-y divide-slate/20">
          {items.map((item, i) => (
            <motion.a
              key={item.num}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between py-5 group cursor-pointer"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-gold/40 text-sm group-hover:text-gold transition-colors">
                  {item.num}
                </span>
                <div>
                  <p className="font-serif text-lg text-cream group-hover:text-gold transition-colors relative inline-block">
                    {item.title}
                    {/* Animated underline */}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
                  </p>
                  <p className="text-muted text-sm font-mono mt-0.5">{item.publication}</p>
                </div>
              </div>
              <motion.span
                className="text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-200 ml-4 flex-shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
