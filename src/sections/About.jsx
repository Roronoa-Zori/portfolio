import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import RegistrationMarks from '../components/RegistrationMarks'
import { journey } from '../data/experience'
import { profile } from '../data/site'

const facts = [
  { label: 'Based in', value: 'Rajshahi, Bangladesh' },
  { label: 'Studying', value: 'B.Sc. CSE · Varendra University' },
  { label: 'Year', value: 'Fourth year, ongoing' },
  { label: 'Thesis', value: 'ML on primary survey data' },
  { label: 'Languages', value: profile.languages },
  { label: 'Status', value: profile.status },
]

const interests = [
  'Software development',
  'Web platforms',
  'Machine learning',
  'Embedded systems',
  'Computer graphics',
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <SectionHeader
          number="01"
          eyebrow="About"
          note="A short introduction — education, interests and the honest version of where I am."
          title={
            <>
              TURNING CURIOSITY
              <br />
              <span className="text-outline">INTO SOMETHING TANGIBLE.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* portrait + facts */}
          <div className="lg:col-span-5">
            <Reveal>
              <figure className="relative">
                <RegistrationMarks className="hidden sm:block" />
                <div
                  aria-hidden="true"
                  className="absolute -left-2.5 -top-2.5 h-full w-full border border-ink/25 sm:-left-4 sm:-top-4"
                />
                <div className="relative border border-ink bg-ink p-2">
                  <div className="overflow-hidden">
                    <img
                      src="/images/portrait-about.webp"
                      alt="Md Mominur Rahman standing by a river in Bangladesh."
                      width="960"
                      height="1280"
                      className="aspect-[3/4] w-full object-cover object-center grayscale-[0.15] transition-all duration-700 hover:scale-[1.02] hover:grayscale-0"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="flex items-end justify-between gap-3 px-1 pb-1 pt-2.5 text-paper">
                    <span className="font-mono text-[9.5px] uppercase leading-[1.6] tracking-[0.14em]">
                      Fig. 01 — Between classes
                      <br />
                      <span className="text-paper/55">Rajshahi, Bangladesh</span>
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-red-text">
                      {profile.initials} / 2026
                    </span>
                  </figcaption>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-[38%] hidden h-24 w-2 bg-red sm:block"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <dl className="border-t border-ink/20">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[92px_1fr] items-baseline gap-3 border-b border-ink/15 py-2.5 sm:grid-cols-[110px_1fr]"
                  >
                    <dt className="label-tight text-ink/62">{fact.label}</dt>
                    <dd className="text-[14px] leading-snug text-ink/80">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-[clamp(1.2rem,1.9vw,1.55rem)] leading-[1.5] text-ink/90">
                <span className="float-left mr-2 mt-1 font-editorial text-[3.9rem] italic leading-[0.62] text-red">
                  I
                </span>
                &apos;m Mominur — a fourth-year Computer Science &amp; Engineering student at
                Varendra University in Rajshahi. I like the moment an idea stops being a sketch and
                starts behaving like a product.
              </p>
            </Reveal>

            <Reveal delay={0.07}>
              <p className="mt-6 text-[16px] leading-[1.75] text-ink/65">
                My coursework started with C and C++, then Java and Python. On the web side I have
                worked with HTML and CSS, and built <strong className="font-semibold text-ink">FrootDash</strong> — a
                fruit delivery platform with accounts, a cart, checkout and an admin dashboard — using
                PHP and MySQL. Smaller game, hardware and computer-graphics projects have been my
                testing ground for logic, input and drawing fundamentals, including Arduino and ESP32
                builds that put the code on a physical board.
              </p>
            </Reveal>

            <Reveal delay={0.13}>
              <p className="mt-5 text-[16px] leading-[1.75] text-ink/65">
                Right now I am looking for an industrial attachment where I can contribute to real
                products and learn from people who care about craft. I am early in my career, and I
                would rather say that plainly than pretend otherwise.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 border-t border-ink/20 pt-4">
                <p className="label-tight text-ink/62">Current research</p>
                <p className="mt-2 font-editorial text-[clamp(1.1rem,1.9vw,1.4rem)] italic leading-[1.35] text-ink/90">
                  “{profile.thesis.title}”
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/62">
                  {profile.thesis.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <blockquote className="mt-8 border-l-2 border-red pl-4 sm:pl-5">
                <p className="font-editorial text-[clamp(1.55rem,2.7vw,2.2rem)] italic leading-[1.15] text-ink">
                  “Comfortable being the least experienced person in the room — if it means leaving
                  with better questions.”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.22} className="mt-8">
              <p className="label-tight mb-3 text-ink/62">Curious about</p>
              <ul className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="border border-ink/25 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/65 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26} className="mt-9">
              <Link to="/#contact" className="btn-editorial group" data-cursor="say hi">
                Start a conversation
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* journey */}
        <div className="mt-16 sm:mt-24">
          <div className="flex items-end justify-between gap-4 border-b border-ink pb-3">
            <h3 className="display text-[clamp(1.55rem,3.2vw,2.6rem)]">The route so far</h3>
            <span className="label-tight hidden text-ink/62 sm:block">Scroll to reveal</span>
          </div>

          <ol>
            {journey.map((item, index) => (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 0.05}
                className="group grid gap-3 border-b border-ink/15 py-5 sm:grid-cols-[110px_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-[5px] w-[5px] bg-red" aria-hidden="true" />
                  <span className="label-tight text-ink/62">{item.date}</span>
                </div>
                <div>
                  <p className="font-display text-[clamp(1.05rem,2vw,1.45rem)] font-bold uppercase leading-tight tracking-[-0.02em]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-ink/62">{item.org}</p>
                </div>
                <span className="label-tight w-fit border border-ink/20 px-2 py-1 text-ink/62">
                  {item.type}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
