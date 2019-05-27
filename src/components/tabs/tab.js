import Vue from '../../utils/vue'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BVTransition from '../../utils/bv-transition'
import warn from '../../utils/warn'

const DEPRECATED_MSG = 'Setting prop "href" is deprecated. Use the <b-nav> component instead.'

// @vue/component
export default Vue.extend({
  name: 'BTab',
  mixins: [idMixin, normalizeSlotMixin],
  inject: {
    bvTabs: {
      default() {
        return {
          // Don't set a tab index if not rendered inside <b-tabs>
          noKeyNav: true
        }
      }
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
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.js and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.js and added to nav 'a.nav-link'
      type: [String, Array, Object],
      default: null
    },
    headHtml: {
      // Is this actually ever used?
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    href: {
      // This should be deprecated, as tabs are not navigation (URL) based
      // <b-nav> + <b-card> + <router-view>/<nuxt-child> should be used instead
      // We don't support router-links here
      type: String,
      default: '#',
      // `deprecated` -> Don't use this prop
      // `deprecation` -> Refers to a change in prop usage
      deprecated: DEPRECATED_MSG
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
    _isTab() {
      // For parent sniffing of child
      return true
    }
  },
  watch: {
    localActive(newVal, oldVal) {
      // Make 'active' prop work with `.sync` modifier
      this.$emit('update:active', newVal)
    },
    active(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal) {
          // If activated post mount
          this.activate()
        } else {
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate
            this.$emit('update:active', this.localActive)
          }
        }
      }
    },
    disabled(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && this.localActive && this.bvTabs.firstTab) {
          this.localActive = false
          this.bvTabs.firstTab()
        }
      }
    }
  },
  mounted() {
    // Inform b-tabs of our presence
    this.registerTab()
    // Initially show on mount if active and not disabled
    this.show = this.localActive
    // Deprecate use of `href` prop
    if (this.href && this.href !== '#') {
      /* istanbul ignore next */
      warn(`b-tab: ${DEPRECATED_MSG}`)
    }
  },
  updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    if (this.hasNormalizedSlot('title') && this.bvTabs.updateButton) {
      this.bvTabs.updateButton(this)
    }
  },
  destroyed() {
    // inform b-tabs of our departure
    this.unregisterTab()
  },
  methods: {
    // Private methods
    registerTab() {
      // Inform `b-tabs` of our presence
      this.bvTabs.registerTab && this.bvTabs.registerTab(this)
    },
    unregisterTab() {
      // Inform `b-tabs` of our departure
      this.bvTabs.unregisterTab && this.bvTabs.unregisterTab(this)
    },
    // Public methods
    activate() {
      if (this.bvTabs.activateTab && !this.disabled) {
        return this.bvTabs.activateTab(this)
      } else {
        // Not inside a <b-tabs> component or tab is disabled
        return false
      }
    },
    deactivate() {
      if (this.bvTabs.deactivateTab && this.localActive) {
        return this.bvTabs.deactivateTab(this)
      } else {
        // Not inside a <b-tabs> component or not active to begin with
        return false
      }
    }
  },
  render(h) {
    let content = h(
      this.tag,
      {
        ref: 'panel',
        staticClass: 'tab-pane',
        class: this.tabClasses,
        directives: [
          {
            name: 'show',
            rawName: 'v-show',
            value: this.localActive,
            expression: 'localActive'
          }
        ],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          tabindex: this.localActive && !this.bvTabs.noKeyNav ? '-1' : null,
          'aria-hidden': this.localActive ? 'false' : 'true',
          'aria-labelledby': this.controlledBy || null
        }
      },
      // Render content lazily if requested
      [this.localActive || !this.computedLazy ? this.normalizeSlot('default') : h(false)]
    )
    return h(BVTransition, { props: { mode: 'out-in', noFade: this.computedNoFade } }, [content])
  }
})
