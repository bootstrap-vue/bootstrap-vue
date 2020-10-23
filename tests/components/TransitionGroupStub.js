/* istanbul ignore file */

import { h } from 'vue'

export default {
  render() {
    const tag = this.tag || this.$vnode.data.tag || 'span'
    const children = this.$slots.default || []

    return h(tag, children)
  }
}
