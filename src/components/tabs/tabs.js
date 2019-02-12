import BLink from '../link/link'
import KeyCodes from '../../utils/key-codes'
import observeDom from '../../utils/observe-dom'
import idMixin from '../../mixins/id'

// Private Helper component
const BTabButtonHelper = {
  name: 'BTabButtonHelper',
  props: {
    // Reference to the child b-tab instance
    tab: { default: null, required: true },
    id: { type: String, default: null },
    controls: { type: String, default: null },
    tabIndex: { type: Number, default: null },
    posInSet: { type: Number, default: null },
    setSize: { type: Number, default: null },
    noKeyNav: { type: Boolean, default: false }
  },
  methods: {
    focus() {
      if (this.$refs && this.$refs.link && this.$refs.link.focus) {
        this.$refs.link.focus()
      }
    },
    handleEvt(evt) {
      function stop() {
        evt.preventDefault()
        evt.stopPropagation()
      }
      if (this.tab.disabled) {
        return
      }
      const type = evt.type
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (type === 'click') {
        stop()
        this.$emit('click', evt) // Could call this.tab.activate() instead
      } else if (type === 'keydown' && !this.noKeyNav && key === KeyCodes.SPACE) {
        // In keyNav mode, SAPCE press will also trigger a click/select
        stop()
        this.$emit('click', evt) // Could call this.tab.activate() instead
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if (key === KeyCodes.UP || key === KeyCodes.LEFT || key === KeyCodes.HOME) {
          stop()
          if (shift || key === KeyCodes.HOME) {
            this.$emit('first', evt)
          } else {
            this.$emit('prev', evt)
          }
        } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT || key === KeyCodes.END) {
          stop()
          if (shift || key === KeyCodes.END) {
            this.$emit('last', evt)
          } else {
            this.$emit('next', evt)
          }
        }
      }
    }
  },
  render(h) {
    const link = h(
      BLink,
      {
        ref: 'link',
        staticClass: 'nav-link',
        class: [
          {
            active: this.tab.localActive && !this.tab.disabled,
            disabled: this.tab.disabled
          },
          this.tab.titleLinkClass
        ],
        props: {
          href: this.tab.href, // To be deprecated to always be '#'
          disabled: this.tab.disabled
        },
        attrs: {
          role: 'tab',
          id: this.id,
          // Roving tab index when keynav enabled
          tabindex: this.tabIndex,
          'aria-selected': this.tab.localActive && !this.tab.disabled ? 'true' : 'false',
          'aria-setsize': this.setSize,
          'aria-posinset': this.posInSet,
          'aria-controls': this.controls
        },
        on: {
          click: this.handleEvt,
          keydown: this.handleEvt
        }
      },
      [this.tab.$slots.title || this.tab.title]
    )
    return h(
      'li',
      {
        staticClass: 'nav-item',
        class: [this.tab.titleItemClass],
        attrs: { role: 'presentation' }
      },
      [link]
    )
  }
}

// Filter function to filter out disabled tabs
function notDisabled(tab) {
  return !tab.disabled
}

