import { useEffect, useRef } from 'react'

type Props = {
  color?: string
  size?: number
  className?: string
}

export default function Spotlight({
  color = 'rgba(255, 102, 178, 0.25)',
  size = 600,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const target = el.parentElement ?? document.body

    function onMove(e: MouseEvent) {
      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el!.style.setProperty('--x', `${x}px`)
      el!.style.setProperty('--y', `${y}px`)
      el!.style.opacity = '1'
    }

    function onLeave() {
      el!.style.opacity = '0'
    }

    target.addEventListener('mousemove', onMove)
    target.addEventListener('mouseleave', onLeave)

    return () => {
      target.removeEventListener('mousemove', onMove)
      target.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 60%)`,
      }}
    />
  )
}
