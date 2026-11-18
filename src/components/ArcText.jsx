import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Rotating circular label used as a print-style stamp. */
export default function ArcText({ text = 'OPEN TO INTERNSHIP · 2026 · RAJSHAHI · ', className = '' }) {
  const id = useId().replace(/:/g, '')
  const reduce = useReducedMotion()

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={`arc-${id}`}
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-ink font-mono"
          style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.9px' }}
        >
          <textPath href={`#arc-${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40">
        <span className="block h-1.5 w-1.5 rounded-full bg-red" />
      </span>
    </div>
  )
}
