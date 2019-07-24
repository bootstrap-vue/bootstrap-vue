import { mergeData } from 'vue-functional-data-merge'
import { offsetTop, scrollTo } from '~/utils'

// -- Utility handlers --

// Scroll an inpage link target into view
//
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
  let target = evt.target
  if (closest('.bd-example', target) || closest('pre', target) || evt.defaultPrevented) {
    // if click inside example or default prevented, early exit
    return
  }
  target = target.tagName === 'A' ? target : closest('a[href]', target)
  if (!target) {
    return
  }
  const href = target.getAttribute('href')
  // if local docs link, convert to router push
  if (href && href.indexOf('\/') === 0 && href.indexOf('\/\/') === -1) {
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
