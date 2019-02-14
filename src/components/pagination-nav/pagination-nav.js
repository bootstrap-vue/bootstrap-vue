import warn from '../../utils/warn'
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
    }
  },
  methods: {
    onClick(pageNum, evt) {
      // Update the v-model
      this.currentPage = pageNum
      this.$nextTick(() => {
        try {
          // Emulate native link click page reloading behaviour by bluring the
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
    }
  }
}
