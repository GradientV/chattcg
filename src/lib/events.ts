import type { ShopEvent } from '../data/events.ts'
import { DAY_NAMES, formatTime, MINUTES_PER_DAY, type Weekday, type ZonedTime } from './hours.ts'

const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Events on one weekday, earliest first. */
export function eventsOn(events: readonly ShopEvent[], day: Weekday): ShopEvent[] {
  return events.filter((event) => event.day === day).sort((a, b) => a.starts - b.starts)
}

/** "Fri & Sun", "Fri, Sat & Sun": the weekdays a game has events, Monday first. */
export function playDays(events: readonly ShopEvent[]): string {
  const days = [...new Set(events.map((event) => event.day))].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
  const names = days.map((day) => SHORT_DAYS[day])
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names.at(-1)}` : (names[0] ?? '')
}

export interface NextEvents {
  /** Every event that starts at the next start time, e.g. two tournaments at 4 PM. */
  events: ShopEvent[]
  /** "today at 4 PM", "tomorrow at 1 PM", "Sunday at 2 PM". */
  when: string
}

/** The next events to start after `now`, looking up to a week ahead. */
export function getNextEvents(events: readonly ShopEvent[], now: ZonedTime): NextEvents | null {
  const wait = (event: ShopEvent) => {
    const minutes = (event.day - now.day) * MINUTES_PER_DAY + event.starts - now.minutes
    return (minutes + MINUTES_PER_WEEK) % MINUTES_PER_WEEK || MINUTES_PER_WEEK
  }
  const soonest = Math.min(...events.map(wait))
  if (!Number.isFinite(soonest)) return null

  const next = events.filter((event) => wait(event) === soonest)
  const daysAway = Math.floor((now.minutes + soonest) / MINUTES_PER_DAY)
  const day = daysAway === 0 ? 'today' : daysAway === 1 ? 'tomorrow' : daysAway === 7 ? `next ${DAY_NAMES[next[0].day]}` : DAY_NAMES[next[0].day]
  return { events: next, when: `${day} at ${formatTime(next[0].starts)}` }
}
