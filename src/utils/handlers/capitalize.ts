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
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // capitalize each word
    )
    .join(" "); // join back with spaces
}