// @vue/component
export default {
  name: 'BTabs',
  mixins: [idMixin],
  provide() {
    return { bTabs: this }
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    card: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    pills: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noNavStyle: {
      type: Boolean,
      default: false
    },
    noKeyNav: {
      type: Boolean,
      default: false
    },
    lazy: {
      // This prop is sniffed by the tab child
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    navClass: {
      type: [String, Array, Object],
      default: null
    },
    navWrapperClass: {
      type: [String, Array, Object],
      default: null
    },
    value: {
      // v-model
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // Index of current tab
      currentTab: parseInt(this.value, 10) || -1,
      // Array of direct child b-tab instances
      tabs: []
    }
  },
  computed: {
    fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade
    },
    navStyle() {
      return this.pills ? 'pills' : 'tabs'
    }
  },
  watch: {
    currentTab(val, old) {
      let index = -1
      // Ensure only one tab is active at most
      this.tabs.forEach((tab, idx) => {
        if (val === idx && !tab.disabled) {
          tab.localActive = true
          index = idx
        } else {
          tab.localActive = false
        }
      })
      // update the v-model
      this.$emit('input', index)
    },
    value(val, old) {
      if (val !== old) {
        val = parseInt(val, 10)
        old = parseInt(old, 10) || 0
        const tabs = this.tabs
        if (tabs[val] && !tabs[val].disabled) {
          this.currentTab = val
        } else {
          // Try next or prev tabs
          if (val < old) {
            this.previousTab()
          } else {
            this.nextTab()
          }
        }
      }
    }
  },
  created() {
    // For SSR and to make sure only a single tab is shown on mount
    this.updateTabs()
  },
  mounted() {
    // In case tabs have changed before mount
    this.updateTabs()
    // Observe Child changes so we can update list of tabs
    observeDom(this.$refs.tabsContainer, this.updateTabs.bind(this), {
      subtree: false
    })
  },
  methods: {
    // Update list of b-tab children
    updateTabs() {
      // Probe tabs
      const tabs = (this.$slots.default || [])
        .map(vnode => vnode.componentInstance)
        .filter(tab => tab && tab._isTab)

      // Find *last* active non-disabled tab in current tabs
      // We trust tab state over currentTab, in case tabs were added/removed/re-ordered
      let tabIndex = tabs.indexOf(
        tabs
          .slice()
          .reverse()
          .find(tab => tab.localActive && !tab.disabled)
      )

      // Else try setting to currentTab
      if (tabIndex < 0) {
        const currentTab = this.currentTab
        if (currentTab >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(
            tabs
              .slice()
              .reverse()
              .find(notDisabled)
          )
        } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
          // current tab is not disabled
          tabIndex = currentTab
        }
      }

      // Else find *first* non-disabled tab in current tabs
      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled))
      }

      // Set the current tab state to active
      tabs.forEach((tab, idx) => {
        tab.localActive = idx === tabIndex && !tab.disabled
      })

      // Update the array of tab children
      this.tabs = tabs
      // Set the currentTab index (can be -1 if no non-disabled tabs)
      this.currentTab = tabIndex
    },
    // Find a button taht controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab(tab) {
      return (this.$refs.buttons || []).find(btn => btn.tab === tab)
    },
    // Force a button to re-render it's content, given a b-tab instance
    // Called by b-tab on update()
    updateButton(tab) {
      const button = this.getButtonForTab(tab)
      if (button && button.$forceUpdate) {
        button.$forceUpdate()
      }
    },
    // Activate a tab given a b-tab instance
    // Also accessed by b-tab
    activateTab(tab) {
      let result = false
      if (tab) {
        const index = this.tabs.indexOf(tab)
        if (!tab.disabled && index > -1) {
          result = true
          this.currentTab = index
        }
      }
      this.$emit('input', this.currentTab)
      return result
    },
    // Deactivate a tab given a b-tab instance
    // Accessed by b-tab
    deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no available tabs, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(t => t !== tab).find(notDisabled))
      } else {
        // No tab specified
        return false
      }
    },
    // Focus a tab button given it's b-tab instance
    focusButton(tab) {
      // Wrap in nextTick to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(() => {
        const button = this.getButtonForTab(tab)
        if (button && button.focus) {
          button.focus()
        }
      })
    },
    // Emit a click event on a specified b-tab component instance
    emitTabClick(tab, evt) {
      if (evt && evt instanceof Event && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt)
      }
    },
    // Click Handler
    clickTab(tab, evt) {
      this.activateTab(tab)
      this.emitTabClick(tab, evt)
    },
    // Move to first non-disabled tab
    firstTab(focus) {
      const tab = this.tabs.find(notDisabled)
      if (this.activateTab(tab) && focus) {
        this.focusButton(tab)
        this.emitTabClick(tab, focus)
      }
    },
    // Move to previous non-disabled tab
    previousTab(focus) {
      const currentIndex = Math.max(this.currentTab, 0)
      const tab = this.tabs
        .slice(0, currentIndex)
        .reverse()
        .find(notDisabled)
      if (this.activateTab(tab) && focus) {
        this.focusButton(tab)
        this.emitTabClick(tab, focus)
      }
    },
    // Move to next non-disabled tab
    nextTab(focus) {
      const currentIndex = Math.max(this.currentTab, -1)
      const tab = this.tabs.slice(currentIndex + 1).find(notDisabled)
      if (this.activateTab(tab) && focus) {
        this.focusButton(tab)
        this.emitTabClick(tab, focus)
      }
    },
    // Move to last non-disabled tab
    lastTab(focus) {
      const tab = this.tabs
        .slice()
        .reverse()
        .find(notDisabled)
      if (this.activateTab(tab) && focus) {
        this.focusButton(tab)
        this.emitTabClick(tab, focus)
      }
    }
  },
  render(h) {
    const tabs = this.tabs
    // Currently active tab
    let activeTab = tabs.find(tab => tab.localActive && !tab.disabled)
    // Tab button to allow focusing when no actgive tab found (keynav only)
    const fallbackTab = tabs.find(tab => !tab.disabled)

    // For each b-tab found create teh tab buttons
    const buttons = tabs.map((tab, index) => {
      const buttonId = tab.controlledBy || this.safeId(`_BV_tab_${index + 1}_`)
      let tabIndex = null
      // Ensure at least one tab button is focusable when keynav enabled (if possible)
      if (!this.noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1
        if (activeTab === tab || (!activeTab && fallbackTab === tab)) {
          // Place tab button in tab sequence
          tabIndex = null
        }
      }
      return h(BTabButtonHelper, {
        key: tab._uid || buttonId || index,
        ref: 'buttons',
        // Needed to make this.$refs.buttons an array
        refInFor: true,
        props: {
          tab: tab,
          id: buttonId,
          controls: this.safeId('_BV_tab_container_'),
          tabIndex,
          setSize: tabs.length,
          posInSet: index + 1,
          noKeyNav: this.noKeyNav
        },
        on: {
          click: evt => {
            this.clickTab(tab, evt)
          },
          first: this.firstTab,
          prev: this.previousTab,
          next: this.nextTab,
          last: this.lastTab
        }
      })
    })

    // Nav 'button' wrapper
    let navs = h(
      'ul',
      {
        class: [
          'nav',
          {
            [`nav-${this.navStyle}`]: !this.noNavStyle,
            [`card-header-${this.navStyle}`]: this.card && !this.vertical,
            'card-header': this.card && this.vertical,
            'h-100': this.card && this.vertical,
            'flex-column': this.vertical,
            'border-bottom-0': this.vertical,
            'rounded-0': this.vertical,
            small: this.small
          },
          this.navClass
        ],
        attrs: {
          role: 'tablist',
          id: this.safeId('_BV_tab_controls_')
        }
      },
      [buttons, this.$slots.tabs]
    )
    navs = h(
      'div',
      {
        class: [
          {
            'card-header': this.card && !this.vertical && !(this.end || this.bottom),
            'card-footer': this.card && !this.vertical && (this.end || this.bottom),
            'col-auto': this.vertical
          },
          this.navWrapperClass
        ]
      },
      [navs]
    )

    let empty
    if (tabs && tabs.length) {
      empty = h(false)
    } else {
      empty = h(
        'div',
        { key: 'empty-tab', class: ['tab-pane', 'active', { 'card-body': this.card }] },
        this.$slots.empty
      )
    }

    // Main content section
    const content = h(
      'div',
      {
        ref: 'tabsContainer',
        staticClass: 'tab-content',
        class: [{ col: this.vertical }, this.contentClass],
        attrs: { id: this.safeId('_BV_tab_container_') }
      },
      [this.$slots.default, empty]
    )

    // Render final output
    return h(
      this.tag,
      {
        staticClass: 'tabs',
        class: {
          row: this.vertical,
          'no-gutters': this.vertical && this.card
        },
        attrs: { id: this.safeId() }
      },
      [
        this.end || this.bottom ? content : h(false),
        [navs],
        this.end || this.bottom ? h(false) : content
      ]
    )
  }
}
