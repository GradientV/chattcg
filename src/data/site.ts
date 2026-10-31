const links = {
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Chat+TCG%2C+66-73+69th+St%2C+Middle+Village%2C+NY+11379',
  mapEmbed:
    'https://maps.google.com/maps?q=Chat%20TCG%2C%2066-73%2069th%20St%2C%20Middle%20Village%2C%20NY%2011379&z=16&output=embed',
  google: 'https://maps.google.com/?cid=5821183333673660688',
  instagram: 'https://www.instagram.com/chattcg_nyc/',
  instagramDm: 'https://ig.me/m/chattcg_nyc',
  facebook: 'https://www.facebook.com/Chattcg',
  // TODO: confirm this invite (from the Instagram bio) is set to never expire.
  discord: 'https://discord.gg/e8xhW7Rm6Z',
} as const

/**
 * Business details shared by the sections, the <head> tags and the structured data.
 * Checked Oct 30, 2026 against Google Maps, Instagram, Facebook and the Wizards store locator.
 */
export const site = {
  name: 'Chat TCG',
  legalName: 'Chat TCG LLC',
  // TODO: confirm the launch domain. chattcg.com belongs to an unrelated competitive team and chattcg.shop is the
  // impersonator; chattcgnyc.com (matches the Instagram handle) and chattcg.nyc were both unregistered on Oct 30, 2026.
  url: 'https://www.chattcgnyc.com',
  description:
    'Trading card shop in Middle Village, Queens. Pokémon, One Piece, Magic, Riftbound and more: sealed product, singles, graded slabs, weekly tournaments, open play, and buy, sell & trade.',
  phone: '(718) 690-1508',
  phoneHref: 'tel:+17186901508',
  // From the shop's Facebook page. TODO: confirm it's the inbox they want public.
  email: 'chattcg2025@gmail.com',
  address: {
    street: '66-73 69th St',
    locality: 'Middle Village',
    region: 'NY',
    postalCode: '11379',
  },
  geo: { latitude: 40.712608, longitude: -73.8862585 },
  transit: 'Steps from the M at Middle Village–Metropolitan Av · Q38, Q54 and Q67 buses',
  instagramHandle: '@chattcg_nyc',
  links,
  /** Snapshot from Oct 30, 2026; refresh now and then. */
  rating: { score: '4.4', count: 41 },
} as const
