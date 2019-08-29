// This method returns the parent component's scoped style attribute name `data-v-xxxxxxx`
// The `_scopeId` options property is added by vue-loader when using scoped styles

const getScopeId = (vm, defaultValue = null) => {
  return vm ? vm.$options._scopeId || defaultValue : defaultValue
}

export default getScopeId
