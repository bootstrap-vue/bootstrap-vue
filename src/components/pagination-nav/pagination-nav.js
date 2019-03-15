import warn from '../../utils/warn'
import { requestAF } from '../../utils/dom'
import { inBrowser } from '../../utils/env'
import { isObject } from '../../utils/object'
import { computeHref } from '../../utils/router'
import paginationMixin from '../../mixins/pagination'
import { pickLinkProps } from '../link/link'

// Props needed for router links
const routerProps = pickLinkProps(
  'activeClass',
  'exactActiveClass',
  'append',
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
        requestAF(() => {
          this.guessCurrentPage()
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
        // Done in in rAF to allow browser to complete the native click handling of a link
        this.currentPage = pageNum
      })
      this.$nextTick(() => {
        // Done in a nextTick to ensure rendering complete
        try {
          // Emulate native link click page reloading behaviour by  blurring the
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
    guessCurrentPage() {
      let guess = this.computedValue
      const $router = this.$router
      const $route = this.$route
      // This section only occurs if we are client side, or serverside with $router
      /* istanbul ignore else */
      if (!this.noPageDetect && !guess && (inBrowser || (!inBrowser && $router))) {
        const currLocRoute = $router && $route ? $route.fullPath : null
        // Current page full HREF (if client side)
        const currLocLink = inBrowser ? (window.location || document.location).href : null
        // convert a `to` location to a full URL (client side only when no router)
        const resolveLink = to => {
          if (
            inBrowser &&
            ((isObject(to) && to.path !== undefined && to.path !== null) || typeof to === 'string')
          ) {
            let link = document.createElement('a')
            // Convert the `to` to a HREF via a temprary `a` tag
            link.href = computeHref({ to }, undefined, '/', '/')
            // once href is assigned, the returned href will be normalized to the full URL
            return link.href
          } else {
            /* istanbul ignore next: this should never happen under normal circumstances */
            return ''
          }
        }
        // Loop through the possible pages looking for a match until found
        for (let page = 1; !guess && page <= this.localNumPages; page++) {
          let to = this.makeLink(page)
          if ($router && (isObject(to) || this.useRouter)) {
            // Resolve the page via the $router
            const fullPath = $router.resolve(to, $route, this.append).route.fullPath
            guess = fullPath === currLocRoute ? page : null
          } else if (inBrowser) {
            // If no router available (or !this.useRouter when `to` is a string)
            // we compare using fully qualified URLs
            guess = resolveLink(to) === currLocLink ? page : null
          }
        }
      }
      if (guess) {
        this.currentPage = guess
      }
    }
  }
}
