import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-5 py-24 text-center">
      <div className="text-6xl font-semibold text-[var(--color-primary)]">
        404
      </div>
      <h1 className="text-2xl font-semibold mt-4">Page not found</h1>
      <p className="text-neutral-600 mt-3">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-block mt-6 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
      >
        Back home
      </Link>
    </section>
  )
}
