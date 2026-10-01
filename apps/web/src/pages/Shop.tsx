import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seo } from '../lib/seo'
import { products } from '../data/products'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'hair', label: 'Hair' },
  { key: 'nails', label: 'Nails' },
  { key: 'skin', label: 'Skin' },
] as const

export default function Shop() {
  return (
    <>
      <Helmet {...seo({ title: 'Shop', path: '/shop' })} />

      <section className="max-w-6xl mx-auto px-5 pt-14 pb-8">
        <h1 className="text-4xl font-semibold">Shop</h1>
        <p className="text-neutral-600 mt-2 max-w-2xl">
          Salon-grade products for hair, nails, and skin — delivered to your
          door.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.key}
              className="px-4 py-2 rounded-full border border-neutral-200 text-sm text-neutral-700"
            >
              {c.label}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            to={`/shop/${p.slug}`}
            className="rounded-2xl border border-neutral-200 overflow-hidden hover:border-[var(--color-primary)] transition flex flex-col"
          >
            <div
              className="h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${p.image}')` }}
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs uppercase text-neutral-500">
                {p.category}
              </div>
              <h2 className="font-semibold text-lg mt-1">{p.name}</h2>
              <p className="text-neutral-600 text-sm mt-2 flex-1">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[var(--color-primary)] font-semibold">
                  ${p.price.toFixed(2)}
                </span>
                <span className="text-xs text-neutral-500">
                  {p.stock} in stock
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
