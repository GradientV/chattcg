import { events, openPlay } from '../data/events.ts'
import { games } from '../data/games.ts'
import { site } from '../data/site.ts'
import { eventsOn } from '../lib/events.ts'
import { DAY_NAMES, formatTime, toIsoTime, WEEK_ORDER, type Weekday } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'
import { container, external, price } from './ui.ts'

/** Games with at least one event, in shelf order, for the filter. */
const playedGames = games.filter((game) => events.some((event) => event.game === game.id))

const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

const filterButton = 'cursor-pointer px-3 py-2 text-[0.72rem] font-semibold tracking-[0.2em] text-ink/45 uppercase decoration-volt decoration-[3px] underline-offset-[9px] transition hover:text-ink aria-pressed:text-ink aria-pressed:underline'

const filters = html`<div class="mt-12 flex flex-wrap justify-center gap-x-2 gap-y-1" role="group" aria-label="Show events for" data-event-filters hidden>
  <button type="button" class="${filterButton}" aria-pressed="true" data-filter="all">All games</button>
  ${playedGames.map(
    (game) => html`<button type="button" class="${filterButton}" aria-pressed="false" data-filter="${game.id}">${esc(game.short)}</button>`,
  )}
</div>`

function eventRow(time: string, name: string, game: string, details: string[]): string {
  return html`<li class="border-t border-current/15 pt-3 first:border-0 first:pt-0" data-game="${game}">
    <p class="font-display text-xl leading-none font-bold uppercase">${time}</p>
    <p class="mt-1.5 leading-snug font-semibold">${esc(name)}</p>
    ${details.length > 0 && html`<p class="mt-0.5 text-sm text-current/60">${esc(details.join(' · '))}</p>`}
  </li>`
}

function dayCard(day: Weekday): string {
  const open = openPlay.days.includes(day)
  return html`<article
    class="group/day flex flex-col border-r border-b border-ink/15 bg-paper p-5 transition max-sm:order-(--order) data-empty:text-ink/35 data-today:bg-ink data-today:text-paper"
    data-event-day="${day}"
  >
    <p class="invisible text-[0.62rem] font-semibold tracking-[0.3em] text-volt uppercase group-data-today/day:visible">Today</p>
    <h3 class="mt-1 font-display text-3xl leading-none font-extrabold uppercase">${DAY_NAMES[day]}</h3>
    <ul class="mt-5 space-y-3">
      ${open && eventRow('All day', 'Open play', 'open', [])}
      ${eventsOn(events, day).map((event) =>
        eventRow(
          html`<time datetime="${toIsoTime(event.starts)}">${formatTime(event.starts)}</time>`,
          event.name,
          event.game,
          [event.fee !== undefined ? `${price(event.fee)} entry` : '', event.note ?? ''].filter(Boolean),
        ),
      )}
    </ul>
    <p class="mt-4 text-sm" data-empty-message hidden></p>
  </article>`
}

export function eventsSection(): string {
  return html`<section id="events" class="bg-paper py-24 sm:py-32">
    <div class="${container}">
      <div class="mx-auto max-w-3xl text-center" data-reveal>
        <p class="eyebrow justify-center text-ink/60">Weekly events</p>
        <h2 class="section-title mt-6">Something on the table almost every day</h2>
        <p class="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
          Tournaments for ${COUNT_WORDS[playedGames.length] ?? playedGames.length} games through the week, plus open play
          every weekday (${openPlay.note.toLowerCase()}). Times can change, so check
          <a class="font-semibold underline underline-offset-4 hover:decoration-volt" href="${site.links.instagram}" ${external}>Instagram</a> or
          <a class="font-semibold underline underline-offset-4 hover:decoration-volt" href="${site.links.discord}" ${external}>Discord</a> before you head over.
        </p>
        <p class="mt-7 text-[0.72rem] font-semibold tracking-[0.2em] uppercase" data-next-event hidden>
          <span class="text-ink/45">Next up:</span> <span data-next-event-label></span>
        </p>
      </div>
      ${filters}
      <div class="mt-8 grid border-t border-l border-ink/15 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7" data-reveal>
        ${WEEK_ORDER.map(dayCard)}
      </div>
    </div>
  </section>`
}
