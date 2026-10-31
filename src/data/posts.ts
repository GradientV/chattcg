import type { Photo } from '../lib/photo.ts'
import { photos } from './photos.ts'

export interface Post {
  photo: Photo
  /** Card title, from the post's caption. */
  title: string
  date: string
  url: string
}

const post = (id: string) => `https://www.instagram.com/chattcg_nyc/p/${id}/`

/**
 * "Fresh from the counter": recent Instagram posts, newest first. Swap in new ones as they go up
 * (save the image to public/images in 640px and full widths, add it to data/photos.ts, then list it here).
 */
export const posts: readonly Post[] = [
  { photo: photos.deckCrafters, title: 'Deck Crafter’s Collection', date: '2026-10-29', url: post('DfFcEk3No5w') },
  { photo: photos.rgbMew, title: 'RGB Mew, pulled from an ETB', date: '2026-10-25', url: post('De7JkBiNBdt') },
  { photo: photos.pokemonRestock, title: 'Pokémon 30th Celebration restock', date: '2026-10-23', url: post('De116dctEGw') },
  { photo: photos.riftboundRadiance, title: 'Riftbound Radiance is here', date: '2026-10-23', url: post('De1wvXUtWB3') },
  { photo: photos.yugioh, title: 'Yu-Gi-Oh! Beyond the Brave', date: '2026-10-09', url: post('DeRvQDKtJK5') },
]

/** Hero hand: the two photo cards that flank the shop's holo card. */
export const heroPosts = {
  left: { photo: photos.battleDecks, title: '30th Celebration Battle Decks', date: '2026-10-30', url: post('DfHy6EAtuxw') },
  right: { photo: photos.charizardPull, title: 'Customer pull: Charizard', date: '2026-10-03', url: post('DeCwuAvN_ur') },
} satisfies Record<string, Post>
