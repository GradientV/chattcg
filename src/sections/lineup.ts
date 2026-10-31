import { events } from '../data/events.ts'
import { games, type Game } from '../data/games.ts'
import { site } from '../data/site.ts'
import { playDays } from '../lib/events.ts'
import { esc, html } from '../lib/html.ts'
import { external } from './ui.ts'

/** One notched black tile per game, like the location strip on The Smith's site. */
function tile(game: Game, index: number): string {
  const days = playDays(events.filter((event) => event.game === game.id))
  const link = days
    ? html`<a class="link-caps text-[0.68rem]" href="#events" data-filter-link="${game.id}">See events</a>`
    : html`<a class="link-caps text-[0.68rem]" href="${site.links.instagramDm}" ${external}>Ask about stock</a>`
  return html`<li class="w-[58vw] shrink-0 snap-start sm:w-[30vw] lg:w-auto">
    <div class="notch flex h-full flex-col items-center bg-ink px-4 pt-6 pb-7 text-center text-paper [--focus-ring:var(--color-volt)]">
      <p class="text-[0.6rem] font-semibold tracking-[0.3em] text-paper/40 uppercase">No. ${String(index + 1).padStart(2, '0')}</p>
      <h3 class="mt-2 font-display text-[2rem] leading-none font-extrabold uppercase">${esc(game.short)}</h3>
      <p class="mt-2 mb-5 text-[0.68rem] font-semibold tracking-[0.2em] text-paper/55 uppercase">${days ? `Events ${days}` : 'Sealed product'}</p>
      <div class="mt-auto">${link}</div>
    </div>
  </li>`
}

export function lineup(): string {
  return html`<section aria-labelledby="lineup-title" class="bg-paper py-2">
    <h2 id="lineup-title" class="sr-only">Games we carry and play</h2>
    <ul class="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
      ${games.map(tile)}
    </ul>
  </section>`
}
