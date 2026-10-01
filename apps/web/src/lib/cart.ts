import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProduct = {
  slug: string
  name: string
  price: number
  image: string
}

export type CartItem = {
  slug: string
  name: string
  price: number
  image: string
  qty: number
}

type CartState = {
  items: CartItem[]
  add: (p: CartProduct, qty?: number) => void
  remove: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === p.slug)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === p.slug ? { ...i, qty: i.qty + qty } : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { slug: p.slug, name: p.name, price: p.price, image: p.image, qty },
            ],
          }
        }),
      remove: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.slug === slug ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'luxe-beauty-cart' },
  ),
)
