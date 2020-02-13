import Vue from '../../utils/vue'
import looseEqual from '../../utils/loose-equal'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { isArray, isUndefined, isFunction, isObject } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { computeHref, parseQuery } from '../../utils/router'
import { toString } from '../../utils/string'
import { warn } from '../../utils/warn'
import paginationMixin from '../../mixins/pagination'

const NAME = 'BPaginationNav'

// Sanitize the provided number of pages (converting to a number)
export const sanitizeNumberOfPages = value => {
  const numberOfPages = toInteger(value) || 1
  return numberOfPages < 1 ? 1 : numberOfPages
}

const props = {
  size: {
    type: String,
    default: () => getComponentConfig(NAME, 'size')
  },
  numberOfPages: {
    type: [Number, String],
    default: 1,
    validator(value) /* istanbul ignore next */ {
      const num = toInteger(value)
      if (isNaN(num) || num < 1) {
        warn('Prop "number-of-pages" must be a number greater than "0"', NAME)
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
  pages: {
    // Optional array of page links
    type: Array,
    default: null
  },
  noPageDetect: {
    // Disable auto page number detection if true
    type: Boolean,
    default: false
  },
  // router-link specific props
  activeClass: {
    type: String
    // default: undefined
  },
  exact: {
    type: Boolean,
    default: false
  },
  exactActiveClass: {
    type: String
    // default: undefined
  },
  // nuxt-link specific prop(s)
  noPrefetch: {
    type: Boolean,
    default: false
  }
}

// The render function is brought in via the pagination mixin
// @vue/component
export const BPaginationNav = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [paginationMixin],
  props,
  computed: {
    // Used by render function to trigger wrapping in '<nav>' element
    isNav() {
      return true
    },
    computedValue() {
      // Returns the value prop as a number or `null` if undefined or < 1
      const val = toInteger(this.value)
      return isNaN(val) || val < 1 ? null : val
    }
  },
  watch: {
    numberOfPages() {
      this.$nextTick(() => {
        this.setNumberOfPages()
      })
    },
    pages() {
      this.$nextTick(() => {
        this.setNumberOfPages()
      })
    }
  },
  created() {
    this.setNumberOfPages()
  },
  mounted() {
    if (this.$router) {
      // We only add the watcher if vue router is detected
      this.$watch('$route', () => {
        this.$nextTick(() => {
          requestAF(() => {
            this.guessCurrentPage()
          })
        })
      })
    }
  },
  methods: {
    setNumberOfPages() {
      if (isArray(this.pages) && this.pages.length > 0) {
        this.localNumberOfPages = this.pages.length
      } else {
        this.localNumberOfPages = sanitizeNumberOfPages(this.numberOfPages)
      }
      this.$nextTick(() => {
        this.guessCurrentPage()
      })
    },
    onClick(pageNum, evt) {
      // Dont do anything if clicking the current active page
      if (pageNum === this.currentPage) {
        return
      }
      requestAF(() => {
        // Update the v-model
        // Done in in requestAF() to allow browser to complete the
        // native browser click handling of a link
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
    getPageInfo(pageNum) {
      if (!isArray(this.pages) || this.pages.length === 0 || isUndefined(this.pages[pageNum - 1])) {
        const link = `${this.baseUrl}${pageNum}`
        return {
          link: this.useRouter ? { path: link } : link,
          text: toString(pageNum)
        }
      }
      const info = this.pages[pageNum - 1]
      if (isObject(info)) {
        const link = info.link
        return {
          // Normalize link for router use
          link: isObject(link) ? link : this.useRouter ? { path: link } : link,
          // Make sure text has a value
          text: toString(info.text || pageNum)
        }
      } else {
        return { link: toString(info), text: toString(pageNum) }
      }
    },
    makePage(pageNum) {
      const info = this.getPageInfo(pageNum)
      if (this.pageGen && isFunction(this.pageGen)) {
        return this.pageGen(pageNum, info)
      }
      return info.text
    },
    makeLink(pageNum) {
      const info = this.getPageInfo(pageNum)
      if (this.linkGen && isFunction(this.linkGen)) {
        return this.linkGen(pageNum, info)
      }
      return info.link
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
        replace: this.replace,
        // nuxt-link specific prop
        noPrefetch: this.noPrefetch
      }
      if (this.useRouter || isObject(link)) {
        props.to = link
      } else {
        props.href = link
      }
      return props
    },
    resolveLink(to = '') {
      // Given a to (or href string), convert to normalized route-like structure
      // Works only client side!!
      let link
      try {
        // Convert the `to` to a HREF via a temporary `a` tag
        link = document.createElement('a')
        link.href = computeHref({ to }, 'a', '/', '/')
        // We need to add the anchor to the document to make sure the
        // `pathname` is correctly detected in any browser (i.e. IE)
        document.body.appendChild(link)
        // Once href is assigned, the link will be normalized to the full URL bits
        const { pathname, hash, search } = link
        // Remove link from document
        document.body.removeChild(link)
        // Return the location in a route-like object
        return { path: pathname, hash: hash, query: parseQuery(search) }
      } catch (e) {
        /* istanbul ignore next */
        try {
          link && link.parentNode && link.parentNode.removeChild(link)
        } catch (e) {}
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
      if (!this.noPageDetect && !guess && (isBrowser || (!isBrowser && $router))) {
        // Current route (if router available)
        const currRoute =
          $router && $route ? { path: $route.path, hash: $route.hash, query: $route.query } : {}
        // Current page full HREF (if client side). Can't be done as a computed prop!
        const loc = isBrowser ? window.location || document.location : null
        const currLink = loc
          ? { path: loc.pathname, hash: loc.hash, query: parseQuery(loc.search) }
          : {}
        // Loop through the possible pages looking for a match until found
        for (let page = 1; !guess && page <= this.localNumberOfPages; page++) {
          const to = this.makeLink(page)
          if ($router && (isObject(to) || this.useRouter)) {
            // Resolve the page via the $router
            guess = looseEqual(this.resolveRoute(to), currRoute) ? page : null
          } else if (isBrowser) {
            // If no $router available (or !this.useRouter when `to` is a string)
            // we compare using parsed URIs
            guess = looseEqual(this.resolveLink(to), currLink) ? page : null
          } else {
            // probably SSR, but no $router so we can't guess, so lets break out of
            // the loop early
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
})
