import target from '../../utils/target'

const listenTypes = {click: true}

export default {
// eslint-disable-next-line no-shadow-restricted-names
  bind (undefined, binding, vnode) {
    target(vnode, binding, listenTypes, ({targets, vnode}) => {
      targets.forEach(target => {
        vnode.context.$root.$emit('bv::show::modal', target, vnode.elm)
      })
    })
  }
}
