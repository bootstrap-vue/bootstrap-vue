import { defineComponent } from '../vue'

// @vue/component
export default defineComponent({
  props: {
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    custom() {
      return !this.plain
    }
  }
})
