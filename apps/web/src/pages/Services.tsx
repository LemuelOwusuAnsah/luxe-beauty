import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seo } from '../lib/seo'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <Helmet {...seo({ title: 'Services', path: '/services' })} />

      <section className="max-w-6xl mx-auto px-5 pt-14 pb-6">
        <h1 className="text-4xl font-semibold">Services</h1>
        <p className="text-neutral-600 mt-2 max-w-2xl">
          From nails to hair to skin, every service is delivered by specialists
          and built around you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16 grid gap-8 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.slug}
            className="rounded-2xl overflow-hidden border border-neutral-200 flex flex-col"
          >
            <div
              className="h-56 bg-cover bg-center"
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold">{s.name}</h2>
              <p className="text-[var(--color-primary)] font-medium mt-1">
                {s.tagline}
              </p>
              <p className="text-neutral-600 mt-3">{s.description}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
                <span>From ${s.priceFrom}</span>
                <span>·</span>
                <span>{s.duration} min</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/services/${s.slug}`}
                  className="px-4 py-2 rounded-lg border border-neutral-200 hover:border-[var(--color-primary)] text-sm font-medium"
                >
                  View details
                </Link>
                <Link
                  to="/book"
                  className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)]"
                >
                  Book
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
