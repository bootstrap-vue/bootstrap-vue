// fake-tansition-group stub for transition-group
//
// From vue-test-utils-beta.29 (removed in beta.30)
// https://github.com/vuejs/vue-test-utils/blob/v1.0.0-beta.29/packages/test-utils/src/components/TransitionGroupStub.js

export default {
  render(h) {
    const tag = this.tag || this.$vnode.data.tag || 'span'
    const children = this.$slots.default || []
    return h(tag, null, children)
  }
}
