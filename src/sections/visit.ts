import { hours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, formatHours, WEEK_ORDER } from '../lib/hours.ts'
import { html } from '../lib/html.ts'
import { container, external, openStatus } from './ui.ts'

function detail(label: string, content: string): string {
  return html`<div class="grid grid-cols-1 gap-1.5 border-b border-ink/15 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4">
    <dt class="text-[0.68rem] font-semibold tracking-[0.22em] text-ink/50 uppercase sm:pt-1">${label}</dt>
    <dd class="text-lg leading-snug">${content}</dd>
  </div>`
}

const hoursTable = html`<table class="mt-4 w-full">
  <caption class="sr-only">Opening hours</caption>
  <tbody>
    ${WEEK_ORDER.map(
      (day) => html`<tr class="group border-b border-ink/15 data-today:bg-ink data-today:text-paper" data-hours-day="${day}">
        <th scope="row" class="py-3 pl-3 text-left font-display text-xl font-bold uppercase">
          ${DAY_NAMES[day]}
          <span class="ml-2 hidden align-middle font-sans text-[0.6rem] font-semibold tracking-[0.25em] text-volt group-data-today:inline">Today</span>
        </th>
        <td class="py-3 pr-3 text-right tabular-nums">${formatHours(hours[day])}</td>
      </tr>`,
    )}
  </tbody>
</table>`

export function visit(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<section id="visit" class="bg-paper py-24 sm:py-32">
    <div class="${container} grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-6 xl:col-span-5" data-reveal>
        <p class="eyebrow text-ink/60">Visit</p>
        <h2 class="section-title mt-6">Come say hi on 69th Street</h2>
        <dl class="mt-10 border-t-2 border-ink">
          ${detail('Address', html`<a class="hover:underline" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a>`)}
          ${detail('Getting here', site.transit)}
          ${detail('Phone', html`<a class="hover:underline" href="${site.phoneHref}">${site.phone}</a>`)}
          ${detail('Email', html`<a class="break-all hover:underline" href="mailto:${site.email}">${site.email}</a>`)}
        </dl>
        <div class="mt-9 flex flex-wrap gap-3">
          <a class="btn btn-dark" href="${site.links.directions}" ${external}>Get directions</a>
          <a class="btn btn-outline" href="${site.phoneHref}">Call the shop</a>
        </div>
        <div class="mt-14">
          <div class="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
            <h3 class="font-display text-4xl leading-none font-extrabold uppercase">Hours</h3>
            ${openStatus('text-ink/70')}
          </div>
          ${hoursTable}
        </div>
      </div>
      <div class="lg:col-span-6 xl:col-span-7" data-reveal>
        <div class="relative aspect-[4/5] w-full bg-mist sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-[26rem]">
          <iframe
            class="absolute inset-0 size-full grayscale-[0.4]"
            src="${site.links.mapEmbed}"
            title="Map of Chat TCG at ${street}, ${locality}, ${region}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>`
}
