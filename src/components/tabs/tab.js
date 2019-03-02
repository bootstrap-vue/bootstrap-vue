import idMixin from '../../mixins/id'
import { requestAF } from '../../utils/dom'

// @vue/component
export default {
  name: 'BTab',
  mixins: [idMixin],
  inject: {
    bvTabs: {
      default() {
        return {
          // Don't set a tab index if not rendered inside `<b-tabs>`
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
      // And we dont support router-links here
      type: String,
      default: '#'
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
        this.bvTabs.card && !this.noBody ? 'card-body' : '',
        this.show ? 'show' : '',
        this.computedFade ? 'fade' : '',
        this.disabled ? 'disabled' : '',
        this.localActive ? 'active' : ''
      ]
    },
    controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__')
    },
    computedFade() {
      return this.bvTabs.fade || false
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
            // Deactivation will fail if no other tabs to activate.
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
    // Initially show on mount if active and not disabled
    this.show = this.localActive
  },
  updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    if (this.$slots.title && this.bvTabs.updateButton) {
      this.bvTabs.updateButton(this)
    }
  },
  methods: {
    // Transition handlers
    beforeEnter() {
      // change opacity (add 'show' class) 1 frame after display
      // otherwise css transition won't happen
      requestAF(() => {
        this.show = true
      })
    },
    beforeLeave() {
      // Remove the 'show' class
      this.show = false
    },
    // Public methods
    activate() {
      if (this.bvTabs.activateTab && !this.disabled) {
        return this.bvTabs.activateTab(this)
      } else {
        // Not inside a b-tabs component or tab is disabled
        return false
      }
    },
    deactivate() {
      if (this.bvTabs.deactivateTab && this.localActive) {
        return this.bvTabs.deactivateTab(this)
      } else {
        // Not inside a b-tabs component or not active to begin with
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
          // TODO: convert to style object in render
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
          tabindex: this.localActive && !this.bvTabs.noKeyNav ? '0' : null,
          'aria-hidden': this.localActive ? 'false' : 'true',
          'aria-expanded': this.localActive ? 'true' : 'false',
          'aria-labelledby': this.controlledBy || null
        }
      },
      // Render content lazily if requested
      [this.localActive || !this.computedLazy ? this.$slots.default : h(false)]
    )
    return h(
      'transition',
      {
        props: {
          mode: 'out-in',
          // Disable use of built-in transition classes
          'enter-class': '',
          'enter-active-class': '',
          'enter-to-class': '',
          'leave-class': '',
          'leave-active-class': '',
          'leave-to-class': ''
        },
        on: {
          beforeEnter: this.beforeEnter,
          beforeLeave: this.beforeLeave
        }
      },
      [content]
    )
  }
}
