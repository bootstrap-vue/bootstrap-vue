import { mergeData } from 'vue-functional-data-merge'
import { scrollTargetIntoView } from '~/utils'

// --- Utility methods ---

// Convert local links to router push or scrollIntoView
const linkToRouter = event => {
  if (!event || event.type !== 'click') {
    return
  }
  const target = event.target && event.target.closest ? event.target.closest('a[href]') : null
  if (
    !target ||
    event.type !== 'click' ||
    target.__vue__ ||
    target.closest('.bd-example') ||
    target.closest('pre') ||
    event.defaultPrevented
  ) {
    // Early exit if click inside an example, not a link, or
    // default prevented or is a Vue instance
    return
  }
  const href = target.getAttribute('href')
  if (href && href.indexOf('/') === 0 && href.indexOf('//') !== 0) {
    // if local page-to-page-docs link, convert click to `$router.push()`
    event.preventDefault()
    if (typeof window !== 'undefined' && window.$nuxt) {
      // Since we are a functional component, we can't use this.$router
      window.$nuxt.$router.push(href)
    }
  } else if (href && href.indexOf('#') === 0) {
    // In page anchor link, so use scrollIntoView utility method
    scrollTargetIntoView(event, href)
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
