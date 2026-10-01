import { Helmet } from 'react-helmet-async'
import { seo } from '../lib/seo'
import { site } from '../data/site'

export default function Colophon() {
  return (
    <>
      <Helmet {...seo({ title: 'Colophon', path: '/colophon' })} />

      <section className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-4xl font-semibold">Colophon</h1>
        <p className="text-neutral-600 mt-3">
          How this site was built, and who made it.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Author</h2>
            <p className="text-neutral-600">
              {site.name} is designed and developed by {site.author.name} —{' '}
              <a
                href={site.author.url}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--color-primary)]"
              >
                {site.author.handle}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Stack</h2>
            <ul className="text-neutral-600 list-disc pl-5 space-y-1">
              <li>Vite + React + TypeScript</li>
              <li>React Router</li>
              <li>Tailwind CSS</li>
              <li>Zustand for cart state</li>
              <li>TanStack Query for server data</li>
              <li>Hono on Cloudflare Workers (API)</li>
              <li>Neon Postgres + Drizzle ORM</li>
              <li>Clerk for authentication</li>
              <li>Stripe for payments</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Typography</h2>
            <p className="text-neutral-600">
              System font stack with Inter as the primary typeface.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Colophon policy</h2>
            <p className="text-neutral-600">
              This page exists so anyone evaluating the site can see who built
              it, what it is, and how it works.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
