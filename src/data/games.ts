export type GameId = 'pokemon' | 'one-piece' | 'magic' | 'riftbound' | 'yugioh' | 'gundam' | 'dragon-ball'

export interface Game {
  id: GameId
  name: string
  /** Label for tiles and filters. */
  short: string
}

/**
 * Games the shop stocks or runs events for, from its Instagram posts, Facebook page and
 * The Card Shop Finder listing (Oct 2026). TODO: have the owner confirm the lineup.
 */
export const games: readonly Game[] = [
  { id: 'pokemon', name: 'Pokémon TCG', short: 'Pokémon' },
  { id: 'one-piece', name: 'One Piece Card Game', short: 'One Piece' },
  { id: 'magic', name: 'Magic: The Gathering', short: 'Magic' },
  { id: 'riftbound', name: 'Riftbound', short: 'Riftbound' },
  { id: 'yugioh', name: 'Yu-Gi-Oh!', short: 'Yu-Gi-Oh!' },
  { id: 'gundam', name: 'Gundam Card Game', short: 'Gundam' },
  { id: 'dragon-ball', name: 'Dragon Ball Super Card Game', short: 'Dragon Ball' },
]

export const gamesById = Object.fromEntries(games.map((game) => [game.id, game])) as Record<GameId, Game>

/** What's on the shelves, for the "What we carry" list. TODO: owner to confirm. */
export const products = [
  {
    title: 'Sealed packs, boxes & ETBs',
    text: 'Booster packs, booster boxes and Elite Trainer Boxes for the games we play, with new sets on the counter as they land.',
  },
  {
    title: 'Singles in the case',
    text: 'English Pokémon and One Piece singles, from playables for your next deck to the chase cards.',
  },
  {
    title: 'Graded slabs',
    text: 'Graded cards in the display case, for collectors who want the condition settled.',
  },
  {
    title: 'Japanese imports',
    text: 'Japanese Pokémon product alongside the English releases.',
  },
  {
    title: 'Sleeves & supplies',
    text: 'Sleeves and the basics to protect what you pull before it leaves the counter.',
  },
] as const
