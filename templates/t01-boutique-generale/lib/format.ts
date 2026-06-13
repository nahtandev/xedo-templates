/** Format an integer amount as FCFA (e.g. "12 500 FCFA"). */
export function formatFcfa(value: number, locale = 'fr-FR'): string {
  return `${new Intl.NumberFormat(locale).format(value)} FCFA`;
}
