export function Capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CapitalizeAll(str: string): string {
    return str.toUpperCase();
}