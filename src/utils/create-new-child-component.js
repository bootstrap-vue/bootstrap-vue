export const createNewChildComponent = (parent, Component, config = {}) => {
  const bvEventRoot = parent.$root ? parent.$root.$options.bvEventRoot || parent.$root : null

  return new Component({
    ...config,
    parent,
    bvParent: parent,
    bvEventRoot
  })
}
