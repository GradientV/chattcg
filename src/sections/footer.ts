import { hours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { summarizeWeek } from '../lib/hours.ts'
import { html } from '../lib/html.ts'
import { container, external, socialLink, wordmark } from './ui.ts'

const heading = 'text-[0.68rem] font-semibold tracking-[0.3em] text-paper/45 uppercase'
const link = 'transition hover:text-paper'

const BOTTOM_LINKS = [
  { href: '#events', label: 'Events' },
  { href: '#trade', label: 'Buy & sell' },
  { href: '#official', label: 'Official channels' },
  { href: '#visit', label: 'Visit' },
]

export function footer(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<footer class="bg-ink text-paper [--focus-ring:var(--color-volt)]">
    <div class="${container} py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          ${wordmark(true)}
          <div class="mt-5 flex items-center gap-1">
            <span class="mr-2 text-[0.68rem] font-semibold tracking-[0.3em] text-paper/45 uppercase">Follow us</span>
            ${socialLink(site.links.instagram, 'instagram', 'Chat TCG on Instagram', 'text-paper/80 hover:text-volt')}
            ${socialLink(site.links.facebook, 'facebook', 'Chat TCG on Facebook', 'text-paper/80 hover:text-volt')}
            ${socialLink(site.links.discord, 'discord', 'Chat TCG on Discord', 'text-paper/80 hover:text-volt')}
          </div>
        </div>
        <div class="grid gap-10 text-paper/70 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h2 class="${heading}">Visit</h2>
            <address class="mt-4 leading-relaxed not-italic">
              <a class="${link}" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a>
            </address>
            <a class="${link} mt-3 inline-block" href="${site.phoneHref}">${site.phone}</a>
          </div>
          <div>
            <h2 class="${heading}">Hours</h2>
            <dl class="mt-4 space-y-2">
              ${summarizeWeek(hours).map(
                (row) => html`<div><dt class="font-display text-lg leading-tight font-bold text-paper uppercase">${row.days}</dt><dd class="text-sm">${row.hours}</dd></div>`,
              )}
            </dl>
          </div>
          <div>
            <h2 class="${heading}">Explore</h2>
            <ul role="list" class="mt-4 space-y-2.5">
              <li><a class="${link}" href="#latest">New arrivals</a></li>
              <li><a class="${link}" href="#shelves">What we carry</a></li>
              <li><a class="${link}" href="#community">Play &amp; hang out</a></li>
              <li><a class="${link}" href="${site.links.google}" ${external}>Reviews on Google</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-paper text-ink [--focus-ring:var(--color-ink)]">
      <div class="${container} flex flex-col gap-4 py-5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase lg:flex-row lg:items-center lg:justify-between">
        <ul class="flex flex-wrap items-center gap-y-2">
          ${BOTTOM_LINKS.map(
            (item) => html`<li class="border-volt-700 px-4 first:pl-0 [&+li]:border-l-2"><a class="transition hover:text-volt-700" href="${item.href}">${item.label}</a></li>`,
          )}
        </ul>
        <p class="text-ink/60">
          © <span data-year>${new Date().getFullYear()}</span> ${site.legalName} · Walk-in only · Website by
          <a class="text-ink underline underline-offset-4 hover:text-volt-700" href="https://gradientv.com" ${external}>GradientV</a>
        </p>
      </div>
      <p class="${container} pb-5 text-[0.7rem] leading-relaxed text-ink/45">
        Pokémon, Magic: The Gathering, One Piece, Riftbound, Yu-Gi-Oh!, Gundam, Dragon Ball and other game names are trademarks of
        their respective owners. Chat TCG is an independent shop and isn’t affiliated with them.
      </p>
    </div>
  </footer>`
}
