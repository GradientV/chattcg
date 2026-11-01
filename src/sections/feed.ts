import { posts } from '../data/posts.ts'
import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, logoMark, photoCard } from './ui.ts'

/** The last tile: a card back that links to the rest of the feed. */
const cardBack = html`<a class="@container block outline-offset-4" href="${site.links.instagram}" ${external} aria-label="See more on Instagram, ${site.instagramHandle}">
  <div class="holo relative flex aspect-[63/88] flex-col items-center justify-center rounded-[4.5cqw] bg-volt p-[3.5cqw] text-ink shadow-2xl shadow-black/40" data-holo>
    <div class="flex size-full flex-col items-center justify-center gap-[5cqw] rounded-[2.5cqw] bg-ink text-center text-paper ring-[1.5cqw] ring-ink ring-inset">
      ${logoMark('size-[34cqw]')}
      <p class="font-display text-[9cqw] leading-[0.95] font-extrabold uppercase">More on<br />Instagram</p>
      <p class="text-[4cqw] font-semibold tracking-[0.18em] text-paper/60 uppercase">${site.instagramHandle}</p>
    </div>
    <span class="holo-glare"></span>
  </div>
</a>`

export function feed(): string {
  return html`<section id="latest" class="bg-ink py-24 text-paper sm:py-32 [--focus-ring:var(--color-volt)]">
    <div class="${container}">
      <div class="flex flex-wrap items-end justify-between gap-8" data-reveal>
        <div>
          <p class="eyebrow text-paper/60">New arrivals &amp; big pulls</p>
          <h2 class="section-title mt-6">Fresh from<br />the counter</h2>
        </div>
        <a class="link-caps" href="${site.links.instagram}" ${external}>Follow ${site.instagramHandle} ${icon('arrow-up-right', 'size-4')}</a>
      </div>
      <ul class="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14" data-reveal>
        ${posts.map((post) => html`<li>${photoCard(post, { sizes: '(min-width: 1024px) 28vw, 45vw' })}</li>`)}
        <li>${cardBack}</li>
      </ul>
    </div>
  </section>`
}
