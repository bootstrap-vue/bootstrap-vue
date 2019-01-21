export function htmlOrText(innerHTML, textContent) {
  return innerHTML ? { innerHTML } : { textContent }
}
