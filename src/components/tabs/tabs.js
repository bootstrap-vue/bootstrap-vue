import BLink from '../link/link'
import KeyCodes from '../../utils/key-codes'
import observeDom from '../../utils/observe-dom'
import idMixin from '../../mixins/id'

// Private Helper component
const BTabButtonHelper = {
  name: 'BTabButtonHelper',
  props: {
    content: { type: [String, Array], default: '' },
    href: { type: String, default: '#' }, // To be deprecated
    posInSet: { type: Number, default: null },
    setSize: { type: Number, default: null },
    controls: { type: String, default: null },
    id: { type: String, default: null },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    linkClass: { default: null },
    itemClass: { default: null },
    noKeyNav: { type: Boolean, default: false }
  },
  render (h) {
    const link = h(
      BLink,
      {
        ref: 'link',
        staticClass: 'nav-link',
        class: [
          { active: this.active, disabled: this.disabled },
          this.linkClass
        ],
        props: {
          href: this.href, // To be deprecated to always be '#'
          disabled: this.disabled
        },
        attrs: {
          role: 'tab',
          id: this.id,
          // Roving tab index when keynav enabled
          tabindex: this.noKeyNav ? null : (this.active ? '0' : '-1'),
          'aria-selected': this.active ? 'true' : 'false',
          'aria-setsize': this.setSize,
          'aria-posinset': this.posInSet,
          'aria-controls': this.controls
        },
        on: {
          click: this.handleClick,
          keydown: this.handleClick
        }
      },
      this.$slots.default || this.content
    )
    return h(
      'li',
      { class: ['nav-item', this.itemClass], attrs: { role: 'presentation' } },
      [link]
    )
  },
  methods: {
    focus () {
      if (this.$refs.link && this.refs.link.focus) {
        this.$refs.link.focus()
      }
    },
    handleClick (evt) {
      function stop () {
        evt.preventDefault()
        evt.stopPropagation()
      }
      if (this.disabled) {
        return
      }
      if (
        evt.type === 'click' ||
        (!this.noKeyNav && evt.type === 'keydown' && evt.keyCode === KeyCodes.SPACE)
      ) {
        stop()
        this.$emit('click', evt)
      } else if (evt.type === 'keydown' && !this.noKeyNav) {
        // for keyboard navigation
        this.$emit('keydown', evt)
      }
    }
  }
}

