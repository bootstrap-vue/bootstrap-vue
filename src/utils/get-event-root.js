export const getEventRoot = vm => {
  if (!vm.$root) {
    return null
  }

  return vm.$root.$options.bvEventRoot || vm.$root
}
