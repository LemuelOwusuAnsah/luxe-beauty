import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seo } from '../lib/seo'
import { services } from '../data/services'
import { products } from '../data/products'
import { site } from '../data/site'

export default function Home() {
  const featured = services.slice(0, 3)
  const shopFeatured = products.slice(0, 4)

  return (
    <>
      <Helmet {...seo({ title: site.name, path: '/' })} />

      <section className="relative">
        <div
          className="h-[520px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600')",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 text-white">
            <p className="uppercase tracking-widest text-xs mb-3 opacity-90">
              {site.name}
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold max-w-2xl leading-tight">
              Luxury beauty, booked in seconds.
            </h1>
            <p className="mt-5 max-w-xl text-white/90">
              {site.tagline} Choose a service, pick a time, and manage everything in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="px-6 py-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] font-medium"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-lg border border-white/40 hover:border-white font-medium"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold">Featured services</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              A quick look at what we do best.
            </p>
          </div>
          <Link
            to="/services"
            className="text-sm underline text-neutral-600 dark:text-neutral-400"
          >
            All services
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-primary)] transition"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                  {s.description}
                </p>
                <p className="mt-3 text-[var(--color-primary)] font-semibold">
                  From ${s.priceFrom}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-900/40 py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold">Shop favorites</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Take the salon home with you.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-sm underline text-neutral-600 dark:text-neutral-400"
            >
              All products
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {shopFeatured.map((p) => (
              <Link
                key={p.slug}
                to={`/shop/${p.slug}`}
                className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-[var(--color-primary)] transition"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="p-4">
                  <h3 className="font-medium text-sm">{p.name}</h3>
                  <p className="mt-2 text-[var(--color-primary)] font-semibold">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="rounded-2xl bg-[var(--color-primary)] text-white p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold">Ready when you are.</h2>
            <p className="mt-2 text-white/90 max-w-xl">
              Book a service, add products to your cart, and check out in one
              smooth flow.
            </p>
          </div>
          <Link
            to="/book"
            className="px-6 py-3 rounded-lg bg-white text-[var(--color-primary-dark)] font-semibold hover:bg-neutral-100"
          >
            Book now
          </Link>
        </div>
      </section>
    </>
  )
}
