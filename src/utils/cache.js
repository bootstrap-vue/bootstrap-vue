import { defineComponent } from '../vue'
import cloneDeep from './clone-deep'
import looseEqual from './loose-equal'
import { isFunction } from './inspect'
import { hasOwnProperty, keys } from './object'

const isEmpty = value => !value || keys(value).length === 0

export const makePropWatcher = (propName, normalizePropFn = null) => ({
  handler(newValue, oldValue) {
    if (isFunction(normalizePropFn)) {
      newValue = normalizePropFn(newValue)
      oldValue = normalizePropFn(oldValue)
    }
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

export const makePropCacheMixin = (propName, proxyPropName, normalizePropFn = null) =>
  defineComponent({
    data() {
      return {
        [proxyPropName]: cloneDeep(
          isFunction(normalizePropFn) ? normalizePropFn(this[propName]) : this[propName]
        )
      }
    },
    watch: {
      // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
      [propName]: makePropWatcher(proxyPropName, normalizePropFn)
    }
  })
