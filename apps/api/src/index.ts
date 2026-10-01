import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { eq, desc } from 'drizzle-orm'
import { createDb, services, products, bookings, orders, orderItems } from '@luxe-beauty/db'

type Env = { DATABASE_URL: string }

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({
  origin: [
    'https://luxe-beauty.lemuelowusuansah.org',
    'https://luxe-beauty.pages.dev',
    'http://localhost:5173',
  ],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.onError((err, c) => {
  console.error('API ERROR:', err)
  return c.json({ error: err.message, stack: err.stack }, 500)
})

app.get('/api/health', (c) => c.json({ ok: true, service: 'luxe-beauty-api' }))

app.get('/api/services', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const rows = await db.select().from(services).where(eq(services.active, true))
  return c.json(rows)
})

app.get('/api/services/:slug', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const slug = c.req.param('slug')
  const row = await db.select().from(services).where(eq(services.slug, slug)).limit(1)
  if (!row.length) return c.json({ error: 'Not found' }, 404)
  return c.json(row[0])
})

app.get('/api/products', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const rows = await db.select().from(products).where(eq(products.active, true))
  return c.json(rows)
})

app.get('/api/products/:slug', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const slug = c.req.param('slug')
  const row = await db.select().from(products).where(eq(products.slug, slug)).limit(1)
  if (!row.length) return c.json({ error: 'Not found' }, 404)
  return c.json(row[0])
})

app.post('/api/bookings', async (c) => {
  const body = await c.req.json<{
    name: string; phone: string; serviceId: number; date: string; email?: string
  }>()
  if (!body.name || !body.phone || !body.serviceId || !body.date) {
    return c.json({ error: 'name, phone, serviceId, and date are required' }, 400)
  }
  const db = createDb(c.env.DATABASE_URL)
  const inserted = await db.insert(bookings).values({
    name: body.name,
    email: body.email ?? null,
    phone: body.phone,
    serviceId: body.serviceId,
    date: body.date,
  }).returning()
  return c.json(inserted[0], 201)
})

app.get('/api/bookings', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(100)
  return c.json(rows)
})

app.post('/api/orders', async (c) => {
  const body = await c.req.json<{
    customerName: string; customerEmail: string
    items: { productId: number; quantity: number; unitPrice: string }[]
  }>()
  if (!body.customerName || !body.customerEmail || !body.items?.length) {
    return c.json({ error: 'customerName, customerEmail, and items are required' }, 400)
  }
  const total = body.items.reduce((sum, i) => sum + Number(i.unitPrice) * i.quantity, 0).toFixed(2)
  const db = createDb(c.env.DATABASE_URL)
  const [order] = await db.insert(orders).values({
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    total,
  }).returning()
  await db.insert(orderItems).values(
    body.items.map((i) => ({
      orderId: order.id, productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice,
    })),
  )
  return c.json({ ...order, items: body.items }, 201)
})

app.get('/api/orders', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100)
  return c.json(rows)
})


export default app

