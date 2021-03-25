import { Vue } from '../../vue'
import { NAME_PAGINATION_NAV } from '../../constants/components'
import { IS_BROWSER } from '../../constants/env'
import { EVENT_NAME_CHANGE, EVENT_NAME_PAGE_CLICK } from '../../constants/events'
import {
  PROP_TYPE_ARRAY,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { BvEvent } from '../../utils/bv-event.class'
import { attemptBlur, requestAF } from '../../utils/dom'
import { isArray, isUndefined, isObject } from '../../utils/inspect'
import { looseEqual } from '../../utils/loose-equal'
import { mathMax } from '../../utils/math'
import { toInteger } from '../../utils/number'
import { omit, sortKeys } from '../../utils/object'
import { hasPropFunction, makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { computeHref, parseQuery } from '../../utils/router'
import { toString } from '../../utils/string'
import { warn } from '../../utils/warn'
import { paginationMixin, props as paginationProps } from '../../mixins/pagination'
import { props as BLinkProps } from '../link/link'

// --- Helper methods ---

// Sanitize the provided number of pages (converting to a number)
export const sanitizeNumberOfPages = value => mathMax(toInteger(value, 0), 1)

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])

const props = makePropsConfigurable(
  sortKeys({
    ...paginationProps,
    ...linkProps,
    baseUrl: makeProp(PROP_TYPE_STRING, '/'),
    linkGen: makeProp(PROP_TYPE_FUNCTION),
    // Disable auto page number detection if `true`
    noPageDetect: makeProp(PROP_TYPE_BOOLEAN, false),
    numberOfPages: makeProp(
      PROP_TYPE_NUMBER_STRING,
      1,
      /* istanbul ignore next */
      value => {
        const number = toInteger(value, 0)
        if (number < 1) {
          warn('Prop "number-of-pages" must be a number greater than "0"', NAME_PAGINATION_NAV)
          return false
        }
        return true
      }
    ),
    pageGen: makeProp(PROP_TYPE_FUNCTION),
    // Optional array of page links
    pages: makeProp(PROP_TYPE_ARRAY),
    useRouter: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_PAGINATION_NAV
)

// --- Main component ---

// @vue/component
export const BPaginationNav = /*#__PURE__*/ Vue.extend({
  name: NAME_PAGINATION_NAV,
  // The render function is brought in via the pagination mixin
  mixins: [paginationMixin],
  props,
  computed: {
    // Used by render function to trigger wrapping in '<nav>' element
    isNav() {
      return true
    },
    computedValue() {
      // Returns the value prop as a number or `null` if undefined or < 1
      const value = toInteger(this.value, 0)
      return value < 1 ? null : value
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
    onClick(event, pageNumber) {
      // Dont do anything if clicking the current active page
      if (pageNumber === this.currentPage) {
        return
      }

      const target = event.currentTarget || event.target

      // Emit a user-cancelable `page-click` event
      const clickEvent = new BvEvent(EVENT_NAME_PAGE_CLICK, {
        cancelable: true,
        vueTarget: this,
        target
      })
      this.$emit(clickEvent.type, clickEvent, pageNumber)
      if (clickEvent.defaultPrevented) {
        return
      }

      // Update the `v-model`
      // Done in in requestAF() to allow browser to complete the
      // native browser click handling of a link
      requestAF(() => {
        this.currentPage = pageNumber
        this.$emit(EVENT_NAME_CHANGE, pageNumber)
      })

      // Emulate native link click page reloading behaviour by blurring the
      // paginator and returning focus to the document
      // Done in a `nextTick()` to ensure rendering complete
      this.$nextTick(() => {
        attemptBlur(target)
      })
    },
    getPageInfo(pageNumber) {
      if (
        !isArray(this.pages) ||
        this.pages.length === 0 ||
        isUndefined(this.pages[pageNumber - 1])
      ) {
        const link = `${this.baseUrl}${pageNumber}`
        return {
          link: this.useRouter ? { path: link } : link,
          text: toString(pageNumber)
        }
      }
      const info = this.pages[pageNumber - 1]
      if (isObject(info)) {
        const link = info.link
        return {
          // Normalize link for router use
          link: isObject(link) ? link : this.useRouter ? { path: link } : link,
          // Make sure text has a value
          text: toString(info.text || pageNumber)
        }
      } else {
        return { link: toString(info), text: toString(pageNumber) }
      }
    },
    makePage(pageNumber) {
      const { pageGen } = this
      const info = this.getPageInfo(pageNumber)
      if (hasPropFunction(pageGen)) {
        return pageGen(pageNumber, info)
      }
      return info.text
    },
    makeLink(pageNumber) {
      const { linkGen } = this
      const info = this.getPageInfo(pageNumber)
      if (hasPropFunction(linkGen)) {
        return linkGen(pageNumber, info)
      }
      return info.link
    },
    linkProps(pageNumber) {
      const props = pluckProps(linkProps, this)
      const link = this.makeLink(pageNumber)
      if (this.useRouter || isObject(link)) {
        props.to = link
      } else {
        props.href = link
      }
      return props
    },
    resolveLink(to = '') {
      // Given a to (or href string), convert to normalized route-like structure
      // Works only client side!
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
        return { path: pathname, hash, query: parseQuery(search) }
      } catch (e) {
        /* istanbul ignore next */
        try {
          link && link.parentNode && link.parentNode.removeChild(link)
        } catch {}
        /* istanbul ignore next */
        return {}
      }
    },
    resolveRoute(to = '') {
      // Given a to (or href string), convert to normalized route location structure
      // Works only when router available!
      try {
        const route = this.$router.resolve(to, this.$route).route
        return { path: route.path, hash: route.hash, query: route.query }
      } catch (e) {
        /* istanbul ignore next */
        return {}
      }
    },
    guessCurrentPage() {
      const { $router, $route } = this
      let guess = this.computedValue
      // This section only occurs if we are client side, or server-side with `$router`
      if (!this.noPageDetect && !guess && (IS_BROWSER || (!IS_BROWSER && $router))) {
        // Current route (if router available)
        const currentRoute =
          $router && $route ? { path: $route.path, hash: $route.hash, query: $route.query } : {}
        // Current page full HREF (if client side)
        // Can't be done as a computed prop!
        const loc = IS_BROWSER ? window.location || document.location : null
        const currentLink = loc
          ? { path: loc.pathname, hash: loc.hash, query: parseQuery(loc.search) }
          : /* istanbul ignore next */ {}
        // Loop through the possible pages looking for a match until found
        for (let pageNumber = 1; !guess && pageNumber <= this.localNumberOfPages; pageNumber++) {
          const to = this.makeLink(pageNumber)
          if ($router && (isObject(to) || this.useRouter)) {
            // Resolve the page via the `$router`
            guess = looseEqual(this.resolveRoute(to), currentRoute) ? pageNumber : null
          } else if (IS_BROWSER) {
            // If no `$router` available (or `!this.useRouter` when `to` is a string)
            // we compare using parsed URIs
            guess = looseEqual(this.resolveLink(to), currentLink) ? pageNumber : null
          } else {
            // Probably SSR, but no `$router` so we can't guess,
            // so lets break out of the loop early
            /* istanbul ignore next */
            guess = -1
          }
        }
      }
      // We set `currentPage` to `0` to trigger an `$emit('input', null)`
      // As the default for `currentPage` is `-1` when no value is specified
      // Valid page numbers are greater than `0`
      this.currentPage = guess > 0 ? guess : 0
    }
  }
})
