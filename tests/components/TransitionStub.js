/* istanbul ignore file */
const getRealChild = vnode => {
  const compOptions = vnode && vnode.componentOptions
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

const isSameChild = (child, oldChild) => {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

const getFirstComponentChild = children => {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (c && (c.componentOptions || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

const isPrimitive = value =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'symbol' ||
  typeof value === 'boolean'

const isAsyncPlaceholder = node => node.isComment && node.asyncFactory

const hasParentTransition = vnode => {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

export default {
  render() {
    let children = this.$options._renderChildren
    if (!children) {
      return
    }

    // Filter out text nodes (possible whitespaces)
    children = children.filter(c => c.tag || isAsyncPlaceholder(c))
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    const rawChild = children[0]

    // If this is a component root node and the component's
    // parent container node also has transition, skip
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // Apply transition data to child
    // Use `getRealChild()` to ignore abstract components (e.g. `keep-alive`)
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

    // Mark `v-show` so that the transition module can hand over
    // the control to the directive
    if (child.data.directives && child.data.directives.some(d => d.name === 'show')) {
      child.data.show = true
    }
    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      oldChild.data = { ...data }
    }
    return rawChild
  }
}
