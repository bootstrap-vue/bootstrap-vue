import { mergeData } from 'vue-functional-data-merge'
import { offsetTop, scrollTo } from '~/utils'

// -- Utility handlers --

// Scroll an in-page link target into view
// this is the same as in toc.vue (as an instance method)
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
  if (!evt || evt.type !== 'click') {
    return
  }
  const target = evt.target && evt.target.closest ? evt.target.closest('a[href]') : null
  if (
    !target ||
    evt.type !== 'click' ||
    target.__vue__ ||
    target.closest('.bd-example') ||
    target.closest('pre') ||
    evt.defaultPrevented
  ) {
    // Early exit if click inside an example, not a link, or
    // default prevented or is a Vue instance
    return
  }
  const href = target.getAttribute('href')
  if (href && href.indexOf('/') === 0 && href.indexOf('//') !== 0) {
    // if local page-to-page-docs link, convert click to `$router.push()`
    evt.preventDefault()
    if (typeof window !== 'undefined' && window.$nuxt) {
      // Since we are a functional component, we can't use this.$router
      window.$nuxt.$router.push(href)
    }
  } else if (href && href.indexOf('#') === 0) {
    // In page anchor link, so use scrollIntoView utility method
    scrollIntoView(evt, href)
  }
  // Else, normal browser link handling (i.e. external links)
}

// @vue/component
export default {
  name: 'BVSection',
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
