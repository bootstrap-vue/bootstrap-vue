import { paginationMixin } from '../../mixins'
import { isVisible } from '../../utils/dom'

const props = {
  perPage: {
    type: Number,
    default: 20
  },
  totalRows: {
    type: Number,
    default: 20
  },
  ariaControls: {
    type: String,
    default: null
  }
}

// Our render function is brought in from the pagination mixin
export default {
  mixins: [ paginationMixin ],
  props,
  computed: {
    numberOfPages () {
      const result = Math.ceil(this.totalRows / this.perPage)
      return (result < 1) ? 1 : result
    }
  },
  methods: {
    // These methods are used by the render function
    onClick (num, evt) {
      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      if (num > this.numberOfPages) {
        num = this.numberOfPages
      } else if (num < 1) {
        num = 1
      }
      this.currentPage = num
      this.$nextTick(() => {
        // Keep the current button focused if possible
        const target = evt.target
        if (isVisible(target) && this.$el.contains(target) && target.focus) {
          target.focus()
        } else {
          this.focusCurrent()
        }
      })
      this.$emit('change', this.currentPage)
    },
    makePage (pagenum) {
      return pagenum
    },
    linkProps (pagenum) {
      return { href: '#' }
    }
  }
}
