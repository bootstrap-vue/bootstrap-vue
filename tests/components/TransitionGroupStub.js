/* istanbul ignore file */
export default {
  render(h) {
    const tag = this.tag || this.$vnode.data.tag || 'span'
    const children = this.$slots.default || []

    return h(tag, children)
  }
}
