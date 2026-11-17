import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Download, ExternalLink, FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import CertificateModal from '../components/CertificateModal'
import {
  certificateCategories,
  certificateNote,
  certificates,
} from '../data/certificates'
import { cn } from '../utils/cn'

const spans = [
  'lg:col-span-5',
  'lg:col-span-7 lg:pt-12',
  'lg:col-span-7',
  'lg:col-span-5 lg:pt-10',
]
const tilts = ['-1.4deg', '1.1deg', '0.9deg', '-1.2deg']
const ratios = ['aspect-[3/4]', 'aspect-[16/10]', 'aspect-[16/10]', 'aspect-[16/10]']

function CertificateCard({ certificate, index, onOpen }) {
  return (
    <div className={cn('group', spans[index] ?? 'lg:col-span-6')}>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        data-cursor="open pdf"
        className="block w-full text-left"
      >
        <div
          className="cert-frame relative border border-ink/20 bg-[#dededb] p-2 shadow-[0_18px_40px_-28px_rgba(17,17,17,0.4)] sm:p-2.5"
          style={{ '--tilt': tilts[index] ?? '0deg' }}
        >
          <div className={cn('relative overflow-hidden bg-bone', ratios[index] ?? 'aspect-[16/10]')}>
            <img
              src={certificate.preview}
              alt={`${certificate.title} certificate preview.`}
              width={certificate.width}
              height={certificate.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/55">
              <span className="flex translate-y-2 items-center gap-2 border border-paper/50 bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                View PDF <ExternalLink size={11} strokeWidth={1.8} />
              </span>
            </div>
            <span className="absolute -left-1 -top-1 flex h-8 min-w-8 items-center justify-center bg-red-deep px-1.5 font-mono text-[10px] tracking-[0.06em] text-paper sm:-left-2 sm:-top-2">
              {certificate.number}
            </span>
            <span className="absolute bottom-2 right-2 bg-paper/95 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/60">
              PDF
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 border-t border-ink/20 pt-2.5">
          <div>
            <h3 className="font-display text-[clamp(1rem,1.7vw,1.3rem)] font-bold uppercase leading-tight tracking-[-0.02em] transition-colors group-hover:text-red-deep">
              {certificate.title}
            </h3>
            <p className="mt-1 max-w-[36ch] font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.08em] text-ink/62">
              {certificate.issuer}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/60">
              {certificate.displayDate}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/62">
              {certificate.category}
            </p>
          </div>
        </div>
        <span className="sr-only">Open the PDF viewer.</span>
      </button>
    </div>
  )
}

export default function Certificates() {
  const [category, setCategory] = useState('All')
  const [activeId, setActiveId] = useState(null)
  const reduce = useReducedMotion()

  const visible = useMemo(
    () =>
      category === 'All'
        ? certificates
        : certificates.filter((certificate) => certificate.category === category),
    [category],
  )

  const activeIndex = activeId ? visible.findIndex((item) => item.id === activeId) : -1
  const activeCertificate = activeIndex >= 0 ? visible[activeIndex] : null

  const move = (direction) => {
    if (activeIndex < 0) return
    const next = (activeIndex + direction + visible.length) % visible.length
    setActiveId(visible[next].id)
  }

  return (
    <section
      id="credentials"
      className="relative scroll-mt-24 border-t border-ink/15 py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <SectionHeader
          number="04"
          eyebrow="Credentials"
          note="Four certificates, inspected and transcribed. Open any one to read the original document."
          title={
            <>
              A PAPER
              <br />
              <span className="text-outline">TRAIL.</span>
            </>
          }
        />

        <div className="mt-7 grid gap-6 border-b border-ink/20 pb-6 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[54ch] text-[14px] leading-[1.75] text-ink/60 lg:col-span-7">
            {certificateNote}
          </p>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter certificates">
              {certificateCategories.map((item) => {
                const active = category === item
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setCategory(item)
                      setActiveId(null)
                    }}
                    className={cn(
                      'border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300',
                      active
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/25 text-ink/62 hover:border-ink hover:text-ink',
                    )}
                  >
                    {item}
                    <span className="ml-1.5 text-[8px] opacity-60">
                      {String(
                        item === 'All'
                          ? certificates.length
                          : certificates.filter((c) => c.category === item).length,
                      ).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>
            <a
              href="/certificates/certificate-set-original.pdf"
              download="certificate-set-original.pdf"
              className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/65 transition-colors hover:text-ink"
            >
              <FileText size={12} strokeWidth={1.6} />
              Download the original set
              <Download size={11} strokeWidth={1.6} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn('min-w-0', spans[certificates.indexOf(certificate)])}
              >
                <CertificateCard
                  certificate={certificate}
                  index={certificates.indexOf(certificate)}
                  onOpen={() => setActiveId(certificate.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal className="mt-12 flex flex-col gap-3 border-t border-ink/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="field-note max-w-[62ch]">
            Scans are reproduced as supplied. The Tech Debate 4.0 certificate carries no printed
            date, so the gallery does not invent one.
          </p>
          <span className="label-tight shrink-0 text-ink/62">
            {String(visible.length).padStart(2, '0')} documents shown
          </span>
        </Reveal>
      </div>

      <CertificateModal
        certificate={activeCertificate}
        index={activeIndex >= 0 ? activeIndex : 0}
        total={visible.length}
        onClose={() => setActiveId(null)}
        onPrev={() => move(-1)}
        onNext={() => move(1)}
      />
    </section>
  )
}
