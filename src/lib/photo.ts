import { esc } from './html.ts'

export interface Photo {
  alt: string
  /** URL for the photo at (at least) `width` pixels wide. */
  url(width: number): string
  /** Widths `url` can serve, smallest first; more than one makes a responsive srcset worthwhile. */
  widths: readonly number[]
}

/**
 * A photo saved under /public/images in several widths, named `${name}-${width}.jpg`,
 * e.g. `shopPhoto('battle-decks', [640, 1080], '…')` for battle-decks-640.jpg and battle-decks-1080.jpg.
 */
export function shopPhoto(name: string, widths: readonly number[], alt: string): Photo {
  return {
    alt,
    widths,
    url: (width) => `/images/${name}-${widths.find((w) => w >= width) ?? widths[widths.length - 1]}.jpg`,
  }
}

export interface ImgOptions {
  /** Size of the default `src`; also reserves the image's space (and aspect ratio) before it loads. */
  width: number
  height: number
  /** The `sizes` attribute, e.g. `(min-width: 1024px) 33vw, 80vw`. */
  sizes: string
  class?: string
  /** Load right away at high priority. Use for images in the first screen only. */
  priority?: boolean
}

export function img(photo: Photo, options: ImgOptions): string {
  const { width, height, sizes, class: className = '', priority = false } = options
  const srcset = photo.widths.length > 1 ? photo.widths.map((w) => `${photo.url(w)} ${w}w`).join(', ') : ''
  const responsive = srcset ? ` srcset="${esc(srcset)}" sizes="${sizes}"` : ''
  const loading = priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'
  return `<img src="${esc(photo.url(width))}"${responsive} width="${width}" height="${height}" alt="${esc(photo.alt)}" class="${className}" ${loading}>`
}
