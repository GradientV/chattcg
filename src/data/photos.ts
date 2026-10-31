import { shopPhoto, type Photo } from '../lib/photo.ts'

/**
 * Chat TCG's own photos, from their Instagram (@chattcg_nyc, Oct 2026), resized into public/images.
 * TODO: get the owner's OK to use them (customer-pull shows a customer's face), and ask for a few
 * wide shots of the counter and play tables for the next round.
 */
export const photos = {
  battleDecks: shopPhoto('battle-decks', [640, 1080], 'Pokémon 30th Celebration Battle Decks, Umbreon ex and Espeon ex, on the glass counter'),
  charizardPull: shopPhoto('charizard-pull', [640, 1080], 'A sleeved holographic Charizard card held up after being pulled'),
  customerPull: shopPhoto('customer-pull', [640, 1080], 'A smiling customer showing off a card he pulled, with players at the tables behind him'),
  deckCrafters: shopPhoto('deck-crafters', [640, 1080], 'A row of Pokémon Deck Crafter’s Collection boxes on display'),
  pokemonRestock: shopPhoto('pokemon-restock', [640, 944], 'Pokémon 30th Celebration Elite Trainer Boxes and a Poster Collection on the counter'),
  rgbMew: shopPhoto('rgb-mew', [640, 1080], 'A red holographic Mew card on a playmat'),
  riftboundRadiance: shopPhoto('riftbound-radiance', [640, 944], 'Stacked boxes of Riftbound Radiance on the counter'),
  yugioh: shopPhoto('yugioh-beyond-the-brave', [640, 1080], 'A pyramid of Yu-Gi-Oh! Beyond the Brave booster boxes'),
} satisfies Record<string, Photo>
