import { useEffect } from 'react'

/** Locks the page behind modals and full-screen menus without layout jump. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPadding
    }
  }, [locked])
}
