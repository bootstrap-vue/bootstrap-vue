// BTabNav (Private Component, not for public use)
// Used by helper component BTabsNavs
import BLink from '../../link/link'

// @vue/component
export default {
  name: 'BTabNav',
  inject: {
    bvTabsNavs: {
      default: false
    }
  },
  props: {
    tab: {
      // Vue instance of b-tab
      // type: Object,
      default: null
    },
    active: {
      // If this tab should be made active
      type: Boolean,
      default: false
    },
    index: {
      // Zero-based index of tab
      type: Number,
      defult: null
    },
    setSize: {
      // Number of b-tab components
      type: Number,
      defult: null
    }
  },
  watch: {
    active(newVal, oldVal) {
      // Set tab to active or not
      if (this.tab) {
        this.tab.localActive = newVal
      }
    }
  },
  created() {
    this.$nextTick(() =>
      if (this.tab) {
        this.tab.localActive = this.active
        this.tab.$on('hook:updated', this.handleUpdate)
      }
    })
  },
  mounted() {
    if (this.tab) {
      // just in case this didnt happen in created()
      // this.tab.localActive = this.active
      this.tab.$on('hook:updated', this.handleUpdate)
    }
  },
  beforeDestroy() {
    if (this.tab) {
      this.tab.$off('hook:updated', this.handleUpdate)
    }
  },
  methods: {
    onClick() {
      if (this.tab && this.bvTabsNavs && !this.tab.disabled) {
        this.bvTabsNavs.setActiveTab(this.tab)
        // Emit a click event on this tab
        this.tab.$emit && this.tab.$emit('click')
      }
    },
    handleUpdate() {
      if (this.tab && this.tab.$slots.title) {
        // Ensure tab button re-renders changes in slot
        this.$forceUpdate()
      }
    }
  },
  render(h) {
    const tab = this.tab
    const disabled = tab && tab.disabled
    const active = this.active || false

    // tab link content
    let $content = h(false)
    if (this.tab) {
      $content = this.tab.$slots.title || this.tab.title
      if ($content === null || $content === undefined) {
        // Fallback to the tab's index number
        $content = String(this.index)
      }
    }

    // The nav-link
    const $link = h(
      BLink,
      {
        staticClass: 'nav-link',
        class: [
          {
            active: active && !disabled,
            disabled: disabled
          },
          this.tab ? this.tab.titleLinkClass : {}
        ],
        props: {
          disabled: disabled,
          // Use the user supplied tab `id`, if provided, as the tab button's `href`
          // TODO: support router hash-based routing (need to add support for seting active
          //       tab based on location HREF in BTabsNav)
          // href: tab && tab.id ? `#${tab.id}` : '#'
          href: '#'
        },
        attrs: {
          role: 'tab',
          // ID must be the same as generated in b-tab for controlled-by
          id: tab && tab.safeId ? tab.safeId('_tab_button_') : null,
          'aria-controls': !disabled && tab && tab.safeId ? tab.safeId() : null,
          'aria-selected': active && !disabled ? 'true' : 'false',
          'aria-posinset': this.index > -1 ? this.index + 1 : null,
          'aria-setsize': this.setSize || null
        },
        on: { click: this.onClick }
      },
      [$content]
    )

    return h(
      'li',
      {
        staticClass: 'nav-item',
        class: [
          {
            active: active && !disabled,
            disabled: disabled
          },
          tab ? tab.titleItemClass : {}
        ]
      },
      [$link]
    )
  }
}
