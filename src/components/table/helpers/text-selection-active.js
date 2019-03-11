// Helper to determine if a there is an active text selection on the document page.
// Used to filter out click events caused by the mouse up at end of selection
//
// Expects an element reference to check to see if the selection contains part
// of or is contained within the element.

import { isElement } from '../../../utils/dom'

export default function textSelectionActive(el) {
  const win = window
  /* istanbul ignore if: JSDOM doesn't support getSelection */
  if (win && win.getSelection && isElement(el)) {
    const sel = win.getSelection()
    return sel.containsNode ? sel.containsNode(el, true) : false
  } else {
    return false
  }
}
