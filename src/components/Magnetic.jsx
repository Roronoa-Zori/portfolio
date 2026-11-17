import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Subtle magnetic pull for primary actions — desktop only, motion-safe. */
export default function Magnetic({ children, strength = 14, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22 })
  const sy = useSpring(y, { stiffness: 260, damping: 22 })

  const onMove = (event) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
