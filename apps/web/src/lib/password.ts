export type Strength = {
  score: 0 | 1 | 2 | 3 | 4
  label: 'Very weak' | 'Weak' | 'Fair' | 'Good' | 'Strong'
  color: string
  width: string
}

export function scorePassword(pw: string): Strength {
  let score = 0

  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4

  const map: Record<number, { label: Strength['label']; color: string; width: string }> = {
    0: { label: 'Very weak', color: '#dc2626', width: '10%' },
    1: { label: 'Weak', color: '#f97316', width: '30%' },
    2: { label: 'Fair', color: '#eab308', width: '55%' },
    3: { label: 'Good', color: '#22c55e', width: '80%' },
    4: { label: 'Strong', color: '#16a34a', width: '100%' },
  }

  const m = map[clamped]
  return { score: clamped, label: m.label, color: m.color, width: m.width }
}

export function isStrongEnough(pw: string): boolean {
  return (
    pw.length >= 8 &&
    /[a-z]/.test(pw) &&
    /[A-Z]/.test(pw) &&
    /\d/.test(pw)
  )
}
