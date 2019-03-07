import BLink from '../link/link'
import BTabsNavs from '.helpers/tabs-navs'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixin/normalize-slot'

// @vue/component
export default {
  name: 'BTabs',
  mixins: [idMixin, normalizeSlotMixin],
  provide() {
    return {
      bvTabs: this
    }
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
    navType: {
      // Nav button type: `tabs`, `pills` or `plain` (for no style)
      type: String,
      default: 'tabs'
    },
    pills: {
      // Deprecated in favour of navType
      type: Boolean,
      default: null
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
      // Deprecated in favour of navType
      type: Boolean,
      default: false
    },
    noKeyNav: {
      // Does nothing at the moment
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
    let tabIdx = parseInt(this.value, 10)
    tabIdx = isNaN(tabIdx) ? -1 : tabIdx
    return {
      // Index of current tab
      currentTab: tabIdx,
      // Array of b-tab instances that have been injected into b-tabs.
      // For reactivity purposes only, as order in this
      // array is not guganteed to follow document order
      registeredTabs: []
    }
  },
  computed: {
    fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade
    },
    slotScope() {
      return {
        firstTab: this.firstTab,
        previousTab: this.previousTab,
        nextTab: this.nextTab,
        lastTab: this.lastTab
      }
    }
  },
  watch: {
    currentTab(val, old) {
      // Update the v-model
      this.$emit('input', val)
    },
    value(val, old) {
      const tabIdx = parseInt(val, 10)
      this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
    }
  },
  created() {
    // const tabIdx = parseInt(this.value, 10)
    // this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
  },
  mounted() {
    // set the currentTab index here?
    // created/watchers should handle this
  },
  methods: {
    registerTab(tab) {
      // Used to trigger reactivity on tab changes
      if (!arrayIncludes(this.registeredTabs, tab)) {
        this.registeredTabs.push(tab)
      }
      this.registeredTabs = this.registeredTabs.slice()
    },
    unregisterTab(tab) {
      // Used to trigger reactivity on tab changes
      if (arrayIncludes(this.registeredTabs, tab)) {
        this.registeredTabs = this.registeredTabs.filter(t => t !== tab)
      }
      this.registeredTabs = this.registeredTabs.slice()
    },
    // Activate a tab given a b-tab instance
    // Accessed by b-tab
    activateTab(tab) {
      if (tab && this.$refs.tabsNavs) {
        return this.$refs.tabsNavs.activateTab(tab)
      } else {
        /* istanbul ignore next */
        return false
      }
    },
    // Deactivate a tab given a b-tab instance
    // Accessed by b-tab
    deactivateTab(tab) {
      if (tab && this.$refs.tabsNavs) {
        return this.$refs.tabsNavs.deactivateTab(tab)
      } else {
        /* istanbul ignore next */
        return false
      }
    },
    // Public methods
    firstTab() {
      this.$refs.tabsNavs && this.$refs.tabsNavs.first()
    },
    previousTab() {
      this.$refs.tabsNavs && this.$refs.tabsNavs.prev()
    },
    nextTab() {
      this.$refs.tabsNavs && this.$refs.tabsNavs.next()
    },
    lastTab() {
      this.$refs.tabsNavs && this.$refs.tabsNavs.last()
    }
  },
  render(h) {
    const scope = this.slotScope
    const $children = this.$slots.default || []
    // Scoped slots we are passing to 
    const $header = normalizeSlot('header', scope)
    const $tabsStart = normalizeSlot('tabs-start', scope)
    // slot `tabs` is deprecated in favour of `tabs-end`
    const $tabsEnd = normalizeSlot('tabs-end', scope) || normalizeSlot('tabs', scope)

    // Get a list of b-tab component instances (document order)
    const tabs = $children
      .map(vNode => vNode.componentInstance)
      .filter(Boolean)
      .filter(vm => vm._isTab)

    /*
    // eslint-disable-next-line no-unused-vars
    const registeredTabs = this.registeredTabs
    */
    
    const $tabsNavs = h(
      BTabsNavs,
      {
        ref: 'tabsNavs',
        props: {
          tabs: tabs,
          value: this.currentTab
        },
        on: {
          change: index => {
            this.currentTab = index
          }
        }
      },
      [
        h('template', { slot: 'header' }, $header),
        h('template', { slot: 'tabs-start' }, $tabsStart),
        h('template', { slot: 'tabs-end' }, $tabsEnd)
      ]
    )

    let $empty = h(false)
    if (tabs.length === 0) {
      $empty = h(
        'div',
        { key: 'empty-tab', class: ['tab-pane', 'active', { 'card-body': this.card }] },
        [this.$slots.empty]
      )
    }

    // Main content section
    // TODO: This container should be a helper component
    const $content = h(
      'div',
      {
        ref: 'tabsContainer',
        key: 'bv-tabs-container',
        staticClass: 'tab-content',
        class: [{ col: this.vertical }, this.contentClass],
        attrs: { id: this.safeId('_BV_tab_container_') }
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
      this.end || this.bottom ? [h(false), $content, $tabsNavs] : [$tabsNavs, $content, h(false)]
    )
  }
}
