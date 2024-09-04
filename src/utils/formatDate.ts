export const formatDate = (utc: any) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    timeZone: window.TIME_ZONE,
    hour: 'numeric',
    minute: 'numeric',
  }
  // @ts-ignore
  return new Date(utc).toLocaleString(window.TIME_ZONE_LOCALE, options) + window.TIME_ZONE_ADD
}