// Helper to determine if a there is an active text selection on the document page.
// Used to filter out click events caused by the mouse up at end of selection

export default function textSelectionActive() {
  const win = window
  /* istanbul ignore if: JSDOM doesn't support getSelection */
  if (win && win.getSelection && win.getSelection().toString() !== '') {
    return true
  } else {
    return false
  }
}
