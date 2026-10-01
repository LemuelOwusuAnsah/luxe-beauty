import 'dotenv/config'
import { dbDirect as db } from './client-direct'
import { services, products } from './schema'

const serviceSeed = [
  {
    slug: 'nail-art',
    name: 'Nail Art & Design',
    tagline: 'Classic manicures to statement nail art',
    description: 'Precision shaping, cuticle care, and long-wear finishes tailored to your style.',
    longDescription: 'Our nail studio blends classic manicure technique with modern art. Choose from gel, acrylic, chrome, ombre, hand-painted designs, and seasonal collections.',
    priceFrom: '45.00',
    duration: 60,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200',
    highlights: ['Gel, acrylic, and builder gel', 'Hand-painted custom art', 'Chrome, ombre, and French finishes', 'Nail health and strengthening care'],
  },
  {
    slug: 'hair-styling',
    name: 'Hair Styling',
    tagline: 'Cuts and styles shaped around you',
    description: 'Wash, cut, blowout, and finish — designed for your face, texture, and routine.',
    longDescription: 'From everyday blowouts to event styling, our stylists work with your natural texture to build a look that is easy to maintain at home.',
    priceFrom: '65.00',
    duration: 75,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
    highlights: ['Precision cuts for all textures', 'Blowouts and event styling', 'Silk press and smoothing', 'Home care routine coaching'],
  },
  {
    slug: 'hair-coloring',
    name: 'Hair Coloring',
    tagline: 'Color that suits your tone and lifestyle',
    description: 'Full color, highlights, balayage, and gloss — mapped to your skin tone.',
    longDescription: 'Our color specialists begin every appointment with a color mapping session, then build your look with full color, highlights, balayage, or a custom gloss.',
    priceFrom: '120.00',
    duration: 150,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
    highlights: ['Full color and root touch-ups', 'Highlights and balayage', 'Custom gloss and toners', 'Bond-building treatment included'],
  },
  {
    slug: 'spa-treatments',
    name: 'Spa Treatments',
    tagline: 'Restorative body and hair therapies',
    description: 'Deep conditioning, scalp therapy, and full-body relaxation treatments.',
    longDescription: 'Our spa treatments pair scalp therapy with deep conditioning masks and full-body relaxation. Choose from 60, 90, or 120 minute sessions.',
    priceFrom: '85.00',
    duration: 90,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200',
    highlights: ['Scalp and hair conditioning therapy', 'Full-body relaxation massage', 'Aromatherapy add-ons', '60 / 90 / 120 minute options'],
  },
  {
    slug: 'facials',
    name: 'Facials',
    tagline: 'Skin treatments for real results',
    description: 'Deep cleanse, exfoliation, masks, and hydration for all skin types.',
    longDescription: 'Our facials are built around your skin. Every session starts with a skin analysis, then cleanse, exfoliation, mask, and hydration.',
    priceFrom: '75.00',
    duration: 60,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200',
    highlights: ['Personal skin analysis', 'Deep cleanse and exfoliation', 'Hydration and mask therapy', 'Add-on LED and peel options'],
  },
  {
    slug: 'waxing',
    name: 'Waxing',
    tagline: 'Clean, careful, and quick',
    description: 'Face, underarm, leg, and full-body waxing with gentle formulas.',
    longDescription: 'We use gentle, low-temperature wax formulas and single-use applicators for a clean, careful result.',
    priceFrom: '25.00',
    duration: 30,
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200',
    highlights: ['Face, underarm, and leg waxing', 'Full-body packages', 'Sensitive-skin formulas', 'Single-use applicators'],
  },
]

const productSeed = [
  { slug: 'argan-oil-treatment', name: 'Argan Oil Treatment', category: 'hair', price: '18.50', description: 'Deep conditioning for damaged hair.', longDescription: 'A rich, fast-absorbing argan treatment that rebuilds shine, softness, and strength.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', stock: 25 },
  { slug: 'sulfate-free-shampoo', name: 'Sulfate-Free Shampoo', category: 'hair', price: '22.00', description: 'Gentle daily cleanse for color-treated hair.', longDescription: 'A sulfate-free formula that cleanses without stripping color or natural oils.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800', stock: 40 },
  { slug: 'nail-polish-set', name: 'Nail Polish Set', category: 'nails', price: '24.99', description: 'Twelve trending colors, chip-resistant formula.', longDescription: 'A curated set of twelve high-pigment, chip-resistant polishes.', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800', stock: 30 },
  { slug: 'manicure-kit', name: 'Manicure Kit', category: 'nails', price: '32.99', description: 'Professional fifteen-piece nail care kit.', longDescription: 'A complete fifteen-piece kit with stainless steel tools for at-home nail care.', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800', stock: 15 },
  { slug: 'hydrating-face-cream', name: 'Hydrating Face Cream', category: 'skin', price: '28.75', description: '24-hour moisture with SPF 30.', longDescription: 'A daily face cream that locks in moisture for 24 hours while offering SPF 30 protection.', image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800', stock: 35 },
  { slug: 'gentle-cleanser', name: 'Gentle Cleanser', category: 'skin', price: '19.50', description: 'Soap-free daily cleanser for sensitive skin.', longDescription: 'A soap-free, fragrance-free cleanser that removes makeup and impurities without disrupting your skin barrier.', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800', stock: 50 },
]

async function main() {
  console.log('Seeding services...')
  await db.insert(services).values(serviceSeed).onConflictDoNothing()
  console.log('Seeding products...')
  await db.insert(products).values(productSeed).onConflictDoNothing()
  console.log('Seed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
