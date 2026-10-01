import { useEffect, useRef } from 'react'

export default function FooterGradient() {
  const ref = useRef<HTMLDivElement | null>(null)
  const state = useRef({
    x: 0.5,
    y: 0.5,
    tx: 0.5,
    ty: 0.5,
    dragged: false,
    t: 0,
    raf: 0,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const s = state.current

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      s.tx = x
      s.ty = y
      s.dragged = true
    }

    function onLeave() {
      s.dragged = false
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    function tick() {
      s.t += 0.006

      if (!s.dragged) {
        const ax = 0.5 + Math.cos(s.t) * 0.32
        const ay = 0.5 + Math.sin(s.t * 1.3) * 0.35
        s.tx = ax
        s.ty = ay
      }

      s.x += (s.tx - s.x) * 0.08
      s.y += (s.ty - s.y) * 0.08

      el!.style.setProperty('--fx', `${s.x * 100}%`)
      el!.style.setProperty('--fy', `${s.y * 100}%`)

      s.raf = requestAnimationFrame(tick)
    }

    s.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 dark:opacity-90"
        style={{
          background:
            'radial-gradient(600px circle at var(--fx, 50%) var(--fy, 50%), rgba(255,102,178,0.28), transparent 55%), radial-gradient(700px circle at calc(100% - var(--fx, 50%)) calc(100% - var(--fy, 50%)), rgba(99,102,241,0.24), transparent 60%)',
        }}
      />
    </div>
  )
}
