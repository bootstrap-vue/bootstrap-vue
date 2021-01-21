// This method returns a component's scoped style attribute name: `data-v-xxxxxxx`
// The `_scopeId` options property is added by vue-loader when using scoped styles
// and will be `undefined` if no scoped styles are in use
export const getScopeId = (vm, defaultValue = null) => {
  return vm ? vm.$options._scopeId || defaultValue : defaultValue
}
