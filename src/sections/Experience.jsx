import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { timeline } from '../data/experience'

export default function Experience() {
  return (
    <section id="route" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeader
          number="05"
          eyebrow="The route"
          note="No invented job titles. Training, competitions, coursework and school results — the actual record."
          title={
            <>
              THE ROAD
              <br />
              <span className="text-outline">SO FAR.</span>
            </>
          }
        />

        <div className="mt-10 border-t border-ink sm:mt-14">
          {timeline.map((item, index) => (
            <Reveal
              as="article"
              key={item.id}
              delay={index * 0.03}
              amount={0.3}
              className="group border-b border-ink/15 transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              <div className="grid gap-3 px-1 py-5 sm:px-3 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                <div className="flex items-baseline gap-3 lg:col-span-2">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-red-text">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="label-tight text-ink/62 group-hover:text-paper/58">
                    {item.date}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-display text-[clamp(1.08rem,2vw,1.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink/62 transition-colors group-hover:text-paper/58">
                    {item.org}
                  </p>
                </div>

                <p className="max-w-[56ch] text-[14px] leading-[1.65] text-ink/65 transition-colors group-hover:text-paper/60 lg:col-span-5">
                  {item.detail}
                </p>

                <div className="lg:col-span-1 lg:text-right">
                  <span className="inline-block border border-ink/20 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/62 transition-colors group-hover:border-paper/30 group-hover:text-paper/60">
                    {item.type}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48ch] text-[15px] leading-[1.7] text-ink/65">
            There is no industry placement on this list yet. That is the next entry — and the reason
            I am looking for an industrial attachment.
          </p>
          <Link to="/#contact" className="btn-editorial group shrink-0">
            Write the next line
            <ArrowUpRight
              size={13}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
