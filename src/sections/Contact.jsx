import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Linkedin, MapPin, FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import RegistrationMarks from '../components/RegistrationMarks'
import { profile } from '../data/site'

function LinkRow({ icon: Icon, label, value, href, note, disabled }) {
  const content = (
    <>
      <span className="flex items-center gap-2.5">
        <Icon size={13} strokeWidth={1.6} className="shrink-0 text-ink/62" />
        <span className="label-tight text-ink/62">{label}</span>
      </span>
      <span className="flex items-center gap-2 text-right">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
            disabled ? 'text-ink/62' : 'text-ink/80 group-hover:text-red-deep'
          }`}
        >
          {value}
        </span>
        {disabled ? (
          <span className="h-[5px] w-[5px] rounded-full border border-ink/25" aria-hidden="true" />
        ) : (
          <ArrowUpRight
            size={12}
            strokeWidth={1.7}
            className="text-ink/62 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-deep"
          />
        )}
      </span>
    </>
  )

  if (disabled || !href) {
    return (
      <div
        className="flex items-center justify-between gap-4 border-b border-ink/15 py-3"
        title={note}
      >
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      className="group flex items-center justify-between gap-4 border-b border-ink/15 py-3 transition-colors hover:border-ink"
    >
      {content}
    </a>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-ink/15 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeader
          number="07"
          eyebrow="Contact"
          note="The last page. An internship, a project, or a good question — all welcome."
          title={
            <>
              LET&apos;S MAKE
              <br />
              <span className="text-outline">SOMETHING.</span>
            </>
          }
        />

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[48ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6] text-ink/65">
                I am looking for an industrial attachment where the work is real and the feedback is
                honest. If you are building something and need a curious pair of hands, my inbox is
                open.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-8 block border-y border-ink py-5"
                data-cursor="email"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="label-tight text-ink/62">Email / preferred</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 transition-transform duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-deep"
                  />
                </div>
                <span className="mt-2 block break-all font-display text-[clamp(1.25rem,3.3vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] transition-colors duration-300 group-hover:text-red-deep">
                  {profile.email}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1} className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="btn-editorial !px-3 !py-2"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    Copied <Check size={11} strokeWidth={2} />
                  </>
                ) : (
                  <>
                    Copy email <Copy size={11} strokeWidth={1.7} />
                  </>
                )}
              </button>
              <a
                href={`mailto:${profile.email}?subject=Industrial%20attachment%20/%20Hello`}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/62 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
              >
                Or use your mail app
              </a>
            </Reveal>

            <Reveal delay={0.14} className="mt-9">
              <div className="grid gap-x-8 sm:grid-cols-2">
                <div>
                  <LinkRow
                    icon={Github}
                    label="GitHub"
                    value={profile.links.githubHandle}
                    href={profile.links.github}
                  />
                  <LinkRow
                    icon={Linkedin}
                    label="LinkedIn"
                    value={profile.links.linkedinHandle}
                    href={profile.links.linkedin}
                  />
                </div>
                <div>
                  <LinkRow
                    icon={FileText}
                    label="CV"
                    value="On request"
                    href={`mailto:${profile.email}?subject=CV%20request`}
                    note="The CV is not published on this site."
                  />
                  <LinkRow icon={MapPin} label="Location" value={profile.location} disabled />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="field-note mt-5 max-w-[58ch]">
                The original CV is kept private; ask and I will send it. GitHub and LinkedIn open in
                a new tab.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08} className="lg:pl-8">
              <div className="group relative">
                <RegistrationMarks className="hidden sm:block" />
                <div className="cert-frame relative aspect-square overflow-hidden bg-red-deep p-5 text-paper sm:p-7" style={{ '--tilt': '-1deg' }}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                      Status / 2026
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/70">
                      <span className="h-[6px] w-[6px] animate-blink rounded-full bg-paper" />
                      Active
                    </span>
                  </div>

                  <p className="display mt-10 text-[clamp(2rem,4vw,3.2rem)] leading-[0.9] text-paper">
                    OPEN TO
                    <br />
                    <span className="text-outline-paper">INDUSTRIAL</span>
                    <br />
                    ATTACHMENT
                  </p>

                  <div className="absolute bottom-6 left-5 right-5 sm:left-7 sm:right-7">
                    <div className="flex items-end justify-between gap-4 border-t border-paper/30 pt-3">
                      <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-paper/70">
                        Software development
                        <br />
                        Web · fundamentals
                      </span>
                      <span className="font-display text-[2.2rem] font-bold leading-none tracking-[-0.04em] text-paper/55">
                        07
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute -right-10 top-16 h-24 w-24 rotate-12 border border-paper/20"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="field-note max-w-[28ch]">
                    Based in Rajshahi. Available for on-site, hybrid or remote conversations.
                  </p>
                  <span className="label-tight shrink-0 text-ink/62">Fig. 08</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed inset-x-0 bottom-5 z-[110] mx-auto w-fit max-w-[calc(100vw-2rem)] border border-ink bg-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper"
          >
            Email copied — {profile.email}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
