import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, ExternalLink, X } from 'lucide-react'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * Certificate lightbox. The document is shown in an embedded PDF viewer,
 * with explicit open/download actions as a fallback for mobile browsers.
 */
export default function CertificateModal({ certificate, onClose, onPrev, onNext, index, total }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 900px)')
  useLockBodyScroll(Boolean(certificate))

  useEffect(() => {
    if (!certificate) return
    const previous = document.activeElement
    const timer = window.setTimeout(() => closeRef.current?.focus(), 80)

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && onNext) onNext()
      if (event.key === 'ArrowLeft' && onPrev) onPrev()
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [certificate, onClose, onNext, onPrev])

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-dialog-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[94svh] w-full max-w-[1180px] flex-col overflow-hidden border border-ink bg-paper shadow-2xl sm:max-h-[90svh]"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-ink/20 px-5 py-4 sm:px-6">
              <div>
                <p className="label-tight text-ink/62">
                  Certificate {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ·{' '}
                  {certificate.category}
                </p>
                <h2
                  id="certificate-dialog-title"
                  className="mt-1.5 font-display text-lg font-bold uppercase leading-none tracking-[-0.02em] sm:text-2xl"
                >
                  {certificate.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/30 transition-colors hover:bg-ink hover:text-paper"
              >
                <X size={15} strokeWidth={1.8} />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[1fr_330px] md:overflow-hidden">
              <div className="order-2 min-h-[46svh] bg-[#d8d8d5] p-3 sm:p-5 md:order-1 md:min-h-0 md:overflow-y-auto">
                <iframe
                  key={certificate.pdf}
                  title={`${certificate.title} — PDF certificate`}
                  src={`${certificate.pdf}#view=FitH&toolbar=1`}
                  className="h-[46svh] w-full border-0 bg-white md:h-[66svh]"
                />
                <p className="field-note mt-2 text-ink/62">
                  Embedded PDF viewer. If your browser blocks it, use “Open PDF”.
                </p>
              </div>

              <aside className="order-1 flex shrink-0 flex-col gap-5 border-b border-ink/15 p-5 md:order-2 md:overflow-y-auto md:border-b-0 md:border-l md:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 bg-red" aria-hidden="true" />
                  <div>
                    <p className="label-tight text-ink/62">{certificate.documentTitle}</p>
                    <p className="mt-1 font-mono text-[12px] uppercase leading-relaxed tracking-[0.06em]">
                      {certificate.issuer}
                    </p>
                  </div>
                </div>

                <dl className="space-y-3 border-t border-ink/15 pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label-tight text-ink/62">Date</dt>
                    <dd className="font-mono text-[11px] uppercase tracking-[0.08em]">
                      {certificate.date || 'Not printed on document'}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label-tight text-ink/62">Programme</dt>
                    <dd className="max-w-[20ch] text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em]">
                      {certificate.programme}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label-tight text-ink/62">Scope</dt>
                    <dd className="font-mono text-[11px] uppercase tracking-[0.08em]">
                      {certificate.duration}
                    </dd>
                  </div>
                  {certificate.reference && (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label-tight text-ink/62">Reference</dt>
                      <dd className="font-mono text-[11px] uppercase tracking-[0.08em]">
                        {certificate.reference}
                      </dd>
                    </div>
                  )}
                </dl>

                <p className="border-t border-ink/15 pt-4 text-[14px] leading-[1.65] text-ink/70">
                  {certificate.summary}
                </p>

                <div className="mt-auto flex flex-col gap-2 pt-1">
                  <a
                    href={certificate.pdf}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-red w-full !justify-between"
                  >
                    Open PDF
                    <ExternalLink size={13} strokeWidth={1.8} />
                  </a>
                  <a
                    href={certificate.pdf}
                    download={`${certificate.id}.pdf`}
                    className="btn-editorial w-full !justify-between"
                  >
                    Download
                    <Download size={13} strokeWidth={1.8} />
                  </a>
                  {isDesktop && (onPrev || onNext) && (
                    <div className="mt-2 flex items-stretch justify-between border border-ink/20">
                      <button
                        type="button"
                        onClick={onPrev}
                        className="flex-1 px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 transition-colors hover:bg-ink hover:text-paper"
                      >
                        ← Prev
                      </button>
                      <span className="w-px bg-ink/20" />
                      <button
                        type="button"
                        onClick={onNext}
                        className="flex-1 px-3 py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 transition-colors hover:bg-ink hover:text-paper"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
