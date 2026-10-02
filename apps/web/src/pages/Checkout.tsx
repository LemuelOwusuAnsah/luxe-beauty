import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import { seo } from '../lib/seo'
import { useCart } from '../lib/cart'

type Placed = {
  id: string
  customerName: string
  customerEmail: string
  total: string
  items: { slug: string; name: string; qty: number; price: number }[]
  createdAt: string
}

function generateReceipt(order: Placed) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pink = [255, 102, 178] as const
  const grey = [110, 110, 110] as const

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(pink[0], pink[1], pink[2])
  doc.text('Luxe Beauty', 40, 60)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(grey[0], grey[1], grey[2])
  doc.text('Digital Receipt', 40, 78)

  doc.setDrawColor(230, 230, 230)
  doc.line(40, 90, 555, 90)

  doc.setTextColor(20, 20, 20)
  doc.setFontSize(11)
  doc.text(`Order ID: ${order.id}`, 40, 115)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 40, 132)
  doc.text(`Customer: ${order.customerName}`, 40, 149)
  doc.text(`Email: ${order.customerEmail}`, 40, 166)

  doc.line(40, 185, 555, 185)

  doc.setFont('helvetica', 'bold')
  doc.text('Item', 40, 205)
  doc.text('Qty', 400, 205)
  doc.text('Price', 450, 205)
  doc.text('Total', 510, 205)

  doc.setFont('helvetica', 'normal')
  let y = 225
  order.items.forEach((i) => {
    doc.text(i.name.slice(0, 40), 40, y)
    doc.text(String(i.qty), 400, y)
    doc.text(`$${i.price.toFixed(2)}`, 450, y)
    doc.text(`$${(i.price * i.qty).toFixed(2)}`, 510, y)
    y += 18
  })

  doc.line(40, y + 5, 555, y + 5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('Total', 450, y + 28)
  doc.text(`$${Number(order.total).toFixed(2)}`, 510, y + 28)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(grey[0], grey[1], grey[2])
  doc.text('Thanks for trying the Luxe Demo Project.', 40, y + 70)
  doc.text('Built by Lemy - facebook.com/lemuelowusuansah', 40, y + 85)

  doc.save(`luxe-beauty-receipt-${order.id.slice(0, 8)}.pdf`)
}

export default function Checkout() {
  const { items, total, clear } = useCart()
  const sum = total()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [placed, setPlaced] = useState<Placed | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        customerName: name,
        customerEmail: email,
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.qty,
          unitPrice: i.price.toFixed(2),
        })),
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (!res.ok) throw new Error('Order failed')

      const order = await res.json()

      const placedOrder: Placed = {
        id: order.id,
        customerName: name,
        customerEmail: email,
        total: sum.toFixed(2),
        createdAt: order.createdAt ?? new Date().toISOString(),
        items: items.map((i) => ({
          slug: i.slug,
          name: i.name,
          qty: i.qty,
          price: i.price,
        })),
      }

      setPlaced(placedOrder)
      clear()
    } catch (err) {
      console.error(err)
      setError('Could not place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (placed) {
    return (
      <>
        <Helmet {...seo({ title: 'Order Confirmed', path: '/checkout' })} />
        <section className="max-w-2xl mx-auto px-5 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold mt-6">Thank you, {placed.customerName}</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mt-3">
            Your order <span className="font-mono text-xs">{placed.id.slice(0, 8)}</span> has been placed.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 mt-2">
            Thanks for trying the Luxe Demo Project.
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 text-left">
            <div className="font-semibold mb-3">Order summary</div>
            <ul className="space-y-2 text-sm">
              {placed.items.map((i) => (
                <li key={i.slug} className="flex justify-between">
                  <span>{i.name} × {i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>${placed.total}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => generateReceipt(placed)}
              className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)]"
            >
              Download receipt
            </button>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:border-[var(--color-primary)]"
            >
              Continue shopping
            </Link>
            <Link
              to="/admin"
              className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:border-[var(--color-primary)]"
            >
              View orders
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Helmet {...seo({ title: 'Checkout', path: '/checkout' })} />

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h1 className="text-4xl font-semibold mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-10 text-center">
            <p className="text-neutral-700 dark:text-neutral-300">Nothing to check out yet.</p>
            <Link
              to="/shop"
              className="inline-block mt-5 px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            >
              Go to shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            <form onSubmit={onSubmit} className="space-y-4">
              <h2 className="font-semibold text-lg">Shipping details</h2>
              <input
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
              />
              <input
                required
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
              />
              <input
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16181d]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-5 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
              >
                {submitting ? 'Placing order…' : 'Place order'}
              </button>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                  {error}
                </p>
              )}
            </form>

            <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 h-fit">
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
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex justify-between font-semibold">
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
