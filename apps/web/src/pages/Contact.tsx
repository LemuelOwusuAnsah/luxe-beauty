import { Helmet } from 'react-helmet-async'
import { seo } from '../lib/seo'
import { site } from '../data/site'

export default function Contact() {
  return (
    <>
      <Helmet {...seo({ title: 'Contact', path: '/contact' })} />

      <section className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold">Contact</h1>
          <p className="text-neutral-600 mt-3">
            Questions about services, bookings, or products? Send a message and
            we will get back to you.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-neutral-600">{site.contact.phone}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-neutral-600">{site.contact.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Address</div>
              <div className="text-neutral-600">{site.contact.address}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Hours</div>
              <div className="text-neutral-600">{site.contact.hours}</div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Message sent — demo only.')
          }}
          className="rounded-2xl border border-neutral-200 p-6 space-y-4 h-fit"
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              required
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              rows={5}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-neutral-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
          >
            Send message
          </button>
        </form>
      </section>
    </>
  )
}
