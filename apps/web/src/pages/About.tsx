import { Helmet } from 'react-helmet-async'
import { seo } from '../lib/seo'
import { site } from '../data/site'

export default function About() {
  return (
    <>
      <Helmet {...seo({ title: 'About', path: '/about' })} />

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h1 className="text-4xl font-semibold">About {site.name}</h1>
        <p className="text-neutral-600 mt-4">
          {site.name} is a modern salon built around three ideas: honest
          craftsmanship, calm spaces, and technology that gets out of the way.
        </p>
        <p className="text-neutral-600 mt-4">
          Our team covers nails, hair, skin, and spa. Every service begins with
          a real consultation, and every booking, product, and check-out flow is
          designed to feel effortless.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <div className="text-3xl font-semibold text-[var(--color-primary)]">
              15+
            </div>
            <div className="mt-2 text-neutral-600 text-sm">
              Specialist stylists and therapists.
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6">
            <div className="text-3xl font-semibold text-[var(--color-primary)]">
              6
            </div>
            <div className="mt-2 text-neutral-600 text-sm">
              Signature service lines.
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6">
            <div className="text-3xl font-semibold text-[var(--color-primary)]">
              100%
            </div>
            <div className="mt-2 text-neutral-600 text-sm">
              Client-first booking flow.
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-200 p-6">
          <div className="font-semibold">This site is a template.</div>
          <p className="text-neutral-600 mt-2 text-sm">
            {site.name} is a demonstration project built by{' '}
            <a
              href={site.author.url}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[var(--color-primary)]"
            >
              {site.author.name}
            </a>
            . It shows a complete full-stack salon experience: services,
            bookings, shop, cart, and checkout.
          </p>
        </div>
      </section>
    </>
  )
}
