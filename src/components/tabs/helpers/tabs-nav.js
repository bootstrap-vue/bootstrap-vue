import Vue from '../../../utils/vue'
import normalizeSlotMixin from '../../../mixins/normalize-slot'
import BNav from '../../nav/nav'
import BTabButton from './tab-button'


// --- BTabsNav Private Component ---

// @vue/component
export default Vue.extend({
  name: 'BTabsNav',
  inject: {
    bvTabs: {
      default() /* istanbul ignore next */ {
        return {
          noKeyNav: true
        }
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      default: null
    },
    tabs: {
      type: Array,
      default: null
    },
    value: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {}
  },
  computed: {
    tabInfo() {
      // Used for monitoring additions/removals to the tabs array
      return this.tabs.map(tab => tab._uid)
    }
  },
  watch: {
    tabInfo: {
      immediate: true,
      handler(newTabs, oldTabs) {
        if (!looseEqual(newTabs, oldTabs)) {
          this.updateActiveIndex()
        }
      }
    }
  },
  methods: {
    // Determine the active tab on create and when tabs array chagnes
    updateActiveIndex() {
      tabs = this.tabs

      // Find *last* active non-disabled tab in current tabs
      // We trust tab state over activeTabIndex, in case tabs
      // were added/removed/re-ordered
      let tabIndex = tabs.indexOf(
        tabs
          .slice()
          .reverse()
          .find(tab => tab.localActive && !tab.disabled)
      )

      // Else try activeTabIndex
      if (tabIndex < 0) {
        const activeTabIndex = this.activeTabIndex
        if (activeTabIndex >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(
            tabs
              .slice()
              .reverse()
              .find(notDisabled)
          )
        } else if (tabs[activeTabIndex] && notDisabled(tabs[activeTabIndex])) {
          // Current tab is not disabled
          tabIndex = activeTabIndex
        }
      }

      // Else find *first* non-disabled tab in current tabs
      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled))
      }

      this.activeIndex = Math.max(tabIndex, -1)
    },
    // Activate a tab given a <b-tab> instance
    // Also accessed by <b-tab>
    activateTab(tab) {
      let result = false
      if (tab) {
        const index = this.tabs.indexOf(tab)
        if (!tab.disabled && index > -1) {
          result = true
          this.activeTabIndex = index
        }
      }
      /* istanbul ignore else: should rarely happen */
      if (!result) {
        // Couldn't set tab, so ensure v-model is set to `activeTabIndex`
        this.$emit('input', this.activeTabIndex)
      }
      return result
    },
    // Deactivate a tab given a <b-tab> instance
    // Accessed by <b-tab> indirectly
    deactivateTab(tab) {
      /* istanbul ignore else: should never happen */
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(t => t !== tab).find(notDisabled))
      } else {
        // No tab specified
        return false
      }
    },
    // Emit a click event on a specified <b-tab> component instance
    emitTabClick(tab, evt) {
      if (evt && evt instanceof Event && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt)
      }
    },
    // Tab button Click handler
    clickTab(tab, evt) {
      this.activateTab(tab)
      this.emitTabClick(tab, evt)
    },
    // Move to first non-disabled tab
    firstTab(evt = false) {
      const tab = this.tabs.find(notDisabled)
      if (this.activateTab(tab) && evt) {
        this.focusButton(tab)
        this.emitTabClick(tab, evt)
      }
    },
    // Move to previous non-disabled tab
    previousTab(evt = false) {
      const currentIndex = Math.max(this.activeTabIndex, 0)
      const tab = this.tabs
        .slice(0, currentIndex)
        .reverse()
        .find(notDisabled)
      if (this.activateTab(tab) && evt) {
        this.focusButton(tab)
        this.emitTabClick(tab, evt)
      }
    },
    // Move to next non-disabled tab
    nextTab(evt = false) {
      const currentIndex = Math.max(this.activeTabIndex, -1)
      const tab = this.tabs.slice(currentIndex + 1).find(notDisabled)
      if (this.activateTab(tab) && evt) {
        this.focusButton(tab)
        this.emitTabClick(tab, evt)
      }
    },
    // Move to last non-disabled tab
    lastTab(evt = false) {
      const tab = this.tabs
        .slice()
        .reverse()
        .find(notDisabled)
      if (this.activateTab(tab) && evt) {
        this.focusButton(tab)
        this.emitTabClick(tab, evt)
      }
    },
    // Focus a tab button given it's <b-tab> instance
    focusButton(tab) {
      // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(() => {
        const button = [this.$refs.buttons || [])[this.tabs.indexOf(tab)]
        if (button && button.focus) {
          button.focus()
        }
      })
    }
  },
  render(h) {
    const tabs = this.tabs
    const activeTab = this.activeTab
    const bvTabs = this.bvTabs

    // Generate the buttons
    const $buttons = tabs.map((tab, idx) => {
      return h(
        BTabButton,
        {
          key: tab._uid || idx,
          ref: 'buttons',
          // Needed to make `this.$refs.buttons` an array
          refInFor: true,
          props: {
            tab: tab,
            id: tab.safeId(`_BV_tab_button_`),
            active: tab === activeTab,
            controls: tab.safeId(),
            setSize: tabs.length,
            posInSet: idx + 1
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
        }
      )
    })

    // Generate the BNav
    let $nav = h(
      BNav,
      {
        class: bvTabs.localNavClass,
        attrs: {
          role: 'tablist',
          id: this.id || null
        },
        props: {
          fill: bvTabs.fill,
          justified: bvTabs.justified,
          align: bvTabs.align,
          tabs: !bvTabs.noNavStyle && !bvTabs.pills,
          pills: !bvTabs.noNavStyle && bvTabs.pills,
          vertical: bvTabs.vertical,
          small: bvTabs.small
        }
      },
      [$buttons, this.normalizeSlot('default', {}), this.normalizeSlot('tabs', {})]
    )

    // Return the Nav wrapped in a div
    return h(
      'div',
      {
        key: 'bv-tabs-nav',
        class: [
          {
            'card-header': bvTabs.card && !bvTabs.vertical && !(bvTabs.end || bvTabs.bottom),
            'card-footer': bvTabs.card && !bvTabs.vertical && (bvTabs.end || bvTabs.bottom),
            'col-auto': bvTabs.vertical
          },
          bvTabs.navWrapperClass
        ]
      },
      [$nav]
    )
  }
})
