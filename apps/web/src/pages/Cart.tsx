import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useCart } from '../lib/cart'

export default function Cart() {
  const { items, remove, setQty, total, clear } = useCart()
  const sum = total()

  return (
    <>
      <Helmet {...seo({ title: 'Cart', path: '/cart' })} />

      <section className="max-w-6xl mx-auto px-5 py-14">
        <h1 className="text-4xl font-semibold mb-8">Your cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-10 text-center">
            <p className="text-neutral-700 dark:text-neutral-300">Your cart is empty.</p>
            <Link
              to="/shop"
              className="inline-block mt-5 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((i) => (
                <div
                  key={i.slug}
                  className="flex flex-wrap items-center gap-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4"
                >
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url('${i.image}')` }}
                  />
                  <div className="flex-1 min-w-[140px]">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      ${i.price.toFixed(2)} each
                    </div>
                  </div>

                  <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => (i.qty > 1 ? setQty(i.slug, i.qty - 1) : remove(i.slug))}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 flex items-center justify-center text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => {
                        const v = parseInt(e.target.value)
                        setQty(i.slug, isNaN(v) ? 1 : Math.max(1, v))
                      }}
                      className="w-14 text-center border-0 bg-transparent focus:outline-none text-neutral-900 dark:text-neutral-100"
                    />
                    <button
                      type="button"
                      onClick={() => setQty(i.slug, i.qty + 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 flex items-center justify-center text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-20 text-right font-medium">
                    ${(i.price * i.qty).toFixed(2)}
                  </div>

                  <button
                    onClick={() => remove(i.slug)}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--color-primary)]"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={clear}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--color-primary)]"
              >
                Clear cart
              </button>
            </div>

            <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 h-fit">
              <h2 className="font-semibold text-lg mb-4">Summary</h2>
              <div className="flex justify-between text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                <span>Subtotal</span>
                <span>${sum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-700 dark:text-neutral-300 mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${sum.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 block text-center px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
              >
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
