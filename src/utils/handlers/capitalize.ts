import formatDate from "./format-date";

export function Capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CapitalizeAll(str: string): string {
    return str.toUpperCase();
}

export function LowercaseAll(str: string): string {
    return str.toLocaleLowerCase()
}

export function formatLabel(text: string): string {
  return text
    .split("_") // replace underscores
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1) // capitalize each word
    )
    .join(" "); // join back with spaces
}

export function formatCreatedAt(time: string): { formatted_date: string; formatted_time: string } {
  const date = new Date(time)
  
  const formatted_date = formatDate(date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }));

  const formatted_time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return { formatted_date, formatted_time }
}

export function formatSpaceToUnderscore(str: string) {
  return str.replace(/ /g, "_").toLowerCase()
}