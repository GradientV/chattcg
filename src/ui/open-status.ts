import { hours } from '../data/hours.ts'
import { getOpenStatus, nowInNewYork } from '../lib/hours.ts'

/** Keeps the "Open now · until 11 PM" chips and today's row in the hours table current, in New York time. */
export function initOpenStatus(): void {
  const chips = document.querySelectorAll<HTMLElement>('[data-open-status]')
  const rows = document.querySelectorAll<HTMLElement>('[data-hours-day]')
  if (!chips.length && !rows.length) return

  const update = () => {
    const now = nowInNewYork()
    const status = getOpenStatus(hours, now)
    chips.forEach((chip) => {
      chip.dataset.state = status.state
      const label = chip.querySelector('[data-open-status-label]')
      if (label) label.textContent = status.label
    })
    rows.forEach((row) => row.toggleAttribute('data-today', Number(row.dataset.hoursDay) === now.day))
  }

  update()
  window.setInterval(update, 60_000)
}
