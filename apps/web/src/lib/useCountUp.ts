import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el) return

    if (reduce) {
      const id = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(id)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const step = (now: number) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(Math.round(eased * target))
              if (t < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
            io.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { value, ref }
}
