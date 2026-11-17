import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Lock, Play } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { GamePoster, GraphicsPoster } from '../components/ProjectArtwork'
import { projectCategories, projects } from '../data/projects'
import { cn } from '../utils/cn'

function WebCover({ project }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#dcdcdb] p-3 sm:p-5">
      <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(rgba(17,17,17,.12) 1px, transparent 1px)',
        backgroundSize: '100% 28px',
      }} />
      <img
        src={project.cover}
        alt="FrootDash storefront home page."
        width="1280"
        height="646"
        loading="lazy"
        decoding="async"
        className="relative w-[94%] border border-ink/20 shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <img
        src={project.secondary}
        alt="FrootDash admin dashboard."
        width="1209"
        height="604"
        loading="lazy"
        decoding="async"
        className="absolute -bottom-[2%] right-2 w-[46%] rotate-2 border border-ink/20 bg-paper p-1 shadow-2xl transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-1 sm:right-4"
      />
      <span className="absolute bottom-3 left-3 bg-paper px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/60 sm:left-5">
        Fig. A — Storefront / admin
      </span>
    </div>
  )
}

function Cover({ project }) {
  if (project.slug === 'frootdash') return <WebCover project={project} />
  if (project.slug === 'games') return <GamePoster />
  return <GraphicsPoster />
}

function ProjectEntry({ project, index }) {
  const flip = index % 2 === 1

  return (
    <Reveal
      as="article"
      amount={0.08}
      className="group border-t border-ink/25 pt-4"
      aria-labelledby={`project-${project.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label text-ink/62">
          Project {project.number} — {project.categories.join(' / ')}
        </span>
        <span className="label text-ink/62">{project.year}</span>
      </div>

      <div className="mt-4 grid gap-7 lg:grid-cols-12 lg:gap-9">
        <div className={cn('lg:col-span-7', flip ? 'lg:order-2 lg:col-start-6' : 'lg:order-1')}>
          <Link
            to={`/work/${project.slug}`}
            data-cursor="case study"
            title={`${project.title} case study`}
            className="relative block aspect-[16/11] overflow-hidden border border-ink/20 bg-[#d8d8d6] sm:aspect-[16/10]"
          >
            <Cover project={project} />
            <span className="sr-only">Read the {project.title} case study.</span>
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 hidden translate-y-1 bg-ink px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block"
            >
              Open case study ↗
            </span>
          </Link>
        </div>

        <div className={cn('flex flex-col lg:col-span-5', flip ? 'lg:order-1 lg:col-start-1' : 'lg:order-2')}>
          <div className="flex items-start justify-between gap-4">
            <h3
              id={`project-${project.slug}`}
              className="display text-[clamp(2.25rem,4.6vw,4.2rem)] transition-colors duration-500 group-hover:text-red-deep"
            >
              <Link to={`/work/${project.slug}`} className="focus-visible:outline-none">
                {project.title}
              </Link>
            </h3>
            <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ink/62 sm:block">
              {project.status}
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/62">
            {project.subtitle}
          </p>

          <p className="mt-4 text-[14.5px] leading-[1.7] text-ink/70">{project.summary}</p>
          <p className="mt-3 border-l border-red/70 pl-3 text-[12.5px] leading-[1.65] text-ink/62">
            <span className="font-medium text-ink/70">The problem — </span>
            {project.problem}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.slice(0, 6).map((tech) => (
              <li
                key={tech}
                className="border border-ink/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/65"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
            <Link
              to={`/work/${project.slug}`}
              className="group/cta inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-red hover:text-red-deep"
            >
              Read the case study
              <ArrowUpRight
                size={12}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </Link>

            {project.links.live ? (
              <Link
                to={project.links.live}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-red-deep hover:underline"
              >
                <Play size={10} fill="currentColor" /> Play now
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/62">
                <Lock size={10} /> Demo not supplied
              </span>
            )}

            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-deep hover:underline"
              >
                GitHub ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/62">
                <Lock size={10} /> Repo not supplied
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Work() {
  const [category, setCategory] = useState('All')
  const reduce = useReducedMotion()
  const visible = category === 'All' ? projects : projects.filter((p) => p.categories.includes(category))

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeader
          number="03"
          eyebrow="Selected work"
          note="Built work, documented honestly. Repositories and live demos appear only when they exist."
          title={
            <>
              SELECTED
              <br />
              <span className="text-outline">WORK.</span>
            </>
          }
        />

        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <p className="max-w-[46ch] text-[14px] leading-[1.7] text-ink/65">
            Three threads, one practice: understand the brief, build the thing, then explain how it
            works. Open any entry for the full case study.
          </p>
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5">
            {projectCategories.map((item) => {
              const active = category === item
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item)}
                  className={cn(
                    'border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-300',
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/25 text-ink/62 hover:border-ink hover:text-ink',
                  )}
                >
                  {item}
                  <span className="ml-1.5 text-[8px] opacity-60">
                    {item === 'All'
                      ? String(projects.length).padStart(2, '0')
                      : String(projects.filter((p) => p.categories.includes(item)).length).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 space-y-16 sm:mt-14 sm:space-y-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectEntry project={project} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="border-t border-ink/20 py-12 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink/62">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
