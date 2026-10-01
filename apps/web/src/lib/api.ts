const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787'

export type ServiceDTO = {
  id: number
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  priceFrom: string
  duration: number
  image: string
  highlights: string[]
  active: boolean
}

export type ProductDTO = {
  id: number
  slug: string
  name: string
  category: string
  price: string
  description: string
  longDescription: string
  image: string
  stock: number
  active: boolean
}

export type BookingDTO = {
  id: string
  name: string
  email: string | null
  phone: string
  serviceId: number
  date: string
  status: string
  createdAt: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  services: {
    list: () => request<ServiceDTO[]>('/api/services'),
    get: (slug: string) => request<ServiceDTO>(`/api/services/${slug}`),
  },
  products: {
    list: () => request<ProductDTO[]>('/api/products'),
    get: (slug: string) => request<ProductDTO>(`/api/products/${slug}`),
  },
  bookings: {
    list: () => request<BookingDTO[]>('/api/bookings'),
    create: (payload: { name: string; phone: string; serviceId: number; date: string; email?: string }) =>
      request<BookingDTO>('/api/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  },
  orders: {
    create: (payload: {
      customerName: string
      customerEmail: string
      items: { productId: number; quantity: number; unitPrice: string }[]
    }) => request('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  },
}
