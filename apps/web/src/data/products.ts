export type Product = {
  slug: string
  name: string
  category: 'hair' | 'nails' | 'skin'
  price: number
  description: string
  longDescription: string
  image: string
  stock: number
}

export const products: Product[] = [
  {
    slug: 'argan-oil-treatment',
    name: 'Argan Oil Treatment',
    category: 'hair',
    price: 18.5,
    description: 'Deep conditioning for damaged hair.',
    longDescription:
      'A rich, fast-absorbing argan treatment that rebuilds shine, softness, and strength. Safe for colored and chemically treated hair.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    stock: 25,
  },
  {
    slug: 'sulfate-free-shampoo',
    name: 'Sulfate-Free Shampoo',
    category: 'hair',
    price: 22.0,
    description: 'Gentle daily cleanse for color-treated hair.',
    longDescription:
      'A sulfate-free formula that cleanses without stripping color or natural oils. Balanced for daily use on all hair types.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    stock: 40,
  },
  {
    slug: 'nail-polish-set',
    name: 'Nail Polish Set',
    category: 'nails',
    price: 24.99,
    description: 'Twelve trending colors, chip-resistant formula.',
    longDescription:
      'A curated set of twelve high-pigment, chip-resistant polishes. Long-wear formula with a smooth, self-leveling finish.',
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800',
    stock: 30,
  },
  {
    slug: 'manicure-kit',
    name: 'Manicure Kit',
    category: 'nails',
    price: 32.99,
    description: 'Professional fifteen-piece nail care kit.',
    longDescription:
      'A complete fifteen-piece kit with stainless steel tools for at-home nail care. Includes clippers, pushers, files, and case.',
    image:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800',
    stock: 15,
  },
  {
    slug: 'hydrating-face-cream',
    name: 'Hydrating Face Cream',
    category: 'skin',
    price: 28.75,
    description: '24-hour moisture with SPF 30.',
    longDescription:
      'A daily face cream that locks in moisture for 24 hours while offering SPF 30 protection. Non-greasy, suitable for all skin types.',
    image:
      'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800',
    stock: 35,
  },
  {
    slug: 'gentle-cleanser',
    name: 'Gentle Cleanser',
    category: 'skin',
    price: 19.5,
    description: 'Soap-free daily cleanser for sensitive skin.',
    longDescription:
      'A soap-free, fragrance-free cleanser that removes makeup and impurities without disrupting your skin barrier. pH balanced.',
    image:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800',
    stock: 50,
  },
]
