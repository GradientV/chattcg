/**
 * Tilts `[data-holo]` cards toward the pointer and slides their foil and glare with it.
 * Without JavaScript, or with reduced motion, the card keeps its resting angle.
 */
export function initHolo(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document.querySelectorAll<HTMLElement>('[data-holo]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)
      card.toggleAttribute('data-active', true)
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      card.style.setProperty('--rx', `${((0.5 - y) * 20).toFixed(2)}deg`)
      card.style.setProperty('--ry', `${((x - 0.5) * 26).toFixed(2)}deg`)
    })
    card.addEventListener('pointerleave', () => {
      card.removeAttribute('data-active')
      for (const name of ['--mx', '--my', '--rx', '--ry']) card.style.removeProperty(name)
    })
  })
}
