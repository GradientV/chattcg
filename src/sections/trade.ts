import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { container, external } from './ui.ts'

/** TODO: confirm with the owner what they buy and how they pay out (cash, trade credit or both). */
export function trade(): string {
  return html`<section id="trade" class="bg-ink py-24 text-paper sm:py-32 [--focus-ring:var(--color-volt)]">
    <div class="${container} text-center" data-reveal>
      <p class="eyebrow justify-center text-paper/60">Buy · Sell · Trade</p>
      <h2 class="mt-7 font-display text-[4.5rem] leading-[0.82] font-extrabold uppercase sm:text-[8rem] lg:text-[10rem]">
        Got cards?<br />Let’s chat.
      </h2>
      <p class="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
        We buy cards and take trade-ins, so the binder in your closet can turn into your next chase card. Bring singles,
        slabs, sealed product or the whole collection to the counter any time we’re open.
      </p>
      <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-paper/70">
        We’ll go through condition and value with you, and you can walk out with an offer or put your cards toward something
        from the case. Bringing in a big collection? Call ahead so we can set aside time.
      </p>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        <a class="link-caps" href="${site.phoneHref}">Call ${site.phone}</a>
        <a class="link-caps" href="${site.links.instagramDm}" ${external}>DM us on Instagram</a>
      </div>
    </div>
  </section>`
}
