import Vue from '../vue'
import { NAME_TRANSPORTER_SINGLE, NAME_TRANSPORTER_TARGET_SINGLE } from '../constants/components'
import identity from './identity'
import { concat } from './array'
import { removeNode, select } from './dom'
import { isBrowser } from './env'
import { isFunction, isString } from './inspect'
import { HTMLElement } from './safe-types'
import normalizeSlotMixin from '../mixins/normalize-slot'

// BTransporterSingle/BTransporterTargetSingle:
//
// Single root node portaling of content, which retains parent/child hierarchy
// Unlike Portal-Vue where portaled content is no longer a descendent of its
// intended parent components
//
// Private components for use by Tooltips, Popovers and Modals
//
// Based on vue-simple-portal
// https://github.com/LinusBorg/vue-simple-portal

// Transporter target used by BTransporterSingle
// Supports only a single root element
// @vue/component
const BTransporterTargetSingle = /*#__PURE__*/ Vue.extend({
  // As an abstract component, it doesn't appear in the $parent chain of
  // components, which means the next parent of any component rendered inside
  // of this one will be the parent from which is was portal'd
  abstract: true,
  name: NAME_TRANSPORTER_TARGET_SINGLE,
  props: {
    nodes: {
      // Even though we only support a single root element,
      // VNodes are always passed as an array
      type: [Array, Function]
      // default: undefined
    }
  },
  data: vm => {
    return {
      updatedNodes: vm.nodes
    }
  },
  destroyed() {
    removeNode(this.$el)
  },
  render(h) {
    let nodes = isFunction(this.updatedNodes) ? this.updatedNodes({}) : this.updatedNodes
    nodes = concat(nodes).filter(Boolean)
    /* istanbul ignore else */
    if (nodes && nodes.length > 0 && !nodes[0].text) {
      return nodes[0]
    } else {
      /* istanbul ignore next */
      return h()
    }
  }
})

// This component has no root element, so only a single VNode is allowed
// @vue/component
export const BTransporterSingle = /*#__PURE__*/ Vue.extend({
  name: NAME_TRANSPORTER_SINGLE,
  mixins: [normalizeSlotMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    container: {
      // String: CSS selector,
      // HTMLElement: Element reference
      // Mainly needed for tooltips/popovers inside modals
      type: [String, HTMLElement],
      default: 'body'
    },
    tag: {
      // This should be set to match the root element type
      type: String,
      default: 'div'
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler(disabled) {
        disabled ? this.unmountTarget() : this.$nextTick(this.mountTarget)
      }
    }
  },
  created() {
    // Create private non-reactive props
    this.$_defaultFn = null
    this.$_target = null
  },
  beforeMount() {
    this.mountTarget()
  },
  updated() {
    // We need to make sure that all children have completed updating
    // before rendering in the target
    // `vue-simple-portal` has the this in a `$nextTick()`,
    // while `portal-vue` doesn't
    // Just trying to see if the `$nextTick()` delay is required or not
    // Since all slots in Vue 2.6.x are always functions
    this.updateTarget()
  },
  beforeDestroy() {
    this.unmountTarget()
    this.$_defaultFn = null
  },
  methods: {
    // Get the element which the target should be appended to
    getContainer() {
      /* istanbul ignore else */
      if (isBrowser) {
        const container = this.container
        return isString(container) ? select(container) : container
      } else {
        return null
      }
    },
    // Mount the target
    mountTarget() {
      if (!this.$_target) {
        const container = this.getContainer()
        if (container) {
          const el = document.createElement('div')
          container.appendChild(el)
          this.$_target = new BTransporterTargetSingle({
            el,
            parent: this,
            propsData: {
              // Initial nodes to be rendered
              nodes: concat(this.normalizeSlot())
            }
          })
        }
      }
    },
    // Update the content of the target
    updateTarget() {
      if (isBrowser && this.$_target) {
        const defaultFn = this.$scopedSlots.default
        if (!this.disabled) {
          /* istanbul ignore else: only applicable in Vue 2.5.x */
          if (defaultFn && this.$_defaultFn !== defaultFn) {
            // We only update the target component if the scoped slot
            // function is a fresh one. The new slot syntax (since Vue 2.6)
            // can cache unchanged slot functions and we want to respect that here
            this.$_target.updatedNodes = defaultFn
          } else if (!defaultFn) {
            // We also need to be back compatible with non-scoped default slot (i.e. 2.5.x)
            this.$_target.updatedNodes = this.$slots.default
          }
        }
        // Update the scoped slot function cache
        this.$_defaultFn = defaultFn
      }
    },
    // Unmount the target
    unmountTarget() {
      this.$_target && this.$_target.$destroy()
      this.$_target = null
    }
  },
  render(h) {
    if (this.disabled) {
      const nodes = concat(this.normalizeSlot()).filter(identity)
      if (nodes.length > 0 && !nodes[0].text) {
        return nodes[0]
      }
    }
    return h()
  }
})
