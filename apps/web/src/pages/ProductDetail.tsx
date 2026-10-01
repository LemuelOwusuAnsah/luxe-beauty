import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { seo } from '../lib/seo'
import { products } from '../data/products'
import { useCart } from '../lib/cart'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const add = useCart((s) => s.add)

  if (!product) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <p className="mt-3 text-neutral-600">
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
        <nav className="text-sm text-neutral-500 mb-6">
          <Link to="/shop" className="hover:text-[var(--color-primary)]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div
            className="rounded-2xl h-96 bg-cover bg-center border border-neutral-200"
            style={{ backgroundImage: `url('${product.image}')` }}
          />

          <div>
            <div className="text-xs uppercase text-neutral-500">
              {product.category}
            </div>
            <h1 className="text-3xl font-semibold mt-2">{product.name}</h1>
            <p className="text-[var(--color-primary)] text-2xl font-semibold mt-3">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-neutral-600 mt-5">{product.longDescription}</p>

            <div className="mt-6 text-sm text-neutral-500">
              {product.stock} in stock
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => add(product)}
                className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
              >
                Add to cart
              </button>
              <Link
                to="/cart"
                className="px-6 py-3 rounded-lg border border-neutral-200 font-medium hover:border-[var(--color-primary)]"
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
