export type Service = {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  priceFrom: number
  duration: number
  image: string
  highlights: string[]
}

export const services: Service[] = [
  {
    slug: 'nail-art',
    name: 'Nail Art & Design',
    tagline: 'Classic manicures to statement nail art',
    description:
      'Precision shaping, cuticle care, and long-wear finishes tailored to your style.',
    longDescription:
      'Our nail studio blends classic manicure technique with modern art. Choose from gel, acrylic, chrome, ombre, hand-painted designs, and seasonal collections. Every appointment includes a full consult, shaping, cuticle care, and a protective finish built to last.',
    priceFrom: 45,
    duration: 60,
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200',
    highlights: [
      'Gel, acrylic, and builder gel',
      'Hand-painted custom art',
      'Chrome, ombre, and French finishes',
      'Nail health and strengthening care',
    ],
  },
  {
    slug: 'hair-styling',
    name: 'Hair Styling',
    tagline: 'Cuts and styles shaped around you',
    description:
      'Wash, cut, blowout, and finish — designed for your face, texture, and routine.',
    longDescription:
      'From everyday blowouts to event styling, our stylists work with your natural texture to build a look that is easy to maintain at home. Includes a full consult, wash, cut or shape, blow dry, and finish.',
    priceFrom: 65,
    duration: 75,
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
    highlights: [
      'Precision cuts for all textures',
      'Blowouts and event styling',
      'Silk press and smoothing',
      'Home care routine coaching',
    ],
  },
  {
    slug: 'hair-coloring',
    name: 'Hair Coloring',
    tagline: 'Color that suits your tone and lifestyle',
    description:
      'Full color, highlights, balayage, and gloss — mapped to your skin tone.',
    longDescription:
      'Our color specialists begin every appointment with a color mapping session. Then we build your look using full color, highlights, balayage, or a custom gloss. All color services include a bonding treatment and aftercare guidance.',
    priceFrom: 120,
    duration: 150,
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
    highlights: [
      'Full color and root touch-ups',
      'Highlights and balayage',
      'Custom gloss and toners',
      'Bond-building treatment included',
    ],
  },
  {
    slug: 'spa-treatments',
    name: 'Spa Treatments',
    tagline: 'Restorative body and hair therapies',
    description:
      'Deep conditioning, scalp therapy, and full-body relaxation treatments.',
    longDescription:
      'Step away from the noise. Our spa treatments pair scalp therapy with deep conditioning masks and full-body relaxation. Choose from 60, 90, or 120 minute sessions — every treatment is designed to reset both hair and mood.',
    priceFrom: 85,
    duration: 90,
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200',
    highlights: [
      'Scalp and hair conditioning therapy',
      'Full-body relaxation massage',
      'Aromatherapy add-ons',
      '60 / 90 / 120 minute options',
    ],
  },
  {
    slug: 'facials',
    name: 'Facials',
    tagline: 'Skin treatments for real results',
    description:
      'Deep cleanse, exfoliation, masks, and hydration for all skin types.',
    longDescription:
      'Our facials are built around your skin, not a fixed menu. Every session starts with a skin analysis, then a deep cleanse, exfoliation, extractions where needed, mask, and hydration. Suitable for dry, oily, combination, and sensitive skin.',
    priceFrom: 75,
    duration: 60,
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200',
    highlights: [
      'Personal skin analysis',
      'Deep cleanse and exfoliation',
      'Hydration and mask therapy',
      'Add-on LED and peel options',
    ],
  },
  {
    slug: 'waxing',
    name: 'Waxing',
    tagline: 'Clean, careful, and quick',
    description:
      'Face, underarm, leg, and full-body waxing with gentle formulas.',
    longDescription:
      'We use gentle, low-temperature wax formulas and single-use applicators for a clean, careful result. Book a single area or a full-body package — our specialists work quickly so you spend less time in the chair.',
    priceFrom: 25,
    duration: 30,
    image:
      'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200',
    highlights: [
      'Face, underarm, and leg waxing',
      'Full-body packages',
      'Sensitive-skin formulas',
      'Single-use applicators',
    ],
  },
]
