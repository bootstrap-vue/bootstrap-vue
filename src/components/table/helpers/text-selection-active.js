import { getSel, isElement } from '../../../utils/dom'

// Helper to determine if a there is an active text selection on the document page
// Used to filter out click events caused by the mouse up at end of selection
//
// Accepts an element as only argument to test to see if selection overlaps or is
// contained within the element
const textSelectionActive = (el = document) => {
  const sel = getSel()
  return sel && sel.toString().trim() !== '' && sel.containsNode && isElement(el)
    ? sel.containsNode(el, true)
    : false
}

export default textSelectionActive
