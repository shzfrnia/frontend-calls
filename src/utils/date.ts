import dayjs from "dayjs"

export function formatDate(
  date: string | Date,
  options?: {
    withTime?: boolean
  }
) {
  const { withTime = true } = options || {}

  return dayjs(date).format(
    ["YYYY-MM-DD", withTime ? "HH:mm:ss" : ""].filter(Boolean).join(" ")
  )
}