// @vue/component
export default {
  name: 'BTabs',
  mixins: [idMixin],
  provide () {
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
    value: {
      type: Number,
      default: null
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
    }
  },
  data () {
    return {
      // Index of current tab
      currentTab: parseInt(this.value, 10) || -1,
      // Array of direct child b-tab instances
      tabs: []
    }
  },
  computed: {
    fade () {
      // This computed prop is sniffed by the tab child
      return !this.noFade
    },
    navStyle () {
      return this.pills ? 'pills' : 'tabs'
    }
  },
  watch: {
    currentTab (val, old) {
      if (val === old) {
        return
      }
      // Ensure only one tab is active
      this.tabs.forEach((tab, idx) => {
        tab.localActive = val === idx && !tab.disabled
      })
      this.$emit('input', val)
    },
    value (val, old) {
      if (val === old) {
        return
      }
      val = parseInt(val, 10)
      const tabs = this.tabs
      const currentIndex = this.currentTab
      if (tabs[val] && !tabs[val].disabled) {
        this.currentTab = val
      } else if (tabs[currentIndex] && !tabs[currentIndex].disabled) {
        // Stick with current tab, so update-v-model
        this.$emit('input', this.currentTab)
      } else {
        // Tab not available
        this.currentTab = -1
      }
    }
  },
  created () {
    // For SSR and to make sure only a single tab is shown on mount
    this.updateTabs()
  },
  mounted () {
    // In case tabs have changed before mount
    this.updateTabs()
    // Observe Child changes so we can notify tabs change
    observeDom(this.$refs.tabsContainer, this.updateTabs.bind(this), {
      subtree: false
    })
  },
  methods: {
    // Update list of b-tab children
    updateTabs () {
      // Probe tabs
      const tabs = (this.$slots.default || [])
        .map(vnode => vnode.componentInstance)
        .filter(tab => tab && tab._isTab)

      // Find *last* active non-disabled tab in current tabs
      // We trust tab state over currentTab, in case tabs were added/removed/re-ordered
      let tabIndex = tabs.indexOf(tabs.slice().reverse().find(tab => tab.localActive && !tab.disabled))

      // Else try setting to currentTab
      if (tabIndex < 0) {
        const currentTab = this.currentTab
        if (currentTab >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(tabs.slice().reverse().find(tab => !tab.disabled))
        } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
          // current tab is not disabled
          tabIndex = currentTab
        }
      }

      // Else find *first* non-disabled tab in current tabs
      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(tab => !tabs.disabled))
      }

      // Set the current tab state to active
      tabs.forEach((tab, idx) => {
        tab.localActive = idx === tabIndex && !tab.disabled
      })

      // update the array of tab children
      this.tabs = tabs
      // Set teh currentTab index (can be -1 if no non-disabled tabs)
      this.currentTab = tabIndex
    },
    // Force a button to re-render it's content, given a b-tab instance
    // Called by b-tab on update()
    updateButton (tab) {
      const index = this.tabs.indexOf(tab)
      const button = this.$refs.buttons[index]
      if (button) {
        button.$forceUpdate()
      }
    },
    focusButton (index) {
      // Focus a tab button given it's index
      const button = this.$refs.buttons[index]
      if (button && button.focus) {
        button.focus()
      }
    },
    // handle keyboard navigation
    onKeynav (evt) {
      if (!this.nokeyNav) {
        return
      }
      const key = evt.keyCode
      const shift = evt.shiftKey
      function stop () {
        evt.preventDefault()
        evt.stopPropagation()
      }
      if (key === KeyCodes.UP || key === KeyCodes.LEFT || key === KeyCodes.HOME) {
        stop()
        if (shift || key === KeyCodes.HOME) {
          this.firstTab(true)
        } else {
          this.previousTab(true)
        }
      } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT || key === KeyCodes.END) {
        stop()
        if (shift || key === KeyCodes.END) {
          this.lastTab(true)
        } else {
          this.nextTab(true)
        }
      }
    },
    // Move to first non-disabled tab
    firstTab (focus) {
      const tabs = this.tabs
      const index = tabs.indexOf(tabs.find(tab => !tab.disabled))
      this.currentTab = index
      if (focus) {
        this.focusButton(index)
      }
    },
    // Move to previous non-disabled tab
    previousTab (focus) {
      const currentIndex = Math.max(this.currentTab, 0)
      const tabs = this.tabs.slice(0, currentIndex)
      const index = tabs.lastIndexOf(tabs.find(tab => !tab.disabled))
      if (index > -1) {
        this.currentTab = currentIndex - 1 - index
        if (focus) {
          this.focusButton(index)
        }
      }
    },
    // Move to next non-disabled tab
    nextTab (focus) {
      const currentIndex = Math.max(this.currentTab, -1)
      const tabs = this.tabs
      const index = tabs.indexOf(tabs.slice(currentIndex + 1).find(tab => !tab.disabled))
      if (index > -1) {
        this.currentTab = index
        if (focus) {
          this.focusButton(index)
        }
      }
    },
    // Move to last non-disabled tab
    lastTab (focus) {
      const tabs = this.tabs
      const index = tabs.indexOf(tabs.slice().reverse().find(tab => !tab.disabled))
      this.currentTab = index
      if (focus) {
        this.focusButton(index)
      }
    }
  },
  render (h) {
    const tabs = this.tabs
    // Navigation 'buttons'
    const buttons = tabs.map((tab, index) => {
      const buttonId = tab.controlledBy || this.safeId(`_BV_tab_${index + 1}_`)
      return h(
        BTabButtonHelper,
        {
          key: buttonId || index,
          ref: 'buttons',
          props: {
            href: tab.href, // To be deprecated to be always '#'
            id: buttonId,
            active: tab.localActive && !tab.disabled,
            disabled: tab.disabled,
            setSize: tabs.length,
            posInSet: index + 1,
            controls: this.safeId('_BV_tab_container_'),
            linkClass: tab.titleLinkClass,
            itemClass: tab.titleItemClass,
            noKeyNav: this.noKeyNav
          },
          on: {
            click: evt => {
              this.currentTab = index
            },
            keydown: evt => {
              if (!this.noKeyNav && !tab.disabled) {
                this.onKeynav(evt)
              }
            }
          }
        },
        [tab.$slots.title || tab.title]
      )
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
        class: { row: this.vertical, 'no-gutters': this.vertical && this.card },
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
