import { events, openPlay } from '../data/events.ts'
import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { esc, html } from '../lib/html.ts'
import { container, external, photoCard, rating, socialLink } from './ui.ts'

/** Short quotes from Google reviews (Oct 2026). TODO: get the owner's OK to feature them. */
const REVIEWS = [
  { quote: 'I’m glad there’s finally a card shop in the area.', name: 'Anthony C.' },
  { quote: 'Big space and there were even tables to play games.', name: 'Cindy C.' },
  { quote: 'Great place to play and collect cards.', name: '' },
]

const FEATURES = [
  { title: 'Open play', text: `${openPlay.days.length === 5 ? 'Every weekday' : `${openPlay.days.length} days a week`}, with no time limit unless an event is on.` },
  { title: 'Tournaments', text: `${events.length} every week, from Friday Night Magic to Riftbound Nexus Nights.` },
  { title: 'Discord', text: 'Find a game, meet the regulars and keep the conversation going between visits.' },
]

const pull = {
  photo: photos.customerPull,
  // Not "of the week": the date on the card would make that claim go stale.
  title: 'Customer pull',
  date: '2026-10-18',
  url: 'https://www.instagram.com/chattcg_nyc/p/DepdS-bNCo4/',
}

export function community(): string {
  return html`<section id="community" class="overflow-hidden bg-paper py-24 sm:py-32">
    <div class="${container} grid gap-16 lg:grid-cols-12 lg:gap-12">
      <div class="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" data-reveal>
        <div class="-rotate-2 lg:sticky lg:top-32">${photoCard(pull, { sizes: '(min-width: 1024px) 36vw, 90vw' })}</div>
      </div>
      <div class="lg:col-span-7 lg:pl-8" data-reveal>
        <p class="eyebrow text-ink/60">Play &amp; hang out</p>
        <h2 class="section-title mt-6">Pull up a chair. Stay for a few rounds.</h2>
        <p class="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
          Chat TCG has a big room with plenty of tables. Bring a deck, find a game, trade with the regulars, or just come hang
          out and talk cards.
        </p>
        <dl class="mt-10 grid border-t-2 border-ink sm:grid-cols-3">
          ${FEATURES.map(
            (feature) => html`<div class="border-b border-ink/15 py-6 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:[&+div]:border-l">
              <dt class="font-display text-2xl leading-none font-extrabold uppercase">${feature.title}</dt>
              <dd class="mt-2 text-[0.95rem] leading-relaxed text-ink/65">${esc(feature.text)}</dd>
            </div>`,
          )}
        </dl>
        <div class="mt-10 flex flex-wrap items-center gap-3">
          <a class="btn btn-dark" href="${site.links.discord}" ${external}>Join our Discord</a>
          ${socialLink(site.links.instagram, 'instagram', 'Chat TCG on Instagram', 'hover:text-volt-700')}
          ${socialLink(site.links.facebook, 'facebook', 'Chat TCG on Facebook', 'hover:text-volt-700')}
        </div>
        <figure class="mt-14 border-t-2 border-ink pt-8">
          <figcaption class="flex flex-wrap items-center justify-between gap-4">
            <span class="text-[0.72rem] font-semibold tracking-[0.3em] text-ink/55 uppercase">What people say</span>
            ${rating('text-ink/60 hover:text-ink')}
          </figcaption>
          <ul class="mt-7 space-y-6">
            ${REVIEWS.map(
              (review) => html`<li>
                <blockquote class="font-display text-[1.9rem] leading-[1] font-bold uppercase sm:text-4xl">“${esc(review.quote)}”</blockquote>
                <p class="mt-2 text-[0.7rem] font-semibold tracking-[0.2em] text-ink/50 uppercase">${review.name && `${esc(review.name)} · `}Google review</p>
              </li>`,
            )}
          </ul>
        </figure>
      </div>
    </div>
  </section>`
}
