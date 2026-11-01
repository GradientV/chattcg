import { products } from '../data/games.ts'
import { site } from '../data/site.ts'
import { esc, html } from '../lib/html.ts'
import { container, external } from './ui.ts'

export function shelves(): string {
  return html`<section id="shelves" class="bg-paper py-24 sm:py-32">
    <div class="${container} grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5" data-reveal>
        <div class="lg:sticky lg:top-32">
          <p class="eyebrow text-ink/60">What we carry</p>
          <h2 class="section-title mt-6">Packs, singles, slabs &amp; sleeves</h2>
          <p class="mt-7 max-w-md text-lg leading-relaxed text-ink/65">
            Sealed product from the games people actually play, English and Japanese Pokémon, and a case full of singles and
            graded cards. Stock moves fast, so ask before you make the trip.
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a class="btn btn-dark" href="${site.links.instagramDm}" ${external}>Ask about a card</a>
            <a class="link-caps" href="#latest">See new arrivals</a>
          </div>
        </div>
      </div>
      <ul class="border-t-2 border-ink lg:col-span-7" data-reveal>
        ${products.map(
          (product) => html`<li class="border-b border-ink/15 py-8">
            <h3 class="font-display text-[2.1rem] leading-[0.95] font-extrabold uppercase sm:text-5xl">${esc(product.title)}</h3>
            <p class="mt-3 max-w-xl leading-relaxed text-ink/65">${esc(product.text)}</p>
          </li>`,
        )}
      </ul>
    </div>
  </section>`
}
