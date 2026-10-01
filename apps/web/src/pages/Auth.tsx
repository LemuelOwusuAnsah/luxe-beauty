import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useAuth } from '../lib/auth'
import { scorePassword, isStrongEnough } from '../lib/password'
import Spotlight from '../components/Spotlight'

type Tab = 'signin' | 'signup'

export default function Auth() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { users, signup, signin, current } = useAuth()

  const initialTab: Tab =
    (params.get('tab') as Tab) || (users.length === 0 ? 'signup' : 'signin')

  const [tab, setTab] = useState<Tab>(initialTab)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (current) navigate('/admin', { replace: true })
  }, [current, navigate])

  useEffect(() => {
    setParams(tab === 'signup' ? { tab: 'signup' } : {}, { replace: true })
  }, [tab, setParams])

  const strength = useMemo(() => scorePassword(password), [password])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (tab === 'signup') {
      if (!isStrongEnough(password)) {
        setError(
          'Password must be at least 8 characters with uppercase, lowercase, and a number.',
        )
        return
      }
      if (password !== confirm) {
        setError('Passwords do not match.')
        return
      }
      const res = signup(name, email, password)
      if (!res.ok) return setError(res.error || 'Signup failed.')
      navigate('/admin')
    } else {
      const res = signin(email, password)
      if (!res.ok) return setError(res.error || 'Sign in failed.')
      navigate('/admin')
    }
  }

  return (
    <>
      <Helmet
        {...seo({
          title: tab === 'signup' ? 'Create account' : 'Sign in',
          path: '/auth',
        })}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ffe4f0] via-[#f3e8ff] to-[#dbeafe] dark:from-[#1a0d17] dark:via-[#1a1230] dark:to-[#0d1729]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/20 blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl -z-10" />
        <Spotlight color="rgba(255, 102, 178, 0.35)" size={550} className="-z-10" />

        <div className="max-w-md mx-auto px-5 py-16">
          <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-[#16181d]/70 backdrop-blur-xl shadow-2xl p-6">
            <div className="flex mb-6 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#16181d]/60">
              <button
                onClick={() => setTab('signin')}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  tab === 'signin'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-neutral-700 dark:text-neutral-200'
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  tab === 'signup'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-neutral-700 dark:text-neutral-200'
                }`}
              >
                Sign up
              </button>
            </div>

            <h1 className="text-2xl font-semibold mb-1">
              {tab === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6">
              {tab === 'signup'
                ? users.length === 0
                  ? 'First time here? Create an account to manage bookings and orders.'
                  : 'Create a new account.'
                : users.length === 0
                  ? 'New here? Switch to Sign up to create your account.'
                  : 'Sign in with your email and password.'}
            </p>

            <form onSubmit={submit} className="space-y-4">
              {tab === 'signup' && (
                <div>
                  <label className="text-sm font-medium">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 pr-14 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-[var(--color-primary)]"
                  >
                    {showPw ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {tab === 'signup' && password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <div className="text-xs mt-1 text-neutral-700 dark:text-neutral-300">
                      Strength: <span style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              {tab === 'signup' && (
                <div>
                  <label className="text-sm font-medium">Confirm password</label>
                  <div className="relative mt-1">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 pr-14 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-[var(--color-primary)]"
                    >
                      {showConfirm ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-indigo-500 text-white font-medium hover:opacity-95 transition"
              >
                {tab === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-5">
              Accounts are stored locally in this browser for demo purposes.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
