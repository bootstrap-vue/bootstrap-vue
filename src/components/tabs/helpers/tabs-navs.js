// BTabsNavs (Private Component, not for public use)
// Used by BTabs to maitain source of truth
import BNav from '../../nav/nav'
import BTabNav from './tab-nav'

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
    slotScope() {
      return {
        first: this.first,
        previous: this.prev,
        prev: this.prev,
        next: this.next,
        last: this.last,
        currentTab: this.activeIndex,
        tabCount: this.tabs.length
      }
    }
  },
  watch: {
    value(val, old) {
      if (val !== old) {
        const tabs = this.tabs
        // val = Math.min(val, 0)
        // old = Math.max(val || 0, -1)
        if (val >= tabs.length) {
          // handle case where last tab removed
          this.last()
        } else if (tabs[val] && !tabs[val].disabled) {
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
    // set the initial value of the model (could be -1)
    this.activeIndex = this.getActiveIndex()
  },
  methods: {
    // Called by BTabNav and the following methods
    setActiveTab(tab) {
      if (tab && !tab.disabled) {
        // Should this be this.$emit('change', this.tabs.indexOf(tab))
        this.activeIndex = this.tabs.indexOf(tab)
      } else {
        // TODO:
        //   We should re-update the parent model here
        //   to keep model in sync???
        //   this.$emit('change', this.activeIndex)
      }
    },
    // These methods are used by the scoped slots, and by the parent BTabs component
    first() {
      // Activate the first non-disabled tab
      const tab = this.tabs.find(t => !t.disabled)
      this.setActiveTab(tab)
    },
    prev() {
      // Activate the previous non-disabled tab
      const index = Math.max(this.activeIndex, 0)
      const tab = this.tabs
        .slice(0, index)
        .reverse()
        .find(t => !t.disabled)
      this.setActiveTab(tab)
    },
    next() {
      // Activate the next non-disabled tab
      const index = Math.max(this.activeIndex, -1)
      const tab = this.tabs.slice(index + 1).find(t => !t.disabled)
      this.setActiveTab(tab)
    },
    last() {
      // Activate the last non-disabled tab
      const tab = this.tabs
        .slice()
        .reverse()
        .find(t => !t.disabled)
      this.setActiveTab(tab)
    },
    // Private method to determine which tab should be active
    getActiveIndex() {
      const tabs = this.tabs || []

      // look for last tab with localActive set to true
      // Trusting the tab's state first (handy if new tabs are added with `active=true`)
      let tab = tabs
        .slice()
        .reverse()
        .find(t => t.localActive && !t.disabled)

      // Else try value specified by this.value
      if(!tab) {
        if (this.value >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tab = tabs
            .slice()
            .reverse()
            .find(t => !t.disabled)
        } else if (tabs[this.value] && !tabs[this.value].disabled) {
          tab = tabs[this.value]
        }
      }

      // Else find the first non-disabled tab
      if (!tab) {
        tab = tabs.find(t => !t.disabled)
      }

      // Return the index of the tab if found (else returns -1)
      return tabs.indexOf(tab)
    }
  },
  render(h) {
    const bvTabs = this.bvTabs
    const activeIndex = this.getActiveIndex()
    const end = bvTabs.end || bvTabs.bottom || false
    const vertical = bvTabs.vertical || false
    const card = bvTabs.card
    // Accepts null, 'tabs', 'pills', 'plain'
    const navType = bvTabs.navType === 'plain' ? null : bvTabs.navType || null

    // Generate the tab nav items/links
    const $navs = this.tabs.map((tab, idx) => {
      // Create a tab button for each tab instance
      return h(
        BTabNav,
        {
          key: tab._uid || `tab-index-${idx}`,
          props: {
            tab: tab || null,
            active: idx === activeIndex,
            index: idx,
            setSize: this.tabs.length
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
      [
        this.$slots['tabs-start'] || h(false),
        $navs,
        this.$slots['tabs-end'] || h(false)
      ]
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
