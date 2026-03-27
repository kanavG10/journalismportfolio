'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'
import AnimatedText from '../ui/AnimatedText'
import RedactionReveal from '../ui/RedactionReveal'

const tags = ['My', 'name', 'is', 'Kanav!']

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-12 text-harker">
          <RedactionReveal text="[ ABOUT ]" as="span" staggerDelay={0.08} />
        </p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Pull quote + photo */}
          <div>
            <div className="border-l-4 border-gold pl-6 mb-8">
              <p className="font-serif italic text-2xl md:text-3xl text-cream leading-relaxed">
                <AnimatedText
                  text="Hello! My name is Kanav."
                  className="block"
                />
              </p>
            </div>

            {/* Profile photo */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gold/40 bg-card flex items-center justify-center">
              <img
                src="/images/profile.jpeg"
                alt="Kanav Gupta"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Bio */}
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
            I am a student journalist and editor interested in how writing can make complex ideas feel clear and meaningful. 
            My interest in journalism grew out of different parts of my life, starting with STEM and Sports, 
            and searching for ways to share mine and other's stories and opinions with the world.
            </p>
            <p>
              Throughout the year, I have focused on the real journalistic process: asking good questions, finding good sources, and writing good stories. I've grown
              both as a writer and as a collaborator: whether that means going deeper into my articles or working with other writers, my glorious STEM section and the rest of the Journalism team.
            </p>
            <p>
              Moving forward, I hope to write more hard-hitting community-driven articles, expand my design skills, and continue to grow as a writer and editor.
            </p>

            {/* Callout box */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-5 bg-card rounded-lg border border-slate/30 relative overflow-hidden"
            >
              {/* Grid texture overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <p className="relative text-xs font-mono text-gold tracking-widest uppercase mb-3">
                Extra Links
              </p>
              <p className="relative text-sm text-muted leading-relaxed mb-3">
                Read more of my work in{' '}
                <a
                  href="https://harkeraquila.com/89085/onlineexclusive/humans-of-harker-shining-behind-the-spotlight/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/70 transition-colors inline-flex items-center gap-1"
                >
                  Humans of Harker
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {' '}and on{' '}
                <a
                  href="https://harkeraquila.com/staff_name/kanav-gupta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/70 transition-colors inline-flex items-center gap-1"
                >
                  Harker Aquila
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                .
              </p>
              <p className="relative text-sm text-muted leading-relaxed mb-3">
                Read my cover letter here:{' '}
                <a
                  href="https://docs.google.com/document/d/1hYk6wLHc788QQSUNrTuWQyLeZ8plgCc0Qe3U7YYoW0c/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/70 transition-colors inline-flex items-center gap-1"
                >
                  Cover Letter
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
