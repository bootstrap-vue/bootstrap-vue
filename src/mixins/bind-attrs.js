import { hasOwnProperty } from '../utils/object'

// --- Constants ---

const ATTRS_ATTRIBUTE_NAME = 'attrs$'
const LISTENERS_ATTRIBUTE_NAME = 'listeners$'

// --- Utility methods ---

const makeWatcher = property => ({
  handler(newVal, oldVal) {
    for (const prop in oldVal) {
      if (!hasOwnProperty(newVal, prop)) {
        this.$delete(this.$data[property], prop)
      }
    }
    for (const prop in newVal) {
      this.$set(this.$data[property], prop, newVal[prop])
    }
  }
})

// @vue/component
export default {
  data() {
    return {
      [ATTRS_ATTRIBUTE_NAME]: {},
      [LISTENERS_ATTRIBUTE_NAME]: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this[ATTRS_ATTRIBUTE_NAME] = { ...this.$attrs }
      this[LISTENERS_ATTRIBUTE_NAME] = { ...this.$listeners }
    })
  },
  watch: {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    $attrs: makeWatcher(ATTRS_ATTRIBUTE_NAME),
    $listeners: makeWatcher(LISTENERS_ATTRIBUTE_NAME)
  }
}
