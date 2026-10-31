import { events } from '../data/events.ts'
import { gamesById, type GameId } from '../data/games.ts'
import { getNextEvents } from '../lib/events.ts'
import { nowInNewYork } from '../lib/hours.ts'

/**
 * Highlights today's column in the weekly schedule, keeps the "Next up" line current (New York
 * time), and wires up the game filter, including the "See events" links on the game tiles.
 * On phones the stacked days start from today (--order). Without JavaScript the whole week
 * shows Monday first, unfiltered.
 */
export function initEvents(): void {
  const days = [...document.querySelectorAll<HTMLElement>('[data-event-day]')]
  if (!days.length) return

  const next = document.querySelector<HTMLElement>('[data-next-event]')
  const nextLabel = next?.querySelector('[data-next-event-label]')

  const update = () => {
    const now = nowInNewYork()
    days.forEach((day) => {
      const weekday = Number(day.dataset.eventDay)
      day.toggleAttribute('data-today', weekday === now.day)
      day.style.setProperty('--order', String((weekday - now.day + 7) % 7))
    })

    const upcoming = getNextEvents(events, now)
    if (next && nextLabel && upcoming) {
      nextLabel.textContent = `${upcoming.events.map((event) => event.name).join(' & ')}, ${upcoming.when}`
      next.hidden = false
    }
  }
  update()
  window.setInterval(update, 60_000)

  const filters = document.querySelector<HTMLElement>('[data-event-filters]')
  if (!filters) return
  const buttons = [...filters.querySelectorAll<HTMLButtonElement>('[data-filter]')]

  const apply = (filter: string) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)))
    for (const day of days) {
      let shown = 0
      day.querySelectorAll<HTMLElement>('[data-game]').forEach((row) => {
        const game = row.dataset.game
        const visible = filter === 'all' || game === 'open' || game === filter
        row.hidden = !visible
        if (visible && game !== 'open') shown++
      })
      const empty = filter !== 'all' && shown === 0
      day.toggleAttribute('data-empty', empty)
      const message = day.querySelector<HTMLElement>('[data-empty-message]')
      if (message) {
        message.hidden = !empty
        message.textContent = empty ? `No ${gamesById[filter as GameId].short} events` : ''
      }
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.filter ?? 'all')))
  document.querySelectorAll<HTMLElement>('[data-filter-link]').forEach((link) => {
    link.addEventListener('click', () => apply(link.dataset.filterLink ?? 'all'))
  })
  filters.hidden = false
}
