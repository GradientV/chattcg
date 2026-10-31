import { hours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, toIsoTime, WEEK_ORDER } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'

const title = `${site.name} | Pokémon & Trading Card Shop in Middle Village, Queens`
const image = `${site.url}/og-image.png`

/** schema.org HobbyShop data, so search engines show the official hours, address and phone number. */
function structuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HobbyShop',
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    image,
    description: site.description,
    telephone: site.phoneHref.replace('tel:', ''),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', ...site.geo },
    hasMap: site.links.google,
    openingHoursSpecification: WEEK_ORDER.flatMap((day) => {
      const open = hours[day]
      return open
        ? [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: `https://schema.org/${DAY_NAMES[day]}`,
              opens: toIsoTime(open.opens),
              closes: toIsoTime(open.closes),
            },
          ]
        : []
    }),
    sameAs: [site.links.instagram, site.links.facebook],
  }
  // Escape "<" so nothing in the data can close the <script> tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function head(): string {
  const description = esc(site.description)
  return html`<title>${esc(title)}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${site.url}/" />
    <meta name="theme-color" content="#0b0b0c" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${site.url}/" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Chat TCG, the card shop in Middle Village, Queens" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${structuredData()}</script>`
}
