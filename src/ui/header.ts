/** Solid header once the page scrolls, plus the mobile menu (Escape and link clicks close it). */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  if (!header) return

  const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const toggle = header.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const panel = document.getElementById('mobile-nav')
  if (!toggle || !panel) return

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    panel.hidden = !open
    header.toggleAttribute('data-menu-open', open)
    document.documentElement.classList.toggle('overflow-hidden', open)
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()))
  panel.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      toggle.focus()
    }
  })
  // The panel only exists below the lg breakpoint; close it if the window grows past it.
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false)
  })
}
