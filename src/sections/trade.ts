import { site } from '../data/site.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external } from './ui.ts'

/** TODO: confirm with the owner what they buy and how they pay out (cash, trade credit or both). */
const STEPS = [
  {
    title: 'Bring them in',
    text: 'Singles, slabs, sealed product or a whole binder. Got a big collection? Call ahead so we can set aside time.',
  },
  {
    title: 'Talk it through',
    text: 'We go through your cards with you at the counter: condition, value, all of it. It’s a chat, not a lecture.',
  },
  {
    title: 'Sell or trade',
    text: 'Walk out with an offer, or put your cards toward something new from the case.',
  },
]

export function trade(): string {
  return html`<section id="trade" class="bg-ink py-24 text-paper sm:py-32 [--focus-ring:var(--color-volt)]">
    <div class="${container}">
      <div class="text-center" data-reveal>
        <p class="eyebrow justify-center text-paper/60">Buy · Sell · Trade</p>
        <h2 class="mt-7 font-display text-[4.5rem] leading-[0.82] font-extrabold uppercase sm:text-[8rem] lg:text-[10rem]">
          Got cards?<br /><span class="text-volt">Let’s chat.</span>
        </h2>
        <p class="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
          We buy cards and take trade-ins, so the binder in your closet can turn into your next chase card. Bring them by the
          counter any time we’re open.
        </p>
        <div class="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          <a class="link-caps" href="${site.phoneHref}">${icon('phone', 'size-4')} Call ${site.phone}</a>
          <a class="link-caps" href="${site.links.instagramDm}" ${external}>${icon('instagram', 'size-4')} DM us on Instagram</a>
        </div>
      </div>
      <ol class="mt-20 grid border-t border-paper/20 md:grid-cols-3" data-reveal>
        ${STEPS.map(
          (step, i) => html`<li class="border-b border-paper/20 py-8 md:border-b-0 md:px-8 md:first:pl-0 md:[&+li]:border-l md:last:pr-0">
            <span class="font-display text-6xl leading-none font-extrabold text-volt">0${i + 1}</span>
            <h3 class="mt-4 font-display text-3xl leading-none font-extrabold uppercase">${esc(step.title)}</h3>
            <p class="mt-3 leading-relaxed text-paper/65">${esc(step.text)}</p>
          </li>`,
        )}
      </ol>
    </div>
  </section>`
}
