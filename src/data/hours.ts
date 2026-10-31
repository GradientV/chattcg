import type { WeeklyHours } from '../lib/hours.ts'

const at = (hour: number, minute = 0) => hour * 60 + minute

/** Weekly hours from Google Maps, Oct 30, 2026. Sunday first; `null` = closed. */
export const hours: WeeklyHours = [
  { opens: at(10), closes: at(19, 30) }, // Sunday
  { opens: at(10, 30), closes: at(19, 30) }, // Monday
  { opens: at(10, 30), closes: at(19, 30) }, // Tuesday
  { opens: at(10, 30), closes: at(19, 30) }, // Wednesday
  { opens: at(10, 30), closes: at(19, 30) }, // Thursday
  { opens: at(10, 30), closes: at(19, 30) }, // Friday
  { opens: at(10), closes: at(20) }, // Saturday
]
