import { Vue } from '../vue'
import { cloneDeep } from './clone-deep'
import { looseEqual } from './loose-equal'
import { hasOwnProperty, keys } from './object'

const isEmpty = value => !value || keys(value).length === 0

export const makePropWatcher = propName => ({
  handler(newValue, oldValue) {
    if (looseEqual(newValue, oldValue)) {
      return
    }
    if (isEmpty(newValue) || isEmpty(oldValue)) {
      this[propName] = cloneDeep(newValue)
      return
    }
    for (const key in oldValue) {
      if (!hasOwnProperty(newValue, key)) {
        this.$delete(this.$data[propName], key)
      }
    }
    for (const key in newValue) {
      this.$set(this.$data[propName], key, newValue[key])
    }
  }
})

export const makePropCacheMixin = (propName, proxyPropName) =>
  Vue.extend({
    data() {
      return { [proxyPropName]: cloneDeep(this[propName]) }
    },
    watch: {
      // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
      [propName]: makePropWatcher(proxyPropName)
    }
  })
