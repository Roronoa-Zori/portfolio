import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { navItems, profile } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="shell pb-7 pt-12 sm:pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label text-paper/55">End of issue 01</p>
            <p className="display mt-4 text-[clamp(2.6rem,6.5vw,5.6rem)] text-paper">
              MOMINUR
              <br />
              <span className="text-outline-paper">RAHMAN</span>
            </p>
            <p className="mt-5 max-w-[34ch] font-mono text-[11px] uppercase leading-[1.9] tracking-[0.1em] text-paper/55">
              CSE student, Rajshahi. Building in public, one small release at a time.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:pl-6">
            <p className="label text-paper/55">Index</p>
            <ul className="mt-4 space-y-2">
              {navItems.slice(1).map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    className="group inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
                  >
                    <span className="text-[9.5px] text-red-bright">{item.number}</span>
                    <span className="link-line">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label text-paper/55">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              <li className="relative">
                <span className="group/email relative inline-flex flex-col">
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-line font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
                    aria-describedby="footer-email-address"
                  >
                    Email
                  </a>
                  <span
                    id="footer-email-address"
                    className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap border border-paper/25 bg-paper px-2.5 py-1.5 font-mono text-[10px] normal-case tracking-[0.04em] text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover/email:-translate-y-0.5 group-hover/email:opacity-100 group-focus-within/email:-translate-y-0.5 group-focus-within/email:opacity-100"
                  >
                    {profile.email}
                  </span>
                </span>
              </li>
              <li>
                {profile.links.github ? (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
                  >
                    GitHub
                  </a>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">
                    GitHub
                  </span>
                )}
              </li>
              <li>
                {profile.links.linkedin ? (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">
                    LinkedIn
                  </span>
                )}
              </li>
              <li className="pt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-paper/55">
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-tight text-paper/55">
            © {year} {profile.name}
          </p>
          <p className="label-tight text-paper/55">
            Designed &amp; built by hand · no templates
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60 transition-colors hover:text-paper"
          >
            Back to top
            <ArrowUp
              size={12}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
