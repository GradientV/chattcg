import type { Weekday } from '../lib/hours.ts'
import type { GameId } from './games.ts'

const at = (hour: number, minute = 0) => hour * 60 + minute

export interface ShopEvent {
  name: string
  game: GameId
  day: Weekday
  /** Minutes after midnight, New York time. */
  starts: number
  /** Entry fee in dollars, where the shop has published one. */
  fee?: number
  note?: string
}

/**
 * The weekly schedule from the shop's Instagram poster (Oct 4, 2026). Fees: Friday Night Magic from the
 * Wizards store locator, the Pokémon entry and prize from the Oct 3 League Challenge post.
 * TODO: confirm fees and formats for the other events with the owner.
 */
export const events: readonly ShopEvent[] = [
  { day: 0, starts: at(13), name: 'Riftbound Nexus Night', game: 'riftbound' },
  { day: 0, starts: at(13), name: 'Fusion World tournament', game: 'dragon-ball' },
  { day: 0, starts: at(14), name: 'One Piece tournament', game: 'one-piece' },
  { day: 2, starts: at(16, 30), name: 'Gundam tournament', game: 'gundam' },
  { day: 2, starts: at(16, 30), name: 'Dragon Ball Masters tournament', game: 'dragon-ball' },
  { day: 5, starts: at(15), name: 'Riftbound Nexus Night', game: 'riftbound' },
  { day: 5, starts: at(16), name: 'Friday Night Magic', game: 'magic', fee: 10 },
  { day: 5, starts: at(16), name: 'One Piece tournament', game: 'one-piece' },
  { day: 6, starts: at(13), name: 'Gundam tournament', game: 'gundam' },
  { day: 6, starts: at(13, 30), name: 'Pokémon tournament', game: 'pokemon', fee: 5, note: '1 prize pack per win' },
  { day: 6, starts: at(13, 30), name: 'Commander', game: 'magic' },
  { day: 6, starts: at(15, 30), name: 'Riftbound Nexus Night', game: 'riftbound' },
]

/**
 * Casual play, from the same poster: no time limit unless a scheduled event is on.
 * The poster says 10:30 PM, which reads as a typo for opening time. TODO: confirm.
 */
export const openPlay = {
  days: [1, 2, 3, 4, 5] as readonly Weekday[],
  note: 'No time limit unless an event is running',
}
