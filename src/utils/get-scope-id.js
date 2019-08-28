const getScopeId = (vm, defaultValue = null) => {
  return vm ? vm.$options._scopeId || defaultValue : defaultValue
}

export default getScopeId
