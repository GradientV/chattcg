import { site } from '../data/site.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, wordmark } from './ui.ts'

const LEFT_NAV = [
  { href: '#events', label: 'Events' },
  { href: '#shelves', label: 'What we carry' },
  { href: '#trade', label: 'Buy & sell' },
]

const RIGHT_NAV = [
  { href: '#latest', label: 'New arrivals' },
  { href: '#visit', label: 'Visit' },
]

const MOBILE_NAV = [...LEFT_NAV, ...RIGHT_NAV]

const navLink = 'text-[0.72rem] font-semibold tracking-[0.22em] whitespace-nowrap text-paper/75 uppercase transition hover:text-paper'

/**
 * Walk-in-only notice above the nav. It folds away once the page scrolls (see ui/header.ts), and
 * turns invisible once folded so keyboard users can't tab to a link they can't see.
 */
const notice = html`<div class="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 group-data-scrolled:grid-rows-[0fr] group-data-menu-open:grid-rows-[0fr]">
  <div class="overflow-hidden transition-[visibility] duration-300 group-data-scrolled:invisible group-data-menu-open:invisible">
    <a class="block bg-paper text-ink transition hover:bg-volt" href="#official">
      <span class="${container} flex items-center justify-center gap-2 py-2 text-center text-[0.65rem] font-semibold tracking-[0.18em] uppercase sm:text-[0.7rem]">
        <span>Walk-in only. We don’t sell online<span class="hidden sm:inline">, and chattcg.shop isn’t us</span>.</span>
        <span class="hidden underline underline-offset-4 sm:inline">Learn more</span>
      </span>
    </a>
  </div>
</div>`

export function header(): string {
  return html`<header
    class="group fixed inset-x-0 top-0 z-50 bg-ink text-paper transition-shadow duration-300 [--focus-ring:var(--color-volt)] data-scrolled:shadow-lg data-scrolled:shadow-black/40"
    data-header
  >
    ${notice}
    <div class="${container} grid h-16 grid-cols-[1fr_auto] items-center gap-6 lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
      <nav aria-label="Main" class="hidden lg:block">
        <ul class="flex items-center gap-6 xl:gap-8">
          ${LEFT_NAV.map((link) => html`<li><a class="${navLink}" href="${link.href}">${esc(link.label)}</a></li>`)}
        </ul>
      </nav>
      <div class="lg:justify-self-center">${wordmark()}</div>
      <div class="flex h-full items-center justify-end gap-6 xl:gap-8">
        <ul class="hidden items-center gap-6 lg:flex xl:gap-8">
          ${RIGHT_NAV.map((link) => html`<li><a class="${navLink}" href="${link.href}">${esc(link.label)}</a></li>`)}
        </ul>
        <a
          class="tab hidden h-[calc(100%+0.75rem)] items-start self-start bg-volt px-5 pt-[1.9rem] text-[0.72rem] font-bold tracking-[0.22em] text-ink uppercase transition hover:bg-paper lg:flex"
          href="${site.links.directions}"
          ${external}
        >
          Directions
        </a>
        <button
          type="button"
          class="group/toggle -mr-2 grid size-11 cursor-pointer place-items-center transition hover:text-volt lg:hidden"
          aria-controls="mobile-nav"
          aria-expanded="false"
          aria-label="Open menu"
          data-nav-toggle
        >
          ${icon('menu', 'size-6 group-aria-expanded/toggle:hidden')} ${icon('close', 'hidden size-6 group-aria-expanded/toggle:block')}
        </button>
      </div>
    </div>
    <div id="mobile-nav" class="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-paper/15 bg-ink lg:hidden" hidden>
      <nav aria-label="Mobile" class="${container} flex flex-col py-6">
        ${MOBILE_NAV.map(
          (link) => html`<a class="border-b border-paper/15 py-4 font-display text-[2.75rem] leading-none font-extrabold uppercase" href="${link.href}">${esc(link.label)}</a>`,
        )}
        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          <a class="btn btn-volt" href="${site.links.directions}" ${external}>Get directions</a>
          <a class="btn btn-ghost" href="${site.phoneHref}">Call ${site.phone}</a>
          <a class="btn btn-ghost sm:col-span-2" href="${site.links.discord}" ${external}>Join our Discord</a>
        </div>
        <p class="mt-8 text-sm tracking-[0.12em] text-paper/60 uppercase">${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}</p>
      </nav>
    </div>
  </header>`
}
