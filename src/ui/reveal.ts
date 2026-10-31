/**
 * Fades `[data-reveal]` elements up as they scroll into view. The hidden starting state only
 * applies under `html.js` (set inline in index.html), so nothing stays hidden if scripts fail.
 */
export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
  const reveal = (element: Element) => element.setAttribute('data-revealed', '')

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(reveal)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target)
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  elements.forEach((element) => observer.observe(element))
}
