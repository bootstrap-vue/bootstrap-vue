import Vue from '../../utils/vue'
import { concat } from '../../utils/array'
import { omit } from '../../utils/object'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { props as BNavProps } from '../nav/nav'
import BTabsNav from './helpers/tabs-nav'

// -- Constants --

const navProps = omit(BNavProps, ['tabs', 'isNavBar'])

// @vue/component
export default Vue.extend({
  name: 'BTabs',
  mixins: [idMixin, normalizeSlotMixin],
  provide() {
    return {
      bvTabs: this
    }
  },
  model: {
    prop: 'value',
    event: 'input'
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
    bottom: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    // The follwoing props are sniffed by the <b-tab> children
    ...navProps,
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
    activeNavItemClass: {
      // Only applied to the currently active <b-nav-item>
      type: [String, Array, Object],
      default: null
    },
    activeTabClass: {
      // Only applied to the currently active <b-tab>
      // This prop is sniffed by the <b-tab> child
      type: [String, Array, Object],
      default: null
    },
    // v-model
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    let tabIdx = parseInt(this.value, 10)
    tabIdx = isNaN(tabIdx) ? -1 : tabIdx
    return {
      // Index of current tab
      currentTab: tabIdx
    }
  },
  computed: {
    computedValue() {
      const value = parseInt(this.value, 10)
      return isNaN(value) ? -1 : value
    },
    fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade
    },
    navStyle() {
      return this.pills ? 'pills' : 'tabs'
    },
    localNavClass() {
      let classes = []
      if (this.card) {
        if (this.vertical) {
          classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0')
        } else {
          classes.push(`card-header-${this.navStyle}`)
        }
      }
      return [...classes, this.navClass]
    }
  },
  watch: {
    currentTab(val, old) {
      // Update the v-model
      this.$emit('input', val)
    },
    value(val, old) {
      if (val !== old) {
        val = parseInt(val, 10)
        val = isNaN(val) ? -1 : val
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
      // },
      // registeredTabs(val, old) {
      //  this.updateTabs()
    }
  },
  created() {
    let tabIdx = parseInt(this.value, 10)
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
  },
  mounted() {
    this.$nextTick(() => {
      // Call `updateTabs()` just in case...
      this.updateTabs()
      // Observe child changes so we can update list of tabs
      this.$nextTick(() => {
        this.setObserver(true)
      })
    })
  },
  activated() /* istanbul ignore next */ {
    let tabIdx = parseInt(this.value, 10)
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
  },
  methods: {
    updateModel(val) {
      // Update the vmodel
      this.$emit('input', val)
    },
    prevTab() {
      // Proxy to nav component
      const $refs = this.$refs
      $refs && $refs.nav && $refs.nav.prevTab()
    },
    nextTab() {
      // Proxy to nav component
      const $refs = this.$refs
      $refs && $refs.nav && $refs.nav.nextTab()
    },
    // Activate a tab given a <b-tab> instance
    activateTab(tab) {
      const $refs = this.$refs
      if (tab && $refs && $refs.nav) {
        return $refs.nav.activateTab(tab)
      } else {
        // No tab
        return false
      }
    },
    // Deactivate a tab given a <b-tab> instance
    deactivateTab(tab) {
      const $refs = this.$refs
      if (tab && $refs && $refs.nav) {
        return $refs.nav.deactivateTab(tab)
      } else {
        // No tab
        return false
      }
    }
  },
  render(h) {
    // Default slot children
    const $children = this.normalizeSlot('default', {})

    // find the children b-tab instances (immediate descendants)
    const tabs = concat($children)
      .filter(Boolean)
      .map(vnode => vnode.componentInstance)
      .filter(tab => tab && tab._isTab)

    // Build the navigation controls
    const $nav = h(
      BTabsNav,
      {
        ref: 'nav',
        props: {
          tabs: tabs,
          id: this.safeId('_BV_tab_controls_'),
          value: this.currentTab
        },
        on: {
          input: index => {
            this.currentTab = index
          }
        }
      },
      // Any "extra" tabs are placed in default slot
      this.noramlizeSlot('tabs', {}) || [h(false)]
    )

    // Placeholder tab when no tabs available
    let $empty = h(false)
    if (!tabs || tabs.length === 0) {
      $empty = h(
        'div',
        { key: 'empty-tab', class: ['tab-pane', 'active', { 'card-body': this.card }] },
        this.normalizeSlot('empty')
      )
    }

    // Main content section
    const $content = h(
      'div',
      {
        ref: 'tabsContainer',
        key: 'bv-tabs-container',
        staticClass: 'tab-content',
        class: [{ col: this.vertical }, this.contentClass],
        attrs: {
          id: this.safeId('_BV_tab_container_'),
          tabIndex: this.noKeyNav ? '-1' : '0'
        }
      },
      [$children, $empty]
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
        this.end || this.bottom ? $content : h(false),
        [$nav],
        this.end || this.bottom ? h(false) : $content
      ]
    )
  }
})
