import warn from '../../utils/warn'
import { requestAF } from '../../utils/dom'
import { inBrowser } from '../../utils/env'
import { isObject } from '../../utils/object'
import paginationMixin from '../../mixins/pagination'
import { pickLinkProps } from '../link/link'

// Convert a 'to' location to an HREF string (if possible)
function routeToHREF(to = '/') {
  // Note does not handle query params or hash in to object.
  // TODO:
  //  Could be updated to better handle `to.search` and `to.hash` properties.
  //  BLink uses a similar method... could be made into a util.
  /* istanbul ignore next: for now */
  return String(isObject(to) ? (to.path === undefined ? '/' : to.path) : to)
}

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
  name: 'BPaginatonNav',
  mixins: [paginationMixin],
  props,
  computed: {
    // Used by render function to trigger wraping in '<nav>' element
    isNav() {
      return true
    },
    computedValue() {
      // Returns the value prop as a number or `null` if undefined or < 1
      const val = parseInt(this.value, 10)
      return isNaN(val) || val < 1 ? null : val
    },
    needsEmit() {
      return this.computedValue !== this.currentPage
    }
  },
  watch: {
    needsEmit(newVal, oldVal) {
      this.$emit('input', this.currentPage)
    }
  },
  created() {
    // For SSR (with Vue Router)
    this.$nextTick(() => {
      this.guessCurrentPage()
    })
  },
  mounted() {
    /* istanbul ignore next: for now */
    if (this.$router) {
      this.$watch('$route', (to, from) => {
        // May need to be requestAnimationFrame
        // Or a router guard
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
        this.currentPage = pageNum
      })
      // Done in a nextTick to ensure page number updated correctly
      this.$nextTick(() => {
        try {
          // Emulate native link click page reloading behaviour by  blurring the
          // paginator and returing focus to the document
          const target = evt.currentTarget || evt.target
          target.blur()
        } catch (e) {}
      })
    },
    makePage(pagenum) {
      if (this.pageGen && typeof this.pageGen === 'function') {
        return this.pageGen(pagenum)
      }
      return pagenum
    },
    makeLink(pagenum) {
      if (this.linkGen && typeof this.linkGen === 'function') {
        return this.linkGen(pagenum)
      }
      const link = `${this.baseUrl}${pagenum}`
      return this.useRouter ? { path: link } : link
    },
    linkProps(pagenum) {
      const link = this.makeLink(pagenum)
      let props = {
        href: typeof link === 'string' ? link : void 0,
        target: this.target || null,
        rel: this.rel || null,
        disabled: this.disabled
      }
      if (this.useRouter || typeof link === 'object') {
        props = {
          ...props,
          to: link,
          exact: this.exact,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          append: this.append,
          replace: this.replace
        }
      }
      return props
    },
    guessCurrentPage() /* istanbul ignore next: for now */ {
      if (this.noPageDetect) {
        return
      }
      let current = this.computedValue
      const numPages = this.localNumPages
      if (!current) {
        // Try and guess the page number based on URL
        if (this.$router) {
          // If a router is present
          for (let page = 1; !current && page <= numPages; page++) {
            let to = this.makeLink(page)
            to = isObject(to) ? to : String(to)
            const href = this.$router.resolve(to).resolved.fullPath
            current = href === this.$route.fullPath ? page : null
          }
        } else if (inBrowser) {
          // Else try by comparing page URL with page Link URLs
          const loc = window.location || document.location
          for (let page = 1; !current && page <= numPages; page++) {
            const link = document.createElement('a')
            // Assigning to a link will auto normalize the URL
            link.href = routeToHREF(this.makeLink(page))
            current = link.href === loc.href ? page : null
          }
        }
      }
      if (current) {
        this.currentPage = current
      }
    }
  }
}
