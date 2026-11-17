import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles scroll position across the two route types:
 * a hash link scrolls to the section, a new page starts at the top.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          // Scroll explicitly instead of scrollIntoView: the sections carry
          // scroll-margin and the document carries scroll-padding, which would
          // otherwise stack and leave the section ~90px too low.
          const top = window.scrollY + el.getBoundingClientRect().top - 88
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        }
      }, 90)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
