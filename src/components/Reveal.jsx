import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Scroll-triggered reveal. Motion is disabled automatically when the visitor
 * prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
  as = 'div',
  once = true,
  amount = 0.18,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

export { EASE }
