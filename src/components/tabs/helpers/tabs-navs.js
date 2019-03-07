// BTabsNavs (Private Component, not for public use)
// Used by BTabs to maitain source of truth
import BNav from '../../nav/nav'
import BTabNav from './tab-nav'

// Filter function to filter out disabled tabs
function notDisabled(tab) {
  return !tab.disabled
}

// @vue/component
export default {
  name: 'BTabsNavs',
  provide() {
    return {
      bvTabsNavs: this
    }
  },
  inject: {
    bvTabs: {
      default() {
        return {}
      }
    }
  },
  props: {
    tabs: {
      // Array of b-tab instances, in document order
      type: Array,
      default: () => []
    },
    value: {
      // Currently active tab requested by BTabs
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      // Initially set to null so we can trigger
      // an update to the parent
      activeIndex: null
    }
  },
  computed: {
  },
  watch: {
    value(val, old) {
      if (val !== old) {
        const tabs = this.tabs
        if (val >= tabs.length) {
          // handle case where last tab removed
          this.last()
        } else if (tabs[val] && notDisabled(tabs[val])) {
          this.setActiveTab(tabs[val])
        } else {
          // Try next or prev tabs
          if (val < old) {
            this.prev()
          } else {
            this.next()
          }
        }
      }
    },
    activeIndex(val, old) {
      // Update the parent v-model
      // Could do this with $emit('change', val)
      this.bvTabs.activeIndex = val
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.emitChange()
    // })
  },
  mounted() {
    this.$nextTick(() => {
      // We do this in a nextTick to make sure the tabs have been processed
      // first to make sure there is only one tab at max active
      this.emitChange()
    })
  },
  methods: {
    emitChange() {
      const tabs = this.tabs
      this.$emit('change', this.getActiveTabIndex())
    },
    activateTab(tab) {
      this.tabs.forEach((t, idx) => {
        t.localActive = t === tab
      })
      this.emitChange()
    },
    // Called by BTabNav and the following methods
    setActiveTab(tab) {
      if (tab && notDisabled(tab)) {
        this.activateTab(tab)
      } else {
        // Couldn't activate tab, so make sure model is in sync
        this.emitChange()
      }
    },
    // These two methods could be computed props, if reactivity works right
    getActiveTab() {
      return this.tabs.filter(notDisabled).find(t => t.localActive)
    },
    getActiveTabIndex() {
      return this.tabs.indexOf(this.getActiveTab())
    },
    // These methods are used by the scoped slots, and by the parent BTabs component
    first() {
      // Activate the first non-disabled tab
      const tab = this.tabs.find(notDisabled)
      this.setActiveTab(tab)
    },
    prev() {
      // Activate the previous non-disabled tab
      const index = this.getActiveTabIndex()
      const tab = this.tabs
        .slice(0, index)
        .reverse()
        .find(notDisabled)
      this.setActiveTab(tab)
    },
    next() {
      // Activate the next non-disabled tab
      const index = this.getActiveTabIndex()
      const tab = this.tabs.slice(index + 1).find(notDisabled)
      this.setActiveTab(tab)
    },
    last() {
      // Activate the last non-disabled tab
      const tab = this.tabs
        .slice()
        .reverse()
        .find(notDisabled)
      this.setActiveTab(tab)
    },
    computeActiveIndex() {
      const tabs = this.tabs || []

      // look for last tab with localActive set to true
      // Trusting the tab's state first (handy if new tabs are added with `active=true`)
      let tab = tabs
        .slice()
        .reverse()
        .find(t => t.localActive && notDisabled(t))

      // Else try value specified by this.value
      if (!tab) {
        if (this.value >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tab = tabs
            .slice()
            .reverse()
            .find(notDisabled)
        } else if (tabs[this.value] && notDisabled(tabs[this.value])) {
          tab = tabs[this.value]
        }
      }

      // Else find the first non-disabled tab
      if (!tab) {
        tab = tabs.find(notDisabled)
      }

      // Return the index of the tab if found (else returns -1)
      return tabs.indexOf(tab)
    }
  },
  render(h) {
    const bvTabs = this.bvTabs
    const end = bvTabs.end || bvTabs.bottom || false
    const vertical = bvTabs.vertical || false
    const card = bvTabs.card
    // Accepts null, 'tabs', 'pills', 'plain'
    const navType = bvTabs.navType === 'plain' ? null : bvTabs.navType || null

    // Determine which tab **should** be active
    const activeIndex = this.computeActiveIndex()

    // Generate the tab nav items/links
    const $navs = this.tabs.map((tab, idx) => {
      // Create a tab button for each tab instance
      return h(
        BTabNav,
        {
          key: tab._uid || `tab-index-${idx}`,
          props: {
            tab: tab || null,
            index: idx,
            setSize: this.tabs.length,
            // BTabNav will use this prop to set the tab's localActive state
            active: idx === activeIndex
          }
        },
        []
      )
    })

    const $nav = h(
      BNav,
      {
        key: 'b-tabs-nav',
        props: {
          tag: 'ul',
          pills: navType === 'pills',
          tabs: navType === 'tabs',
          fill: bvTabs.navFill,
          justified: bvTabs.navJustified,
          vertical: bvTabs.vertical,
          isNavBar: false
        },
        class: [
          {
            small: bvTabs.small,
            'card-header-pills': card && navType === 'pills' && !vertical,
            'card-header-tabs': card && navType === 'tabs' && !vertical,
            'mx-2': card && vertical,
            'px-1': card && vertical
          },
          bvTabs.navClass || {}
        ],
        attrs: {
          role: 'tablist',
          id: bvTabs.safeId ? bvTabs.safeId('_BV_tab_controls_') : null
        }
      },
      [this.$slots['tabs-start'] || h(false), $navs, this.$slots['tabs-end'] || h(false)]
    )

    // Optional slot for header content. Most applicable in card mode
    const $header = this.$slots['header'] || h(false)

    // Return the rendered tabs header
    return h(
      'div',
      {
        class: [
          {
            'col-auto': vertical,
            'card-header': card && !end,
            'border-bottom-0': card && !end && vertical,
            'card-footer': card && end,
            'border-top-0': card && end && vertical,
            // Ensure we are full height in vertical card mode
            'h-100': card && vertical,
            // Remove counded clipping to give a straight edge in vertical card mode
            'rounded-0': card && vertical
          },
          bvTabs.navWrapperClass || {}
        ]
      },
      // Header slot, if present, always appears on top in vertical mode
      vertical || !end ? [$header, $nav, h(false)] : [h(false), $nav, $header]
    )
  }
}
