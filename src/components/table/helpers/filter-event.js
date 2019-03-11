import { closest, matches } from '../../../utils/dom'
import { EVENT_FILTER } from './constants'

// Returns true of we should ignore the click/dbclick/keypress event
// Avoids having the user need to use @click.stop on the form control

export default function filterEvent(evt) {
  if (!evt || !evt.target) {
    /* istanbul ignore next */
    return
  }
  const el = evt.target
  if (el.tagName === 'TD' || el.tagName === 'TH' || el.tagName === 'TR' || el.disabled) {
    // Shortut all the following tests for efficiency
    return false
  }
  if (closest('.dropdown-menu', el)) {
    // Click was in a dropdown menu, so ignore
    return true
  }
  const label = el.tagName === 'LABEL' ? el : closest('label', el)
  if (label && label.control && !label.control.disabled) {
    // If the label's form control is not disabled then we don't propagate evt
    return true
  }
  // Else check to see if the event target matches one of the selectors in the event filter
  // i.e. anchors, non disabled inputs, etc. Return true if we should ignore the event.
  return matches(el, EVENT_FILTER)
}
