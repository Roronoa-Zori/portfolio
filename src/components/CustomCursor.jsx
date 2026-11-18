import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const INK = 'rgba(17,17,17,0.55)'
const RED = '#E5393F'

/**
 * Desktop-only cursor built from four registration brackets — the same print
 * marks used across the layout — with a label chip for interactive elements.
 * Purely decorative: it never hides the native cursor on touch devices and all
 * controls keep normal focus behaviour.
 */
export default function CustomCursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = useReducedMotion()
  const [state, setState] = useState({ visible: false, label: null, hover: false })

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springConfig = reduce
    ? { stiffness: 2000, damping: 80, mass: 0.1 }
    : { stiffness: 420, damping: 34, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  useEffect(() => {
    if (!fine) return

    document.body.classList.add('has-custom-cursor')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setState((prev) => (prev.visible ? prev : { ...prev, visible: true }))
    }
    const onOver = (event) => {
      const target = event.target.closest(
        'a, button, [role="button"], [data-cursor], input, textarea, select',
      )
      if (!target) {
        setState((prev) => ({ ...prev, label: null, hover: false }))
        return
      }
      setState({
        visible: true,
        hover: true,
        label: target.getAttribute('data-cursor'),
      })
    }
    const onLeave = () => setState((prev) => ({ ...prev, visible: false }))
    const onEnter = () => setState((prev) => ({ ...prev, visible: true }))

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [fine, x, y])

  if (!fine) return null

  const labelled = Boolean(state.label)
  const active = labelled || state.hover
  const size = labelled ? 50 : state.hover ? 34 : 20

  const corners = [
    'left-0 top-0 border-l border-t',
    'right-0 top-0 border-r border-t',
    'left-0 bottom-0 border-l border-b',
    'right-0 bottom-0 border-r border-b',
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden lg:block">
      <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              width: size,
              height: size,
              rotate: labelled ? 45 : active ? 8 : 0,
              color: active ? RED : INK,
              opacity: state.visible ? 1 : 0,
            }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: 'spring', stiffness: 430, damping: 30, mass: 0.6 }
            }
            className="relative"
          >
            {corners.map((corner) => (
              <span
                key={corner}
                className={`absolute h-[8px] w-[8px] border-current ${corner}`}
              />
            ))}
            <motion.span
              animate={{
                scale: active ? 0 : 1,
                opacity: state.visible && !active ? 1 : 0,
              }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 bg-red"
            />
          </motion.div>

          <AnimatePresence>
            {labelled && (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="absolute left-9 top-8 flex items-center gap-1.5 whitespace-nowrap border border-ink bg-ink px-2 py-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-paper"
              >
                <span className="h-[4px] w-[4px] bg-red-bright" />
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
