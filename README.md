# Chat TCG — official website

Website for [Chat TCG](https://www.instagram.com/chattcg_nyc/), a trading card game shop at 66-73 69th St, Middle Village, Queens. Built and maintained by [GradientV](https://gradientv.com).

## Stack

- **Vite 6 + TypeScript + Tailwind CSS v4**, no UI framework (same setup as The Alcove).
- Every section is rendered to static HTML at build time: a small plugin in `vite.config.ts` swaps each `<!-- @section name -->` marker in `index.html` for the markup from `src/sections/`. The event schedule, hours and copy are in the page source, so search engines can read them without running JavaScript.
- The browser runs about 3 KB (gzipped) of TypeScript, in `src/ui/`: the mobile menu, the live "Open now" status and today's column in the event schedule (both in New York time), the game filter, the holo card tilt and scroll reveals.
- Fonts (Big Shoulders Display for headlines, Archivo for everything else) are self-hosted through Fontsource.

## Design

Styled after [The Smith](https://thesmithrestaurant.com/): black and white with the volt (lime) from the Chat TCG logo as the only accent, tall condensed uppercase headlines, square buttons and underlined caps links, a split nav with the logo in the middle and a hanging "Directions" tab, notched black tiles for the games, and a round badge in the hero and footer. No gradients or pill-shaped chips.

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

## Before launch

- [ ] **Domain.** `chattcg.shop` is the impersonator site, and `chattcg.com` belongs to an unrelated competitive TCG team (ChatTCG's Arena on Metafy). `chattcgnyc.com` (matches the Instagram handle) and `chattcg.nyc` were both unregistered on Oct 30, 2026. Register the domain in the client's name, then update `site.url`, `public/robots.txt` and `public/sitemap.xml`.
- [ ] **Walk-in notice.** The header strip and the "We don't sell online" section name chattcg.shop, mirroring the shop's own Instagram warning. Get the owner to approve the wording.
- [ ] **Photos.** All eight photos come from the shop's Instagram (Oct 2026). Get the owner's OK to use them, especially the customer-pull photo, which shows a customer's face. Ask for a few wide shots of the counter and play tables too: Instagram only gave us product close-ups.
- [ ] **Logo.** The speech-bubble mark is a stand-in recreation of their Instagram avatar. Use their official logo once we have the file, and update `public/favicon.svg` and the OG image.
- [ ] **Badge.** The round badge says "Est. 2025", based on their grand-opening post (December 2025). Confirm.
- [ ] **Events.** The schedule comes from their Instagram poster (Oct 4, 2026). Confirm entry fees and formats for each event; we only know Friday Night Magic ($10, from the Wizards locator) and the Saturday Pokémon event ($5, 1 prize pack per win). The poster lists casual play at 10:30 PM, which we read as a typo for the 10:30 AM opening time.
- [ ] **Phone.** Google, Facebook and the Wizards locator list (718) 690-1508; The Card Shop Finder lists 646-393-7441. Confirm, then claim that directory listing and fix it.
- [ ] **Email.** `chattcg2025@gmail.com` is from their Facebook page. Confirm it's the inbox they want on the site.
- [ ] **Discord.** Confirm the invite from their Instagram bio (`discord.gg/e8xhW7Rm6Z`) never expires.
- [ ] **Buy, sell & trade.** Confirm what they buy (singles, sealed, slabs, collections) and how they pay out (cash, trade credit or both).
- [ ] **Reviews.** Get the owner's OK to quote the three Google reviews in the community section.
- [ ] **Profiles.** Add the new domain to the Google Business Profile (it has no website today), the Instagram bio (which currently says they have no website) and the Facebook page.
- [ ] **Impersonator.** Help the owner report chattcg.shop to Shopify (host) and Namecheap (registrar), and to Google Safe Browsing. The evidence is in `Context/research-notes.md`.
- [ ] Optional: turn on Vercel Web Analytics.
