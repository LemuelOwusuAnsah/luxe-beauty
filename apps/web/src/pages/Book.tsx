import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { seo } from '../lib/seo'
import { useServices, useCreateBooking } from '../lib/queries'
import { site } from '../data/site'

export default function Book() {
  const { data: services } = useServices()
  const createBooking = useCreateBooking()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!serviceId) {
      setError('Please choose a service.')
      return
    }

    try {
      await createBooking.mutateAsync({
        name,
        phone,
        email: email || undefined,
        serviceId: Number(serviceId),
        date,
      })
      setSuccess(true)
      setName('')
      setPhone('')
      setEmail('')
      setServiceId('')
      setDate('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Could not save booking. Please try again.')
      console.error(err)
    }
  }

  return (
    <>
      <Helmet {...seo({ title: 'Book', path: '/book' })} />

      <section className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold">Book an appointment</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mt-3 max-w-lg">
            Pick a service and a preferred date. We'll call you to confirm the
            exact time.
          </p>
          <div className="mt-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="font-semibold mb-2">Salon hours</div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm">{site.contact.hours}</p>
            <div className="font-semibold mt-5 mb-2">Phone</div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm">{site.contact.phone}</p>
            <div className="font-semibold mt-5 mb-2">Location</div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm">{site.contact.address}</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 h-fit overflow-hidden"
        >
          {success && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="mt-4 font-medium text-neutral-900 dark:text-neutral-100">
                Your message has been sent successfully
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Your name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Service</label>
            <select
              required
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
            >
              <option value="">Select a service</option>
              {services?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — from ${Number(s.priceFrom).toFixed(0)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Preferred date</label>
            <input
              required
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
            />
          </div>

          <button
            type="submit"
            disabled={createBooking.isPending}
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
          >
            {createBooking.isPending ? 'Sending…' : 'Request booking'}
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
              {error}
            </p>
          )}
        </form>
      </section>
    </>
  )
}
