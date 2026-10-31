import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon, type IconName } from '../lib/icons.ts'
import { container, external } from './ui.ts'

const host = new URL(site.url).hostname.replace(/^www\./, '')

const CHANNELS: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'globe', label: 'Website', value: host, href: '#top' },
  { icon: 'instagram', label: 'Instagram', value: site.instagramHandle, href: site.links.instagram },
  { icon: 'facebook', label: 'Facebook', value: site.legalName, href: site.links.facebook },
  { icon: 'discord', label: 'Discord', value: 'Chat TCG community', href: site.links.discord },
  { icon: 'phone', label: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: 'pin', label: 'Shop', value: `${site.address.street}, ${site.address.locality}` },
]

/**
 * Mirrors the impersonation warning the shop posted on Instagram (Sept 30, 2026).
 * TODO: have the owner approve this wording before launch.
 */
export function official(): string {
  return html`<section id="official" class="bg-ink py-24 text-paper sm:py-28 [--focus-ring:var(--color-volt)]">
    <div class="${container} grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div class="lg:col-span-7" data-reveal>
        <p class="eyebrow text-paper/60">Heads up</p>
        <h2 class="section-title mt-6">We don’t sell online</h2>
        <p class="mt-7 max-w-2xl text-lg leading-relaxed text-paper/75">
          Chat TCG is a walk-in shop. ${site.legalName} doesn’t own, run or endorse <strong class="text-paper">chattcg.shop</strong>, or
          any other website selling cards under our name, so please don’t send payments or personal details to one.
        </p>
        <p class="mt-4 max-w-2xl leading-relaxed text-paper/60">
          Not sure something’s really us? Call <a class="font-semibold text-paper underline underline-offset-4" href="${site.phoneHref}">${site.phone}</a>
          or DM <a class="font-semibold text-paper underline underline-offset-4" href="${site.links.instagram}" ${external}>${site.instagramHandle}</a>.
        </p>
      </div>
      <div class="notch bg-paper p-7 text-ink sm:p-9 lg:col-span-5 [--focus-ring:var(--color-ink)]" data-reveal>
        <h3 class="flex items-center gap-2.5 font-display text-3xl leading-none font-extrabold uppercase">
          ${icon('shield-check', 'size-6')} Our official channels
        </h3>
        <ul class="mt-6 border-t-2 border-ink">
          ${CHANNELS.map(
            (channel) => html`<li class="flex items-center gap-4 border-b border-ink/15 py-3.5">
              ${icon(channel.icon, 'size-[1.1rem] shrink-0 text-ink/60')}
              <span class="w-24 shrink-0 text-[0.68rem] font-semibold tracking-[0.2em] text-ink/50 uppercase">${channel.label}</span>
              ${channel.href
                ? html`<a class="min-w-0 flex-1 truncate font-semibold hover:underline" href="${channel.href}" ${channel.href.startsWith('http') && external}>${channel.value}</a>`
                : html`<span class="min-w-0 flex-1 truncate font-semibold">${channel.value}</span>`}
              ${icon('check', 'size-4 shrink-0 text-volt-700')}
            </li>`,
          )}
        </ul>
      </div>
    </div>
  </section>`
}
