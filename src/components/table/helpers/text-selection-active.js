// Helper to determine if a there is an active text selection on the document page.
// Used to filter out click events caused by the mouse up at end of selection

export default function textSelectionActive() {
  const win = window
  return win && win.getSelection ? win.getSelection().toString().length > 0 : false
}
