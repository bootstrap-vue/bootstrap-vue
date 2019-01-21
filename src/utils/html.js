export function htmlOrContent(innerHTML, textContent) {
  return innerHTML ? { innerHTML } : { textContent }
}
