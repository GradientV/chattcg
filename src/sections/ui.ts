import type { Post } from '../data/posts.ts'
import { hours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, WEEK_ORDER } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img } from '../lib/photo.ts'

export const container = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

/** Attributes for links that leave the site. */
export const external = 'target="_blank" rel="noopener"'

/** "$5", "$12.50". */
export function price(dollars: number): string {
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`
}

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

/** "Oct 30" from "2026-10-30". */
export function formatDate(iso: string): string {
  return shortDate.format(new Date(iso))
}

/**
 * The speech-bubble mark from Chat TCG's logo: a card inside a chat bubble on a volt disc.
 * Stand-in until we have the original logo files; also used for the favicon.
 */
export function logoMark(className: string): string {
  return html`<svg class="${className}" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="#b7df2f" />
    <rect x="8" y="7.5" width="24" height="19.5" rx="5" fill="#fff" />
    <path d="M12.5 25h7l-7.3 6.3a.5.5 0 0 1-.83-.37Z" fill="#fff" />
    <g transform="rotate(9 20 17.25)">
      <rect x="15.25" y="10.75" width="9.5" height="13" rx="1.7" fill="#0b0b0c" />
      <rect x="16.65" y="12.15" width="6.7" height="5.4" rx=".8" fill="#b7df2f" />
      <rect x="16.65" y="19" width="6.7" height="1" rx=".5" fill="#fff" />
      <rect x="16.65" y="20.9" width="4.2" height="1" rx=".5" fill="#fff" />
    </g>
  </svg>`
}

export function wordmark(large = false): string {
  return html`<a href="#top" class="inline-flex items-center gap-3" aria-label="${site.name}, back to top">
    ${logoMark(large ? 'size-14' : 'size-10')}
    <span class="leading-none">
      <span class="block font-display font-extrabold tracking-[0.06em] uppercase ${large ? 'text-[2.6rem]' : 'text-[1.75rem]'}">Chat TCG</span>
      <span class="mt-1 block font-semibold tracking-[0.34em] text-current/55 uppercase ${large ? 'text-[0.7rem]' : 'text-[0.55rem]'}">Card shop · Queens</span>
    </span>
  </a>`
}

/**
 * Round badge with the shop's name running around the logo, after the one on The Smith's site.
 * `id` keeps each badge's text path unique on the page; `className` sets its position and size.
 */
export function badge(id: string, className: string): string {
  return html`<div class="grid place-items-center ${className}" aria-hidden="true">
    <svg viewBox="0 0 120 120" class="absolute inset-0 size-full motion-safe:animate-[spin_40s_linear_infinite]">
      <defs><path id="${id}" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs>
      <circle cx="60" cy="60" r="58.5" fill="none" stroke="currentColor" stroke-width="1.2" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.5" />
      <text class="fill-current text-[9.5px] font-semibold tracking-[0.2em] uppercase">
        <textPath href="#${id}" textLength="282">Chat TCG ✦ Card shop ✦ Est. 2025 ✦ Queens ✦</textPath>
      </text>
    </svg>
    ${logoMark('relative size-[46%]')}
  </div>`
}

/** Shown until ui/open-status.ts swaps in the live "Open now · until 7:30 PM" label. */
const statusFallback = WEEK_ORDER.every((day) => hours[day]) ? 'Open 7 days a week' : `Closed ${WEEK_ORDER.filter((day) => !hours[day]).map((day) => `${DAY_NAMES[day]}s`).join(' & ')}`

/** Live open/closed line; ui/open-status.ts keeps it current in New York time. */
export function openStatus(className = ''): string {
  return html`<p class="group/status inline-flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.2em] uppercase ${className}" data-open-status>
    <span class="size-2 shrink-0 rounded-full bg-current/40 group-data-[state=closing]/status:bg-volt group-data-[state=open]/status:bg-volt"></span>
    <span data-open-status-label>${statusFallback}</span>
  </p>`
}

/** "4.4 ★★★★★ 41 Google reviews", linking to the Google listing. */
export function rating(className = ''): string {
  return html`<a class="inline-flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.2em] uppercase transition ${className}" href="${site.links.google}" ${external}>
    <span class="font-display text-xl leading-none tracking-normal">${site.rating.score}</span>
    <span class="inline-flex gap-0.5" aria-hidden="true">${[1, 2, 3, 4, 5].map(() => icon('star', 'size-3'))}</span>
    <span>${site.rating.count} Google reviews</span>
  </a>`
}

export function socialLink(href: string, iconName: 'instagram' | 'facebook' | 'discord', label: string, className = ''): string {
  return html`<a class="grid size-10 place-items-center transition ${className}" href="${href}" ${external} aria-label="${label}">
    ${icon(iconName, 'size-5')}
  </a>`
}

export interface PhotoCardOptions {
  /** The `sizes` attribute for the photo. */
  sizes: string
  /** Set number printed on the card, e.g. "02/05". */
  number?: string
  priority?: boolean
}

/**
 * One of the shop's Instagram photos as a trading card: white border, photo window and a name bar.
 * It tilts toward the pointer and catches the foil (ui/holo.ts), and links to the post.
 * Text is sized in container units so the card reads the same at any width.
 */
export function photoCard(post: Post, options: PhotoCardOptions): string {
  return html`<a class="@container block outline-offset-4" href="${post.url}" ${external} aria-label="${esc(post.title)}, on Instagram">
    <div class="holo relative rounded-[4.5cqw] bg-paper p-[3.5cqw] text-ink shadow-2xl shadow-black/40" data-holo>
      <div class="relative overflow-hidden rounded-[2.5cqw] bg-ink-800">
        ${img(post.photo, {
          width: 640,
          height: 800,
          sizes: options.sizes,
          class: 'aspect-[4/5] w-full object-cover',
          priority: options.priority,
        })}
        <span class="holo-foil"></span>
      </div>
      <div class="flex items-end justify-between gap-[3cqw] px-[1.5cqw] pt-[4cqw] pb-[1.5cqw]">
        <p class="font-display text-[8cqw] leading-[0.95] font-extrabold uppercase">${esc(post.title)}</p>
        <p class="shrink-0 text-right text-[3.6cqw] leading-tight font-semibold tracking-[0.18em] text-ink/50 uppercase">
          <time datetime="${post.date}">${formatDate(post.date)}</time>${options.number && html`<br />${options.number}`}
        </p>
      </div>
      <span class="holo-glare"></span>
    </div>
  </a>`
}
