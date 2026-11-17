import { cn } from '../utils/cn'

/** Four registration crosses — a quiet nod to print layout. */
export default function RegistrationMarks({ className = '', color = 'ink' }) {
  const marks = [
    'left-3 top-3',
    'right-3 top-3',
    'left-3 bottom-3',
    'right-3 bottom-3',
  ]
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 z-10', className)}>
      {marks.map((position) => (
        <span
          key={position}
          className={cn(
            'absolute h-[13px] w-[13px]',
            position,
            color === 'paper' ? 'text-paper/58' : 'text-ink/62',
          )}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      ))}
    </div>
  )
}
