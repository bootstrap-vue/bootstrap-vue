// fake-transition component. Used as a transition stub
//
// From vue-test-utils-beta.29 (removed in  beta.30)
// https://github.com/vuejs/vue-test-utils/blob/v1.0.0-beta.29/packages/test-utils/src/components/TransitionStub.js
//
// Note: does not emit events, nor call handlers

function getRealChild(vnode) {
  const compOptions = vnode && vnode.componentOptions
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (c && (c.componentOptions || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

const camelizeRE = /-(\w)/g
export const camelize = str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

function hasParentTransition(vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

export default {
  render(h) {
    let children = this.$options._renderChildren
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(c => c.tag || isAsyncPlaceholder(c))
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      console.warn(
        '<transition> can only be used on a single element. Use <transition-group> for lists.'
      )
    }

    const mode = this.mode

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in') {
      console.warn('invalid <transition> mode: ' + mode)
    }

    const rawChild = children[0]

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    const child = getRealChild(rawChild)

    if (!child) {
      return rawChild
    }

    const id = `__transition-${this._uid}-`
    child.key =
      child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? String(child.key).indexOf(id) === 0
            ? child.key
            : id + child.key
          : child.key

    const data = child.data || (child.data = {})
    const oldRawChild = this._vnode
    const oldChild = getRealChild(oldRawChild)
    if (child.data.directives && child.data.directives.some(d => d.name === 'show')) {
      child.data.show = true
    }

    // mark v-show
    // so that the transition module can hand over the control
    // to the directive
    if (child.data.directives && child.data.directives.some(d => d.name === 'show')) {
      child.data.show = true
    }
    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      oldChild.data = { ...data }
    }
    return rawChild
  }
}
