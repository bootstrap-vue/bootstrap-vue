import { mergeData } from 'vue-functional-data-merge'
import { offsetTop, scrollTo } from '~/utils'

// -- Utility handlers --

const elProto = typeof Element !== 'undefined' ? Element.prototype : {}

const isElement = el => Boolean(el && el.nodeType === Node.ELEMENT_NODE)

const matchesEl = elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector

const matches = (el, selector) => {
  if (!isElement(el)) {
    return false
  }
  return matchesEl.call(el, selector)
}

const closestEl =
  elProto.closest ||
  function(sel) {
    let el = this
    do {
      // Use our "patched" matches function
      if (matches(el, sel)) {
        return el
      }
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === Node.ELEMENT_NODE)
    return null
  }

const closest = (selector, root) => {
  if (!isElement(root)) {
    return null
  }
  const el = closestEl.call(root, selector)
  // Emulate jQuery closest and return `null` if match is the passed in element (root)
  // return el === root ? null : el
  // In this case
  return el || null
}

// Scroll an in-page link target into view
const scrollIntoView = (evt, href) => {
  evt.preventDefault()
  evt.stopPropagation()
  // We use an attribute `querySelector()` rather than `getElementByID()`,
  // as some auto-generated ID's are invalid or not unique
  const id = (href || '').replace(/#/g, '')
  const $el = document.body.querySelector(`[id="${id}"]`)
  if ($el) {
    // Get the document scrolling element
    const scroller = document.scrollingElement || document.documentElement || document.body
    // Scroll heading into view (minus offset to account for nav top height
    scrollTo(scroller, offsetTop($el) - 70, 100, () => {
      // Set a tab index so we can focus header for a11y support
      $el.tabIndex = -1
      // Focus the heading
      $el.focus()
    })
  }
}

// Convert local links to router push or scrollIntoView
const linkToRouter = evt => {
  const target = closest('a[href]', evt.target)
  if (
    !target ||
    closest('.bd-example', target) ||
    closest('pre', target) ||
    evt.defaultPrevented
  ) {
    // early exit if click inside example, not a link, or default prevented
    return
  }
  const href = target.getAttribute('href')
  // if local docs link, convert to router push
  if (href && href.indexOf('/') === 0 && href.indexOf('//') === -1) {
    // Internal page link
    evt.preventDefault()
    if (typeof window !== 'undefined' && window.$nuxt) {
      // Since we are a functional component, we can't use this.$router
      window.$nuxt.$router.push(href)
    }
  } else if (href && href.indexOf('#') === 0) {
    // In page anchor link.
    // Use scrollIntoView utility method to smooth scroll page
    scrollIntoView(evt, href)
  }
  // Else, normal handling
}

export default {
  name: 'BDVSection',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data, children }) {
    const directives = []
    if (props.play) {
      directives.push({ name: 'play' })
    }
    return h(
      props.tag,
      mergeData(data, {
        class: ['bd-content'],
        directives,
        on: {
          click: linkToRouter
        }
      }),
      [children]
    )
  }
}
