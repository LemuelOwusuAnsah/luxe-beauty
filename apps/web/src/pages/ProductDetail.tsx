import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useProduct } from '../lib/queries'
import { useCart } from '../lib/cart'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: product, isLoading, error } = useProduct(slug)
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="text-neutral-700 dark:text-neutral-300">Loading…</p>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          This product does not exist in our catalog.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
        >
          Back to shop
        </Link>
      </section>
    )
  }

  function handleAdd() {
    add(
      {
        id: product!.id,
        slug: product!.slug,
        name: product!.name,
        price: Number(product!.price),
        image: product!.image,
      },
      qty,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Helmet
        {...seo({
          title: product.name,
          description: product.description,
          path: `/shop/${product.slug}`,
        })}
      />

      <section className="max-w-6xl mx-auto px-5 pt-10 pb-20">
        <nav className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          <Link to="/shop" className="hover:text-[var(--color-primary)]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div
            className="rounded-2xl h-96 bg-cover bg-center border border-neutral-200 dark:border-neutral-800"
            style={{ backgroundImage: `url('${product.image}')` }}
          />

          <div>
            <div className="text-xs uppercase text-neutral-600 dark:text-neutral-400">
              {product.category}
            </div>
            <h1 className="text-3xl font-semibold mt-2">{product.name}</h1>
            <p className="text-[var(--color-primary)] text-2xl font-semibold mt-3">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mt-5">
              {product.longDescription}
            </p>

            <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
              {product.stock} in stock
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium block mb-2">Quantity</label>
              <div className="inline-flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value)
                    setQty(isNaN(v) ? 1 : Math.max(1, v))
                  }}
                  className="w-16 text-center border-0 bg-transparent focus:outline-none text-neutral-900 dark:text-neutral-100"
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className={`px-6 py-3 rounded-lg font-medium text-white transition ${
                  added
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                }`}
              >
                {added ? 'Added' : 'Add to cart'}
              </button>
              <Link
                to="/cart"
                className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:border-[var(--color-primary)]"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
