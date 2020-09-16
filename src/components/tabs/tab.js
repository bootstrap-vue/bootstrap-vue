import { NAME_TAB } from '../../constants/components'
import { SLOT_NAME_TITLE } from '../../constants/slot-names'
import Vue from '../../utils/vue'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BVTransition from '../../utils/bv-transition'

// @vue/component
export const BTab = /*#__PURE__*/ Vue.extend({
  name: NAME_TAB,
  mixins: [idMixin, normalizeSlotMixin],
  inject: {
    bvTabs: {
      default: () => ({})
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String
      // default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by `<b-tabs>` and added to nav `li.nav-item`
      type: [String, Array, Object]
      // default: null
    },
    titleLinkClass: {
      // Sniffed by `<b-tabs>` and added to nav `a.nav-link`
      type: [String, Array, Object]
      // default: null
    },
    titleLinkAttributes: {
      type: Object
      // default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localActive: this.active && !this.disabled,
      show: false
    }
  },
  computed: {
    tabClasses() {
      return [
        {
          active: this.localActive,
          disabled: this.disabled,
          'card-body': this.bvTabs.card && !this.noBody
        },
        // Apply <b-tabs> `activeTabClass` styles when this tab is active
        this.localActive ? this.bvTabs.activeTabClass : null
      ]
    },
    controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__')
    },
    computedNoFade() {
      return !(this.bvTabs.fade || false)
    },
    computedLazy() {
      return this.bvTabs.lazy || this.lazy
    },
    // For parent sniffing of child
    _isTab() {
      return true
    }
  },
  watch: {
    localActive(newValue) {
      // Make `active` prop work with `.sync` modifier
      this.$emit('update:active', newValue)
    },
    active(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          // If activated post mount
          this.activate()
        } else {
          /* istanbul ignore next */
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate
            this.$emit('update:active', this.localActive)
          }
        }
      }
    },
    disabled(newValue, oldValue) {
      if (newValue !== oldValue) {
        const { firstTab } = this.bvTabs
        if (newValue && this.localActive && firstTab) {
          this.localActive = false
          firstTab()
        }
      }
    }
  },
  mounted() {
    // Inform b-tabs of our presence
    this.registerTab()
    // Initially show on mount if active and not disabled
    this.show = this.localActive
  },
  updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    const { updateButton } = this.bvTabs
    if (updateButton && this.hasNormalizedSlot(SLOT_NAME_TITLE)) {
      updateButton(this)
    }
  },
  destroyed() {
    // inform b-tabs of our departure
    this.unregisterTab()
  },
  methods: {
    // Private methods
    registerTab() {
      // Inform `<b-tabs>` of our presence
      const { registerTab } = this.bvTabs
      if (registerTab) {
        registerTab(this)
      }
    },
    unregisterTab() {
      // Inform `<b-tabs>` of our departure
      const { unregisterTab } = this.bvTabs
      if (unregisterTab) {
        unregisterTab(this)
      }
    },
    // Public methods
    activate() {
      // Not inside a `<b-tabs>` component or tab is disabled
      const { activateTab } = this.bvTabs
      return activateTab && !this.disabled ? activateTab(this) : false
    },
    deactivate() {
      // Not inside a `<b-tabs>` component or not active to begin with
      const { deactivateTab } = this.bvTabs
      return deactivateTab && this.localActive ? deactivateTab(this) : false
    }
  },
  render(h) {
    const { localActive } = this

    const $content = h(
      this.tag,
      {
        ref: 'panel',
        staticClass: 'tab-pane',
        class: this.tabClasses,
        directives: [
          {
            name: 'show',
            rawName: 'v-show',
            value: localActive,
            expression: 'localActive'
          }
        ],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          'aria-hidden': localActive ? 'false' : 'true',
          'aria-labelledby': this.controlledBy || null
        }
      },
      // Render content lazily if requested
      [localActive || !this.computedLazy ? this.normalizeSlot() : h()]
    )
    return h(BVTransition, { props: { mode: 'out-in', noFade: this.computedNoFade } }, [$content])
  }
})
