'use client'

const defaultHeadlines = [
  'AI tutors enter Bay Area classrooms — students and teachers weigh in',
  'STEM equity gap persists in standardized testing data',
  'Harker researcher develops low-cost biosensor prototype',
  'Science fair reforms proposed amid equity concerns',
  'New data: AP enrollment disparities across California districts',
  'Editorial: What does it mean to "cover" science fairly?',
]

interface BreakingTickerProps {
  items?: string[]
}

export default function BreakingTicker({ items = defaultHeadlines }: BreakingTickerProps) {
  const doubled = [...items, ...items]

  return (
    <div className="w-full bg-harker flex items-stretch overflow-hidden">
      {/* Pinned badge */}
      <div className="flex-shrink-0 flex items-center px-3 py-2 border-r border-white/20 z-10 bg-harker">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold border border-gold px-2 py-0.5">
          BREAKING
        </span>
      </div>

      {/* Scrolling strip */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap animate-ticker"
          style={{ width: 'max-content' }}
        >
          {doubled.map((headline, i) => (
            <span key={i} className="font-mono text-xs text-white/90 px-6">
              {headline}
              <span className="mx-4 text-gold/60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
