import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { seo } from '../lib/seo'
import { services } from '../data/services'
import { site } from '../data/site'

export default function Book() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')

  const today = new Date().toISOString().split('T')[0]

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(
      `Thanks ${name}, we received your request for ${service} on ${date}. We will confirm by phone shortly.`,
    )
    setName('')
    setPhone('')
    setService('')
    setDate('')
  }

  return (
    <>
      <Helmet {...seo({ title: 'Book', path: '/book' })} />

      <section className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold">Book an appointment</h1>
          <p className="text-neutral-600 mt-3 max-w-lg">
            Pick a service and a preferred date. We will call you to confirm the
            exact time.
          </p>
          <div className="mt-8 rounded-2xl border border-neutral-200 p-6">
            <div className="font-semibold mb-2">Salon hours</div>
            <p className="text-neutral-600 text-sm">{site.contact.hours}</p>
            <div className="font-semibold mt-5 mb-2">Phone</div>
            <p className="text-neutral-600 text-sm">{site.contact.phone}</p>
            <div className="font-semibold mt-5 mb-2">Location</div>
            <p className="text-neutral-600 text-sm">{site.contact.address}</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-neutral-200 p-6 space-y-4 h-fit"
        >
          <div>
            <label className="text-sm font-medium">Your name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Service</label>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name} — from ${s.priceFrom}
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
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
          >
            Request booking
          </button>

          {message && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
              {message}
            </p>
          )}
        </form>
      </section>
    </>
  )
}
