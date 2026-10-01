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
          <div className="rounded-2xl border border-neutral-200 p-10 text-center">
            <p className="text-neutral-600">Your cart is empty.</p>
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
                  className="flex items-center gap-4 border border-neutral-200 rounded-2xl p-4"
                >
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url('${i.image}')` }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-neutral-500">
                      ${i.price.toFixed(2)} each
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => setQty(i.slug, parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 rounded-lg border border-neutral-200 text-center"
                  />
                  <div className="w-20 text-right font-medium">
                    ${(i.price * i.qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() => remove(i.slug)}
                    className="text-sm text-neutral-500 hover:text-[var(--color-primary)]"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={clear}
                className="text-sm text-neutral-500 hover:text-[var(--color-primary)]"
              >
                Clear cart
              </button>
            </div>

            <aside className="rounded-2xl border border-neutral-200 p-6 h-fit">
              <h2 className="font-semibold text-lg mb-4">Summary</h2>
              <div className="flex justify-between text-sm text-neutral-600 mb-2">
                <span>Subtotal</span>
                <span>${sum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600 mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-neutral-200 pt-4 flex justify-between font-semibold text-lg">
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
