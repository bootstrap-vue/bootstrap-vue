import { defineComponent } from '../vue'

// @vue/component
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String
      // default: null
    },
    borderVariant: {
      type: String
      // default: null
    },
    textVariant: {
      type: String
      // default: null
    }
  }
})
