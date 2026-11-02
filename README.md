# Chat TCG — official website

Website for [Chat TCG](https://www.instagram.com/chattcg_nyc/), a trading card game shop at 66-73 69th St, Middle Village, Queens. Built and maintained by [GradientV](https://gradientv.com).

## Stack

- **Vite 6 + TypeScript + Tailwind CSS v4**, no UI framework.
- Every section is rendered to static HTML at build time: a small plugin in `vite.config.ts` swaps each `<!-- @section name -->` marker in `index.html` for the markup from `src/sections/`. The event schedule, hours and copy are in the page source, so search engines can read them without running JavaScript.
- The browser runs about 3 KB (gzipped) of TypeScript, in `src/ui/`: the mobile menu, the live "Open now" status and today's column in the event schedule (both in New York time), the game filter, the holo card tilt and scroll reveals.
- Fonts (Big Shoulders Display for headlines, Archivo for everything else) are self-hosted through Fontsource.

## Design

Styled after [The Smith](https://thesmithrestaurant.com/): black and white with the volt (lime) from the Chat TCG logo as the only accent, tall condensed uppercase headlines, square buttons and underlined caps links, a split nav with the logo in the middle and a hanging "Directions" tab, and notched black tiles for the games. No gradients or pill-shaped chips.

Kept off this site on purpose:

- Two-color headlines (a line or word picked out in volt). Every headline is one color.
- Icons in front of text: eyebrows, buttons, links and list rows are text only. Icon-only social links are fine.
- Colored dots and circles (status dots, round badges). The logo mark is the one exception.
- Numbered lists and steps, especially zero-padded numbers like 01 or 001/001.
- Labels that go stale, like "of the week" on a dated post.

The trading card theme comes from the holo cards: `photoCard()` in `src/sections/ui.ts` frames any photo as a card, and anything marked `data-holo` tilts toward the pointer and catches a rainbow foil (`.holo` in `src/styles.css`, `src/ui/holo.ts`). The hero's card for the shop itself uses `.holo-card`, which rests at an angle with the foil always showing. Both are self-contained, so they can be reused on other sites.

## Commands

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # type-checks, then builds to dist/
npm run preview   # serves dist/
```

Vite is pinned to v6 because it runs on Node 22.9. Vite 8 needs Node 20.19+ or 22.12+, so upgrade Node before bumping it.

## Updating content

| What | Where |
| --- | --- |
| Name, phone, email, address, links, Google rating | `src/data/site.ts` |
| Opening hours | `src/data/hours.ts` |
| Weekly events, fees and open play | `src/data/events.ts` |
| Games (tiles and filters) and the "What we carry" list | `src/data/games.ts` |
| "Fresh from the counter" posts and the two photo cards in the hero | `src/data/posts.ts` |
| Photos (files in `public/images`, two widths each) | `src/data/photos.ts` |
| Page copy and layout | `src/sections/*.ts` |
| Colors and fonts | `@theme` in `src/styles.css` |

`src/data/posts.ts` is the part that goes stale fastest: refresh it from the shop's Instagram whenever new product lands or someone pulls something big. Save each photo as `public/images/<name>-640.jpg` plus a full-size `<name>-1080.jpg`, add it to `photos.ts`, then list it in `posts.ts`. The "Events" line on each game tile is generated from `events.ts`, so a schedule change only needs editing in one place.

The link preview (`public/og-image.png`) is rendered from `scripts/og-image.html`; the command is at the top of that file.

## Deploying

Vercel picks up `vercel.json` (build command, output folder, caching and security headers). Push a branch to get a preview deployment, then merge to `main` to go live.
