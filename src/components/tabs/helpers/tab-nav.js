// BTabNav (Private Component, not for public use)
// Used by helper component BTabsNavs

// @vue/component
export default {
  name: 'BTabNav',
  props: {
    tab: {
      // Vue instance of b-tab
      // type: Object,
      default: null
    },
    active: {
      // If this tab should be made active
      type: Boolean,
      default: false,
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
    if (this.tab) {
      this.tab.localActive = this.active
      this.tab.$on('hook:updated', this.doUpdate)
    }
  },
  mounted() {
    if (this.tab) {
      // just in case this didnt happen in created()
      this.tab.$on('hook:updated', this.doUpdate)
    }
  },
  beforeDestroy() {
    if (this.tab) {
      this.tab.$off('hook:updated', this.doUpdate)
    }
  },
  methods: {
    onClick() {
      if (this.tab && this.bvTabs) {
        // This looks up in the tabs array and determines the new index
        // Just in case the indices have changed during render
        this.bvTabs.setActiveTab(this.tab)
      }
    },
    handleUpdate() {
      if (this.tab && this.tab.$slots.title) {
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
    }

    // The nav-link
    const $link = h(
      disabled ? 'span' : BLink,
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
          // These will be ignored by span
          disabled: disabled,
          href: tab && tab.id ? `#${tab.id}` : '#'
        },
        attrs: {
          role: 'tab',
          // ID must be the same as generated in b-tab for controlled-by
          id: tab && tab.safeId ? tab.safeId('_tab_button_'),
          'aria-controls': !disabled && tab && tab.safeId ? tab.safeId() : null,
          'aria-selected': active && !disabled ? 'true' : 'false',
          'aria-posinset': this.index > -1 ? this.index + 1 : null,
          'aria-setsize': this.setSize || null
        },
        on: disabled ? {} : { click: this.onClick }
      },
      [$content]
    )

    return h(
      'li',
      {
        staticClass: 'nav-item',
        class: [
          {
            active: active && !disable,
            disabled: disabled
          },
          tab ? tab.titleItemClass : {}
        ]
      },
      [$link]
    )
  }
}
