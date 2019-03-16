import warn from '../../utils/warn'
import looseEqual from '../../utils/loose-equal'
import { requestAF } from '../../utils/dom'
import { inBrowser } from '../../utils/env'
import { isObject } from '../../utils/object'
import { computeHref, parseQuery } from '../../utils/router'
import paginationMixin from '../../mixins/pagination'
import { pickLinkProps } from '../link/link'

// Props needed for router links
const routerProps = pickLinkProps(
  'activeClass',
  'exactActiveClass',
  'exact',
  'replace',
  'target',
  'rel'
)

// Props object
const props = {
  // pagination-nav specific props
  numberOfPages: {
    type: [Number, String],
    default: 1,
    validator(value) {
      const num = parseInt(value, 10)
      /* istanbul ignore if */
      if (isNaN(num) || num < 1) {
        warn('b-pagination: prop "number-of-pages" must be a number greater than 0')
        return false
      }
      return true
    }
  },
  baseUrl: {
    type: String,
    default: '/'
  },
  useRouter: {
    type: Boolean,
    default: false
  },
  linkGen: {
    type: Function,
    default: null
  },
  pageGen: {
    type: Function,
    default: null
  },
  noPageDetect: {
    // Disable auto page number detection if true
    type: Boolean,
    default: false
  },
  // Router specific props
  ...routerProps
}

// Our render function is brought in via the pagination mixin
// @vue/component
export default {
  name: 'BPaginationNav',
  mixins: [paginationMixin],
  props,
  computed: {
    // Used by render function to trigger wrapping in '<nav>' element
    isNav() {
      return true
    },
    computedValue() {
      // Returns the value prop as a number or `null` if undefined or < 1
      const val = parseInt(this.value, 10)
      return isNaN(val) || val < 1 ? null : val
    }
  },
  created() {
    // For SSR, assuming a page URL can be detected
    this.$nextTick(() => {
      this.guessCurrentPage()
    })
  },
  mounted() {
    if (this.$router) {
      // We only add the watcher if vue router is detected
      this.$watch('$route', (to, from) => {
        this.$nextTick(() => {
          requestAF(() => {
            this.guessCurrentPage()
          })
        })
      })
    }
  },
  methods: {
    onClick(pageNum, evt) {
      // Dont do anything if clicking the current active page
      if (pageNum === this.currentPage) {
        return
      }
      requestAF(() => {
        // Update the v-model
        // Done in in requestAF() to allow browser to complete the
        // native click handling of a link
        this.currentPage = pageNum
        this.$emit('change', pageNum)
      })
      this.$nextTick(() => {
        // Done in a nextTick() to ensure rendering complete
        try {
          // Emulate native link click page reloading behaviour by blurring the
          // paginator and returning focus to the document
          const target = evt.currentTarget || evt.target
          target.blur()
        } catch (e) {}
      })
    },
    makePage(pageNum) {
      if (this.pageGen && typeof this.pageGen === 'function') {
        return this.pageGen(pageNum)
      }
      return pageNum
    },
    makeLink(pageNum) {
      if (this.linkGen && typeof this.linkGen === 'function') {
        return this.linkGen(pageNum)
      }
      const link = `${this.baseUrl}${pageNum}`
      return this.useRouter ? { path: link } : link
    },
    linkProps(pageNum) {
      const link = this.makeLink(pageNum)
      const props = {
        target: this.target || null,
        rel: this.rel || null,
        disabled: this.disabled,
        // The following props are only used if BLink detects router
        exact: this.exact,
        activeClass: this.activeClass,
        exactActiveClass: this.exactActiveClass,
        append: this.append,
        replace: this.replace
      }
      if (this.useRouter || typeof link === 'object') {
        props.to = link
      } else {
        props.href = link
      }
      return props
    },
    resolveLink(to = '') {
      // Given a to (or href string), convert to normalized route-like structure
      // Works only client side!!
      try {
        let link = document.createElement('a')
        // Convert the `to` to a HREF via a temporary `a` tag
        link.href = computeHref({ to }, undefined, '/', '/')
        // Once href is assigned, the returned href will be normalized to the full URL bits
        return { path: link.pathname, hash: link.hash, query: parseQuery(link.query) }
      } catch (e) {
        /* istanbul ignore next */
        return {}
      }
    },
    resolveRoute(to = '') {
      // Given a to (or href string), convert to normalized route location structure
      // works only when router available!!
      try {
        const route = this.$router.resolve(to, this.$route).route
        return { path: route.path, hash: route.hash, query: route.query }
      } catch (e) {
        /* istanbul ignore next */
        return {}
      }
    },
    guessCurrentPage() {
      let guess = this.computedValue
      const $router = this.$router
      const $route = this.$route
      // This section only occurs if we are client side, or server-side with $router
      /* istanbul ignore else */
      if (!this.noPageDetect && !guess && (inBrowser || (!inBrowser && $router))) {
        // Current route (if router available)
        const currRoute = $router ? { path: $route.path, hash: $route.hash, query: $route.query } : {}
        // Current page full HREF (if client side). Can't be done as a computed prop!
        const loc = inBrowser ? window.location || document.location : null
        const currLink = loc ? { path: loc.pathname, hash: loc.hash, query: parseQuery(loc.search) } : {}
        // Loop through the possible pages looking for a match until found
        for (let page = 1; !guess && page <= this.localNumPages; page++) {
          let to = this.makeLink(page)
          if ($router && (isObject(to) || this.useRouter)) {
            // Resolve the page via the $router
            guess = looseEqual(this.resolveRoute(to), currRoute) ? page : null
          } else if (inBrowser) {
            // If no $router available (or !this.useRouter when `to` is a string)
            // we compare using parsed URIs
            guess = looseEqual(this.resolveLink(to), currLink) ? page : null
          } else {
            // probably SSR, but no $router so we can't guess, so lets break out of loop
            /* istanbul ignore next */
            guess = -1
          }
        }
      }
      // We set currentPage to 0 to trigger an $emit('input', null)
      // As the default for this.currentPage is -1 when no value is specified
      // And valid page numbers are greater than 0
      this.currentPage = guess > 0 ? guess : 0
    }
  }
}
