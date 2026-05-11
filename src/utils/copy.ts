export async function copyToClipboard(text: string) {
  return await navigator.clipboard.writeText(text)
}
