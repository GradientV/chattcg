import { heroPosts } from '../data/posts.ts'
import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, logoMark, openStatus, photoCard, rating } from './ui.ts'

/**
 * The shop as a holographic trading card, front and center in the hand. Decorative (the same
 * details are in the page), so it's hidden from screen readers. ui/holo.ts tilts it toward the
 * pointer; text is sized in container units so it scales with the card.
 */
const holoCard = html`<div class="@container" aria-hidden="true">
  <div class="holo holo-card relative aspect-[5/7] rounded-[5cqw] bg-volt p-[3.5cqw] shadow-2xl shadow-black/70" data-holo>
    <div class="relative flex h-full flex-col overflow-hidden rounded-[3cqw] bg-ink-800 p-[4.5cqw] text-paper">
      <p class="font-display text-[11cqw] leading-none font-extrabold uppercase">Chat TCG</p>
      <div class="relative mt-[3cqw] grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5cqw] bg-ink-700 ring-1 ring-paper/15">
        ${logoMark('relative size-[42cqw] drop-shadow-[0_10px_20px_rgb(0_0_0/0.5)]')}
        <span class="holo-foil"></span>
      </div>
      <p class="mt-[3.5cqw] truncate bg-paper/10 px-[2.5cqw] py-[1.2cqw] text-[3.6cqw] font-semibold tracking-[0.2em] uppercase">Card shop · Queens, NY</p>
      <p class="mt-[3.5cqw] text-[4.6cqw] leading-snug text-paper/80">
        Buy, sell, trade and chat. Open play, weekly tournaments and a case full of singles.
      </p>
      <p class="mt-auto border-t border-paper/15 pt-[2.5cqw] text-[3.4cqw] tracking-[0.12em] text-paper/55 uppercase">${site.address.street}</p>
    </div>
    <span class="holo-glare"></span>
  </div>
</div>`

/** A hand of three: the shop's card in front, two of their Instagram photos fanned behind it. */
const hand = html`<div class="relative mx-auto aspect-[10/9] w-full max-w-2xl">
  <div class="absolute top-[14%] left-[6%] w-[38%] origin-bottom -rotate-[10deg] transition duration-500 hover:-translate-y-3">
    ${photoCard(heroPosts.left, { sizes: '(min-width: 1024px) 20vw, 40vw', priority: true })}
  </div>
  <div class="absolute top-[14%] right-[6%] w-[38%] origin-bottom rotate-[10deg] transition duration-500 hover:-translate-y-3">
    ${photoCard(heroPosts.right, { sizes: '(min-width: 1024px) 20vw, 40vw', priority: true })}
  </div>
  <div class="absolute top-0 left-1/2 z-10 w-[48%] -translate-x-1/2">${holoCard}</div>
</div>`

export function hero(): string {
  return html`<section id="top" class="relative overflow-hidden bg-ink text-paper [--focus-ring:var(--color-volt)]">
    <div class="${container} grid items-center gap-16 pt-36 pb-20 sm:pt-44 lg:grid-cols-12 lg:gap-10 lg:pt-48 lg:pb-28">
      <div class="lg:col-span-6">
        <p class="eyebrow text-paper/70">Middle Village, Queens</p>
        <h1 class="mt-7 font-display font-extrabold uppercase">
          <span class="block text-[2rem] leading-none tracking-[0.04em] sm:text-[2.6rem]">Middle Village’s card shop</span>
          <span class="mt-3 block text-[4.6rem] leading-[0.84] sm:text-[7rem] lg:text-[6rem] xl:text-[7.25rem]">
            Has entered<br />the chat<span class="motion-safe:animate-blink" aria-hidden="true">_</span>
          </span>
        </h1>
        <p class="mt-8 max-w-lg text-lg leading-relaxed text-paper/70">
          Pokémon, One Piece, Magic, Riftbound and more on 69th Street. Packs and boxes, a case full of singles and graded
          slabs, tournaments every week, and plenty of tables to play at.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a class="btn btn-volt" href="#events">This week’s events</a>
          <a class="btn btn-ghost" href="${site.links.directions}" ${external}>Get directions ${icon('arrow-up-right', 'size-4')}</a>
        </div>
        <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/15 pt-6">
          ${openStatus('text-paper/80')} ${rating('text-paper/60 hover:text-paper')}
        </div>
      </div>
      <div class="lg:col-span-6">${hand}</div>
    </div>
  </section>`
}
