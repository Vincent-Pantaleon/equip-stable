import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export function getDateLabel(dateStr: string): string {
    const target = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    // Normalize all dates to remove time portion
    const format = (d: Date) => d.toISOString().split("T")[0]

    if (format(target) === format(today)) return " (Today)"
    if (format(target) === format(tomorrow)) return " (Tomorrow)"
    return ""
}

export function getTimeLabel(date: string, start: string, end: string): string {
  const now = new Date();

  const startDateTime = new Date(`${date}T${start}`);
  const endDateTime = new Date(`${date}T${end}`);

  // Get only the date part (midnight) for today and event
  const today = new Date(now.toISOString().split("T")[0]);
  const eventDay = new Date(date);

  // Difference in days
  const diffInMs = eventDay.getTime() - today.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > 1) {
    return "Upcoming";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else if (diffInDays < 0) {
    return "Finished";
  } else {
    // Event is today → check time
    if (now >= startDateTime && now <= endDateTime) {
      return "Now";
    } else if (now < startDateTime) {
      return "Later";
    } else {
      return "Finished";
    }
  }
}

export function formatTime(time: string): string {
  return dayjs(time, 'HH:mm:ss').format('HH:mm')
}