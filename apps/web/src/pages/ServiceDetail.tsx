import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useService } from '../lib/queries'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { data: service, isLoading, error } = useService(slug)

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="text-neutral-600 dark:text-neutral-300">Loading…</p>
      </section>
    )
  }

  if (error || !service) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Service not found</h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          The service you are looking for does not exist.
        </p>
        <Link
          to="/services"
          className="inline-block mt-6 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
        >
          Back to services
        </Link>
      </section>
    )
  }

  return (
    <>
      <Helmet
        {...seo({
          title: service.name,
          description: service.description,
          path: `/services/${service.slug}`,
        })}
      />

      <section className="max-w-6xl mx-auto px-5 pt-10 pb-16">
        <nav className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          <Link to="/services" className="hover:text-[var(--color-primary)]">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span>{service.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div
            className="rounded-2xl h-80 bg-cover bg-center border border-neutral-200 dark:border-neutral-800"
            style={{ backgroundImage: `url('${service.image}')` }}
          />

          <div>
            <h1 className="text-4xl font-semibold">{service.name}</h1>
            <p className="text-[var(--color-primary)] font-medium mt-1">
              {service.tagline}
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mt-5">
              {service.longDescription}
            </p>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <div className="text-xs uppercase text-neutral-600 dark:text-neutral-400">From</div>
                <div className="text-2xl font-semibold text-[var(--color-primary)]">
                  ${Number(service.priceFrom).toFixed(0)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-neutral-600 dark:text-neutral-400">Duration</div>
                <div className="text-2xl font-semibold">{service.duration} min</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
              >
                Book this service
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:border-[var(--color-primary)]"
              >
                Back to services
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-5">What is included</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {service.highlights?.map((h) => (
              <li
                key={h}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-neutral-800 dark:text-neutral-200"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
