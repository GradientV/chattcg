/** 0 = Sunday … 6 = Saturday, matching `Date#getDay()`. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface OpeningHours {
  /** Minutes after midnight, e.g. `14 * 60` for 2 PM. */
  opens: number
  /** Minutes after midnight. Values past `24 * 60` run into the next day. */
  closes: number
}

type Day = OpeningHours | null

/** One entry per weekday, Sunday first. `null` means closed all day. */
export type WeeklyHours = readonly [Day, Day, Day, Day, Day, Day, Day]

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

/** Monday-first order for printed hours. */
export const WEEK_ORDER: readonly Weekday[] = [1, 2, 3, 4, 5, 6, 0]

export const MINUTES_PER_DAY = 24 * 60
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** 870 → "2:30 PM", 1440 → "12 AM". */
export function formatTime(minutes: number): string {
  const time = minutes % MINUTES_PER_DAY
  const hour = Math.floor(time / 60)
  const minute = time % 60
  const suffix = hour < 12 ? 'AM' : 'PM'
  const clock = hour % 12 || 12
  return minute ? `${clock}:${String(minute).padStart(2, '0')} ${suffix}` : `${clock} ${suffix}`
}

export function formatHours(day: Day): string {
  return day ? `${formatTime(day.opens)} – ${formatTime(day.closes)}` : 'Closed'
}

/** 24-hour "HH:MM" for schema.org, e.g. 1440 → "00:00". */
export function toIsoTime(minutes: number): string {
  const time = minutes % MINUTES_PER_DAY
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`
}

/** Collapses consecutive days with the same hours: `{ days: 'Wed–Thu', hours: '2 PM – 11:30 PM' }`. */
export function summarizeWeek(week: WeeklyHours): { days: string; hours: string }[] {
  const groups: { days: Weekday[]; hours: string }[] = []
  for (const day of WEEK_ORDER) {
    const hours = formatHours(week[day])
    const last = groups.at(-1)
    if (last?.hours === hours) last.days.push(day)
    else groups.push({ days: [day], hours })
  }
  return groups.map(({ days, hours }) => {
    const first = SHORT_DAYS[days[0]]
    const last = SHORT_DAYS[days[days.length - 1]]
    return { days: first === last ? first : `${first}–${last}`, hours }
  })
}

export interface ZonedTime {
  day: Weekday
  /** Minutes after midnight. */
  minutes: number
}

/** The current weekday and time at the shop, whatever the visitor's own time zone. */
export function nowInNewYork(date = new Date()): ZonedTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  const day = SHORT_DAYS.indexOf(part('weekday'))
  return {
    day: (day === -1 ? date.getDay() : day) as Weekday,
    minutes: Number(part('hour')) * 60 + Number(part('minute')),
  }
}

export interface OpenStatus {
  state: 'open' | 'closing' | 'closed'
  label: string
}

/** "Open now · until 11 PM", "Closed · opens tomorrow at 2 PM", and so on. */
export function getOpenStatus(week: WeeklyHours, now: ZonedTime): OpenStatus {
  const today = week[now.day]
  const yesterday = week[((now.day + 6) % 7) as Weekday]

  // Still going from last night's after-midnight close, or open today.
  const lateNight = yesterday && yesterday.closes > MINUTES_PER_DAY && now.minutes < yesterday.closes - MINUTES_PER_DAY
  const closes = lateNight
    ? yesterday.closes - MINUTES_PER_DAY
    : today && now.minutes >= today.opens && now.minutes < today.closes
      ? today.closes
      : null
  if (closes !== null) {
    const closingSoon = closes - now.minutes <= 60
    return {
      state: closingSoon ? 'closing' : 'open',
      label: `${closingSoon ? 'Closing soon' : 'Open now'} · until ${formatTime(closes)}`,
    }
  }

  if (today && now.minutes < today.opens) {
    return { state: 'closed', label: `Closed · opens today at ${formatTime(today.opens)}` }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = ((now.day + offset) % 7) as Weekday
    const next = week[day]
    if (next) {
      const when = offset === 1 ? 'tomorrow' : DAY_NAMES[day]
      return { state: 'closed', label: `Closed · opens ${when} at ${formatTime(next.opens)}` }
    }
  }
  return { state: 'closed', label: 'Closed' }
}
