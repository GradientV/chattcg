import { community } from './community.ts'
import { eventsSection } from './events.ts'
import { feed } from './feed.ts'
import { footer } from './footer.ts'
import { head } from './head.ts'
import { header } from './header.ts'
import { hero } from './hero.ts'
import { lineup } from './lineup.ts'
import { official } from './official.ts'
import { shelves } from './shelves.ts'
import { trade } from './trade.ts'
import { visit } from './visit.ts'

const SECTIONS: Record<string, () => string> = {
  head,
  header,
  hero,
  lineup,
  events: eventsSection,
  feed,
  shelves,
  trade,
  community,
  official,
  visit,
  footer,
}

const MARKER = /<!--\s*@section\s+([\w-]+)\s*-->/g

/** Replaces every `<!-- @section name -->` in index.html with that section's markup. */
export function renderSections(html: string): string {
  return html.replace(MARKER, (_marker, name: string) => {
    const render = SECTIONS[name]
    if (!render) throw new Error(`index.html references an unknown section: "${name}"`)
    return render()
  })
}
