import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { seo } from '../lib/seo'
import { useAuth } from '../lib/auth'
import { useServices, useProducts, useBookings } from '../lib/queries'

export default function Admin() {
  const navigate = useNavigate()
  const { current, signout } = useAuth()
  const { data: services } = useServices()
  const { data: products } = useProducts()
  const { data: bookings } = useBookings()

  useEffect(() => {
    if (!current) navigate('/auth', { replace: true })
  }, [current, navigate])

  if (!current) return null

  return (
    <>
      <Helmet {...seo({ title: 'Admin', path: '/admin' })} />

      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold">Admin</h1>
            <p className="text-neutral-700 dark:text-neutral-300 mt-2">
              Signed in as <strong>{current.name}</strong> ({current.email})
            </p>
          </div>
          <button
            onClick={() => {
              signout()
              navigate('/')
            }}
            className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:border-[var(--color-primary)]"
          >
            Sign out
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="text-sm text-neutral-600 dark:text-neutral-300">Services</div>
            <div className="text-3xl font-semibold mt-1">{services?.length ?? '—'}</div>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="text-sm text-neutral-600 dark:text-neutral-300">Products</div>
            <div className="text-3xl font-semibold mt-1">{products?.length ?? '—'}</div>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="text-sm text-neutral-600 dark:text-neutral-300">Bookings</div>
            <div className="text-3xl font-semibold mt-1">{bookings?.length ?? '—'}</div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
            Recent bookings
          </div>
          {bookings && bookings.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-left">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const svc = services?.find((s) => s.id === b.serviceId)
                  return (
                    <tr key={b.id} className="border-t border-neutral-100 dark:border-neutral-800">
                      <td className="px-6 py-3">{b.name}</td>
                      <td className="px-6 py-3">{b.phone}</td>
                      <td className="px-6 py-3 text-neutral-600 dark:text-neutral-300">
                        {svc?.name ?? '—'}
                      </td>
                      <td className="px-6 py-3">{b.date}</td>
                      <td className="px-6 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-8 text-neutral-600 dark:text-neutral-300 text-sm">
              No bookings yet.
            </div>
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
            Catalogue
          </div>
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-left">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {services?.map((s) => (
                <tr key={s.slug} className="border-t border-neutral-100 dark:border-neutral-800">
                  <td className="px-6 py-3">{s.name}</td>
                  <td className="px-6 py-3 text-neutral-600 dark:text-neutral-300">Service</td>
                  <td className="px-6 py-3">From ${Number(s.priceFrom).toFixed(0)}</td>
                </tr>
              ))}
              {products?.map((p) => (
                <tr key={p.slug} className="border-t border-neutral-100 dark:border-neutral-800">
                  <td className="px-6 py-3">{p.name}</td>
                  <td className="px-6 py-3 text-neutral-600 dark:text-neutral-300">Product</td>
                  <td className="px-6 py-3">${Number(p.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
