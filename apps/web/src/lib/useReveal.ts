import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('in-view')
      })
      return
    }

    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}
