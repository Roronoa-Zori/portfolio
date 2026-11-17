import { useEffect, useState } from 'react'

/**
 * Tracks which page section is currently under the fixed header.
 * Uses a cheap scroll listener (one per frame) rather than many observers,
 * so tall editorial sections switch cleanly.
 */
export function useScrollSpy(ids, offset = 160) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
      }
      // Pin the last item when the page cannot scroll any further.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1]
      setActive((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return active
}
