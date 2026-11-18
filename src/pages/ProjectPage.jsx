import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Play,
} from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { GamePoster, GraphicsPoster } from '../components/ProjectArtwork'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

function DetailBlock({ number, title, children, note }) {
  return (
    <section className="border-t border-ink/20 pt-5">
      <div className="grid gap-5 sm:grid-cols-[140px_1fr] sm:gap-8">
        <div>
          <p className="label-tight text-ink/62">{number}</p>
          <h2 className="mt-1.5 max-w-[9ch] font-display text-[clamp(1.3rem,2.4vw,1.85rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
            {title}
          </h2>
          {note && <p className="field-note mt-2 hidden max-w-[18ch] sm:block">{note}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

function LinksPanel({ project }) {
  return (
    <div className="space-y-2">
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-editorial w-full !justify-between"
        >
          Repository
          <ExternalLink size={12} strokeWidth={1.8} />
        </a>
      )}

      {project.links.live && (
        <Link to={project.links.live} className="btn-red w-full !justify-between">
          {project.links.live.startsWith('/#') ? 'Play in the arcade' : 'Live demo'}
          {project.links.live.startsWith('/#') ? (
            <Play size={11} fill="currentColor" />
          ) : (
            <ExternalLink size={12} strokeWidth={1.8} />
          )}
        </Link>
      )}
    </div>
  )
}

function Cover({ project }) {
  if (project.slug === 'frootdash') {
    return (
      <div className="relative overflow-hidden bg-[#d8d8d6] p-3 sm:p-6">
        <img
          src={project.cover}
          alt="FrootDash storefront home page."
          width="1280"
          height="646"
          className="w-full border border-ink/15 shadow-lg"
        />
        <img
          src={project.secondary}
          alt="FrootDash admin dashboard."
          width="1209"
          height="604"
          className="absolute -bottom-4 right-4 hidden w-[38%] border border-ink/20 bg-paper p-1 shadow-2xl sm:block md:right-10"
        />
        <div className="mt-3 flex items-center justify-between gap-4 sm:mt-4">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/62">
            Fig. 01 / Storefront — captured from the submitted build
          </span>
          <span className="h-[5px] w-[5px] shrink-0 bg-red" />
        </div>
      </div>
    )
  }
  if (project.slug === 'hardware') {
    return (
      <div className="relative overflow-hidden border border-ink/20 bg-ink">
        <img
          src={project.cover}
          alt="An ESP32 on a breadboard wired to a small OLED display showing a clock."
          width="1280"
          height="880"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="flex items-center justify-between gap-4 px-3 py-2.5 sm:px-4">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/70">
            Fig. 01 / ESP32 + OLED — photographed build
          </span>
          <span className="h-[5px] w-[5px] shrink-0 bg-red" />
        </div>
      </div>
    )
  }
  return (
    <div className="group relative aspect-[16/9] overflow-hidden border border-ink/20">
      {project.slug === 'games' ? <GamePoster /> : <GraphicsPoster />}
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentMeta(
    project ? `${project.title} — Case study · Md Mominur Rahman` : 'Not found · Md Mominur Rahman',
    project?.summary,
  )

  if (!project) return <NotFound />

  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pt-20 sm:pt-24 lg:pt-28">
      <div className="shell">
        <div className="flex items-center justify-between gap-4 border-b border-ink/20 pb-3">
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65 transition-colors hover:text-ink"
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to selected work
          </Link>
          <span className="label-tight text-ink/62">
            Case study / {project.number} of {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <header className="mt-7 grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="label text-red-deep">
              {project.categories.join(' / ')} — {project.year}
            </p>
            <h1 className="display mt-3 text-[clamp(2.8rem,9vw,7.6rem)]">{project.title}</h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/62">
              {project.subtitle}
            </p>
          </div>
          <dl className="grid gap-2 border-t border-ink/20 pt-4 lg:col-span-3 lg:border-t-0 lg:pt-0">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="label-tight text-ink/62">Role</dt>
              <dd className="max-w-[22ch] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink/70">
                {project.role}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="label-tight text-ink/62">Status</dt>
              <dd className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink/70">
                {project.status}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-8">
          <Cover project={project} />
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="space-y-7 lg:sticky lg:top-28">
              <div>
                <p className="label-tight mb-3 text-ink/62">Stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-ink/20 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {(project.links.github || project.links.live) && (
                <div>
                  <p className="label-tight mb-3 text-ink/62">Links</p>
                  <LinksPanel project={project} />
                </div>
              )}

              <div className="border-t border-ink/20 pt-4">
                <p className="label-tight mb-2 text-ink/62">Source note</p>
                <p className="field-note">{project.sourceNote}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-12 lg:col-span-8 lg:col-start-5">
            <DetailBlock number="01" title="The brief">
              <p className="text-[clamp(1rem,1.7vw,1.2rem)] leading-[1.6] text-ink/80">
                {project.intro}
              </p>
            </DetailBlock>

            <DetailBlock number="02" title="The problem" note="What needed solving">
              <p className="text-[15.5px] leading-[1.75] text-ink/60">{project.problem}</p>
            </DetailBlock>

            <DetailBlock number="03" title="My contribution" note="What I actually did">
              <ol className="space-y-3">
                {project.contribution.map((item, i) => (
                  <li key={i} className="grid grid-cols-[26px_1fr] gap-2 border-b border-ink/10 pb-3">
                    <span className="font-mono text-[10px] leading-relaxed text-red-text">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] leading-[1.7] text-ink/65">{item}</span>
                  </li>
                ))}
              </ol>
            </DetailBlock>

            <DetailBlock number="04" title="Inside the build" note="Features & structure">
              <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 border-b border-ink/10 py-2.5 text-[14px] text-ink/65"
                  >
                    <span className="h-[4px] w-[4px] shrink-0 bg-red" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {project.schema && (
                <div className="mt-8">
                  <p className="label-tight mb-3 text-ink/62">Database — three tables</p>
                  <div className="border border-ink/20">
                    {project.schema.map((table) => (
                      <div
                        key={table.table}
                        className="grid gap-1 border-b border-ink/15 p-3 last:border-b-0 sm:grid-cols-[90px_1fr] sm:gap-4"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em]">
                          {table.table}
                        </p>
                        <div>
                          <p className="font-mono text-[10px] leading-relaxed text-ink/62">
                            {table.fields}
                          </p>
                          <p className="mt-1 text-[13px] leading-snug text-ink/65">
                            {table.purpose}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DetailBlock>

            {project.screenshots.length > 0 && (
              <section className="border-t border-ink/20 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="label-tight text-ink/62">05 / Screens</p>
                    <h2 className="mt-1.5 font-display text-[clamp(1.3rem,2.4vw,1.85rem)] font-bold uppercase leading-none tracking-[-0.03em]">
                      The build, in order
                    </h2>
                  </div>
                  <span className="label-tight text-ink/62">
                    {String(project.screenshots.length).padStart(2, '0')} captures
                  </span>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {project.screenshots.map((shot, i) => (
                    <Reveal key={shot.src} delay={(i % 2) * 0.05} amount={0.05}>
                      <figure className="group">
                        <div className="overflow-hidden border border-ink/20 bg-bone">
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            width={shot.width}
                            height={shot.height}
                            loading="lazy"
                            decoding="async"
                            className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          />
                        </div>
                        <figcaption className="mt-2 flex items-center justify-between gap-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/62">
                          {shot.caption}
                          <span className="h-[4px] w-[4px] bg-red" />
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            <DetailBlock number={project.screenshots.length ? '06' : '05'} title="What I took from it" note="Honest reflection">
              <blockquote className="border-l-2 border-red pl-4">
                <p className="font-editorial text-[clamp(1.3rem,2.3vw,1.75rem)] italic leading-[1.3] text-ink/85">
                  “{project.reflection}”
                </p>
              </blockquote>
            </DetailBlock>
          </div>
        </div>

        <div className="mt-16 border-t border-ink pt-5 sm:mt-20">
          <Link to={`/work/${next.slug}`} className="group block" data-cursor="next">
            <div className="flex items-center justify-between gap-4">
              <p className="label-tight text-ink/62">Next case study — {next.number}</p>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <span className="display text-[clamp(2rem,6vw,4.8rem)] transition-colors duration-300 group-hover:text-red-deep">
                {next.title}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink/62 sm:block">
                {next.subtitle}
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-4">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/62 hover:text-ink"
          >
            <ArrowLeft size={11} /> All work
          </Link>
          <a
            href={`mailto:ratulblaster004@gmail.com?subject=About%20${encodeURIComponent(project.title)}`}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/62 hover:text-red-deep"
          >
            Ask about this project <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </article>
  )
}
