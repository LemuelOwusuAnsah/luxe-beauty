import { site } from '../data/site'

type SeoInput = {
  title: string
  description?: string
  path?: string
}

export function seo({ title, description, path = '/' }: SeoInput) {
  const fullTitle =
    title === site.name ? site.name : `${title} | ${site.name}`
  const desc = description ?? site.description
  const url = `https://luxe-beauty.pages.dev${path}`

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: desc },
      { name: 'author', content: site.author.name },
      {
        name: 'generator',
        content: `${site.name} — built by ${site.author.handle}`,
      },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: site.name },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: desc },
    ],
    link: [{ rel: 'canonical', href: url }],
  }
}
