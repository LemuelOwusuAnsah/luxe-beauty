import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useCart } from '../lib/cart'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const sum = total()

  return (
    <>
      <Helmet {...seo({ title: 'Checkout', path: '/checkout' })} />

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h1 className="text-4xl font-semibold mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 p-10 text-center">
            <p className="text-neutral-600">Nothing to check out yet.</p>
            <Link
              to="/shop"
              className="inline-block mt-5 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            >
              Go to shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Checkout is a demo — Stripe integration arrives next.')
                clear()
              }}
              className="space-y-4"
            >
              <h2 className="font-semibold text-lg">Shipping details</h2>
              <input
                required
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200"
              />
              <input
                required
                placeholder="Address"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200"
              />
              <input
                required
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
              >
                Place order (demo)
              </button>
            </form>

            <aside className="rounded-2xl border border-neutral-200 p-6 h-fit">
              <h2 className="font-semibold text-lg mb-4">Order summary</h2>
              <ul className="space-y-3 mb-4">
                {items.map((i) => (
                  <li key={i.slug} className="flex justify-between text-sm">
                    <span>
                      {i.name} × {i.qty}
                    </span>
                    <span>${(i.price * i.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-200 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${sum.toFixed(2)}</span>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
