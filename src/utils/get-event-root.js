export const getEventRoot = vm => {
  return vm.$root.$options.bvEventRoot || vm.$root
}
