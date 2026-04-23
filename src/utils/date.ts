export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}
