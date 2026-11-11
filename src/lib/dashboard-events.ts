/** Calendar dates are evaluated in the business timezone, regardless of the admin's device. */
export function coloradoToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Denver", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now)
}

export function isCurrentEvent(event: { event_date: string; event_status?: string | null }, now = new Date()): boolean {
  const date = event.event_date?.slice(0, 10)
  return event.event_status !== "cancelled" && /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= coloradoToday(now)
}
