import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

type AuthState = {
  users: User[]
  current: User | null
  hasAnyAccount: () => boolean
  signup: (
    name: string,
    email: string,
    password: string,
  ) => { ok: boolean; error?: string }
  signin: (email: string, password: string) => { ok: boolean; error?: string }
  signout: () => void
}

function hash(input: string): string {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return `h${Math.abs(h).toString(36)}`
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      current: null,
      hasAnyAccount: () => get().users.length > 0,
      signup: (name, email, password) => {
        const clean = email.trim().toLowerCase()
        if (!name.trim()) return { ok: false, error: 'Name is required.' }
        if (!clean) return { ok: false, error: 'Email is required.' }
        if (!/^\S+@\S+\.\S+$/.test(clean))
          return { ok: false, error: 'Enter a valid email address.' }
        if (password.length < 8)
          return { ok: false, error: 'Password must be at least 8 characters.' }
        if (get().users.some((u) => u.email === clean))
          return { ok: false, error: 'An account with that email already exists.' }

        const user: User = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: clean,
          passwordHash: hash(password),
          createdAt: new Date().toISOString(),
        }
        set({ users: [...get().users, user], current: user })
        return { ok: true }
      },
      signin: (email, password) => {
        const clean = email.trim().toLowerCase()
        const user = get().users.find((u) => u.email === clean)
        if (!user) return { ok: false, error: 'No account found for that email.' }
        if (user.passwordHash !== hash(password))
          return { ok: false, error: 'Incorrect password.' }
        set({ current: user })
        return { ok: true }
      },
      signout: () => set({ current: null }),
    }),
    {
      name: 'luxe-beauty-auth',
    },
  ),
)
