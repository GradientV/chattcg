/** What a template slot accepts: arrays are joined, and false/null/undefined render nothing. */
export type Html = string | number | false | null | undefined | readonly Html[]

function flatten(value: Html): string {
  if (Array.isArray(value)) return value.map(flatten).join('')
  return value === false || value == null ? '' : String(value)
}

/**
 * Tagged template for section markup, so sections can `map` over data and
 * write `cond && html\`…\`` without joining strings by hand.
 */
export function html(strings: TemplateStringsArray, ...values: Html[]): string {
  return strings.reduce((out, str, i) => out + flatten(values[i - 1]) + str)
}

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Escapes text from the data files before it goes into markup. */
export function esc(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ENTITIES[char])
}
