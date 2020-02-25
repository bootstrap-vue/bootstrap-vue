import { hasOwnProperty } from '../utils/object'

// --- Constants ---

const ATTRS_ATTRIBUTE_NAME = 'attrs$'
const LISTENERS_ATTRIBUTE_NAME = 'listeners$'

// --- Utility methods ---

const makeWatcher = property => ({
  handler(newVal, oldVal) {
    for (const attr in oldVal) {
      if (!hasOwnProperty(newVal, attr)) {
        this.$delete(this.$data[property], attr)
      }
    }
    for (const attr in newVal) {
      this.$set(this.$data[property], attr, newVal[attr])
    }
  },
  immediate: true
})

// @vue/component
export default {
  data() {
    return {
      [ATTRS_ATTRIBUTE_NAME]: {},
      [LISTENERS_ATTRIBUTE_NAME]: {}
    }
  },
  watch: {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    $attrs: makeWatcher(ATTRS_ATTRIBUTE_NAME),
    $listeners: makeWatcher(LISTENERS_ATTRIBUTE_NAME)
  }
}
