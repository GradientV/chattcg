import '@fontsource-variable/big-shoulders-display'
import '@fontsource-variable/archivo'
import './styles.css'
import { initEvents } from './ui/events.ts'
import { initHeader } from './ui/header.ts'
import { initHolo } from './ui/holo.ts'
import { initOpenStatus } from './ui/open-status.ts'
import { initReveal } from './ui/reveal.ts'

initHeader()
initEvents()
initOpenStatus()
initHolo()
initReveal()

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
