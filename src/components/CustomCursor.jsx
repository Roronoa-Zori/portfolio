import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * Desktop-only cursor. It never hides the native cursor on touch devices,
 * and it is purely decorative (all controls keep normal focus behaviour).
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
  const size = labelled ? 74 : state.hover ? 46 : 26

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden lg:block">
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: state.visible ? 1 : 0,
          backgroundColor: labelled ? '#111111' : state.hover ? '#E5393F' : 'rgba(229,57,63,0)',
          borderColor: labelled ? '#111111' : state.hover ? '#E5393F' : 'rgba(17,17,17,0.55)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
      >
        <span
          className="block h-full w-full rounded-full border"
          style={{
            borderColor: 'inherit',
          }}
        />
        {labelled && (
          <span className="absolute font-mono text-[9px] uppercase tracking-[0.16em] text-paper">
            {state.label}
          </span>
        )}
      </motion.div>
      <motion.div
        className="absolute h-[5px] w-[5px] rounded-full bg-red"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: state.visible && !labelled && !state.hover ? 1 : 0 }}
      />
    </div>
  )
}
