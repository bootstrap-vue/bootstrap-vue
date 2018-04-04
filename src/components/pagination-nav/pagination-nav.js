import { assign } from '../../utils/object'
import paginationMixin from '../../mixins/pagination'
import { pickLinkProps } from '../link/link'

// Props needed for router links
const routerProps = pickLinkProps('activeClass', 'exactActiveClass', 'append', 'exact', 'replace', 'target', 'rel')

// Props object
const props = assign(
  // pagination-nav specific props
  {
    numberOfPages: {
      type: Number,
      default: 1
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
    }
  },
  // Router specific props
  routerProps
)
// Our render function is brought in via the pagination mixin
export default {
  mixins: [ paginationMixin ],
  props,
  computed: {
    // Used by render function to trigger wraping in '<nav>' element
    isNav () {
      return true
    }
  },
  methods: {
    onClick (pageNum, evt) {
      this.currentPage = pageNum
    },
    makePage (pagenum) {
      if (this.pageGen && typeof this.pageGen === 'function') {
        return this.pageGen(pagenum)
      }
      return pagenum
    },
    makeLink (pagenum) {
      if (this.linkGen && typeof this.linkGen === 'function') {
        return this.linkGen(pagenum)
      }
      const link = `${this.baseUrl}${pagenum}`
      return this.useRouter ? { path: link } : link
    },
    linkProps (pagenum) {
      const link = this.makeLink(pagenum)
      let props = {
        href: typeof link === 'string' ? link : void 0,
        target: this.target || null,
        rel: this.rel || null,
        disabled: this.disabled
      }
      if (this.useRouter || typeof link === 'object') {
        props = assign(props, {
          to: link,
          exact: this.exact,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          append: this.append,
          replace: this.replace
        })
      }
      return props
    }
  }
}
