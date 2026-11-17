import { cn } from '../utils/cn'

/**
 * Editorial section masthead: rule, folio label, optional note and a display title.
 */
export default function SectionHeader({
  number,
  eyebrow,
  title,
  note,
  dark = false,
  id,
  className = '',
  titleClassName = '',
}) {
  return (
    <header id={id} className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-start justify-between gap-6 border-t pt-4',
          dark ? 'border-paper/25' : 'border-ink/20',
        )}
      >
        <div className="flex items-center gap-3">
          <span className="h-[7px] w-[7px] shrink-0 bg-red" aria-hidden="true" />
          <span className={cn('label', dark ? 'text-paper/70' : 'text-ink/70')}>
            {number} — {eyebrow}
          </span>
        </div>
        {note && (
          <p
            className={cn(
              'label hidden max-w-[38ch] text-right leading-[1.7] tracking-[0.12em] sm:block',
              dark ? 'text-paper/55' : 'text-smoke',
            )}
          >
            {note}
          </p>
        )}
      </div>

      <h2
        className={cn(
          'display mt-7 text-[clamp(2.75rem,7.4vw,7rem)] sm:mt-9',
          dark ? 'text-paper' : 'text-ink',
          titleClassName,
        )}
      >
        {title}
      </h2>
    </header>
  )
}
