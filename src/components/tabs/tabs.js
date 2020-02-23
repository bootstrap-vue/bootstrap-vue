import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import observeDom from '../../utils/observe-dom'
import stableSort from '../../utils/stable-sort'
import { arrayIncludes, concat } from '../../utils/array'
import { BvEvent } from '../../utils/bv-event.class'
import { requestAF, selectAll } from '../../utils/dom'
import { isEvent } from '../../utils/inspect'
import { omit } from '../../utils/object'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink } from '../link/link'
import { BNav, props as BNavProps } from '../nav/nav'

// -- Constants --

const navProps = omit(BNavProps, ['tabs', 'isNavBar', 'cardHeader'])

// -- Utils --

// Filter function to filter out disabled tabs
const notDisabled = tab => !tab.disabled

// --- Helper components ---

// @vue/component
const BTabButtonHelper = /*#__PURE__*/ Vue.extend({
  name: 'BTabButtonHelper',
  inject: {
    bvTabs: {
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props: {
    // Reference to the child <b-tab> instance
    tab: { default: null },
    tabs: {
      type: Array,
      default() /* istanbul ignore next */ {
        return []
      }
    },
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
      const stop = () => {
        evt.preventDefault()
        evt.stopPropagation()
      }
      if (this.tab.disabled) {
        /* istanbul ignore next */
        return
      }
      const type = evt.type
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (type === 'click') {
        stop()
        this.$emit('click', evt)
      } else if (type === 'keydown' && key === KeyCodes.SPACE) {
        // For ARIA tabs the SPACE key will also trigger a click/select
        // Even with keyboard navigation disabled, SPACE should "click" the button
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
        stop()
        this.$emit('click', evt)
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
          this.tab.titleLinkClass,
          // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
          this.tab.localActive ? this.bvTabs.activeNavItemClass : null
        ],
        props: { disabled: this.tab.disabled },
        attrs: {
          ...this.tab.titleLinkAttributes,
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
      [this.tab.normalizeSlot('title') || this.tab.title]
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
})

// @vue/component
export const BTabs = /*#__PURE__*/ Vue.extend({
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
    ...navProps,
    tag: {
      type: String,
      default: 'div'
    },
    card: {
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
      // This prop is sniffed by the <b-tab> child
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
      // Array of direct child <b-tab> instances, in DOM order
      tabs: [],
      // Array of child instances registered (for triggering reactive updates)
      registeredTabs: [],
      // Flag to know if we are mounted or not
      isMounted: false
    }
  },
  computed: {
    fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade
    },
    localNavClass() {
      const classes = []
      if (this.card && this.vertical) {
        classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0')
      }
      return [...classes, this.navClass]
    }
  },
  watch: {
    currentTab(newVal) {
      let index = -1
      // Ensure only one tab is active at most
      this.tabs.forEach((tab, idx) => {
        if (newVal === idx && !tab.disabled) {
          tab.localActive = true
          index = idx
        } else {
          tab.localActive = false
        }
      })
      // Update the v-model
      this.$emit('input', index)
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        newVal = parseInt(newVal, 10)
        newVal = isNaN(newVal) ? -1 : newVal
        oldVal = parseInt(oldVal, 10) || 0
        const tabs = this.tabs
        if (tabs[newVal] && !tabs[newVal].disabled) {
          this.activateTab(tabs[newVal])
        } else {
          // Try next or prev tabs
          if (newVal < oldVal) {
            this.previousTab()
          } else {
            this.nextTab()
          }
        }
      }
    },
    registeredTabs() {
      // Each b-tab will register/unregister itself.
      // We use this to detect when tabs are added/removed
      // to trigger the update of the tabs.
      this.$nextTick(() => {
        requestAF(() => {
          this.updateTabs()
        })
      })
    },
    tabs(newVal, oldVal) {
      // If tabs added, removed, or re-ordered, we emit a `changed` event.
      // We use `tab._uid` instead of `tab.safeId()`, as the later is changed
      // in a nextTick if no explicit ID is provided, causing duplicate emits.
      if (!looseEqual(newVal.map(t => t._uid), oldVal.map(t => t._uid))) {
        // In a nextTick to ensure currentTab has been set first.
        this.$nextTick(() => {
          // We emit shallow copies of the new and old arrays of tabs, to
          // prevent users from potentially mutating the internal arrays.
          this.$emit('changed', newVal.slice(), oldVal.slice())
        })
      }
    },
    isMounted(newVal) {
      // Trigger an update after mounted.  Needed for tabs inside lazy modals.
      if (newVal) {
        requestAF(() => {
          this.updateTabs()
        })
      }
      // Enable or disable the observer
      this.setObserver(newVal)
    }
  },
  created() {
    const tabIdx = parseInt(this.value, 10)
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
    this._bvObserver = null
    // For SSR and to make sure only a single tab is shown on mount
    // We wrap this in a `$nextTick()` to ensure the child tabs have been created
    this.$nextTick(() => {
      this.updateTabs()
    })
  },
  mounted() {
    // Call `updateTabs()` just in case...
    this.updateTabs()
    this.$nextTick(() => {
      // Flag we are now mounted and to switch to DOM for tab probing.
      // As this.$slots.default appears to lie about component instances
      // after b-tabs is destroyed and re-instantiated.
      // And this.$children does not respect DOM order.
      this.isMounted = true
    })
  },
  deactivated() /* istanbul ignore next */ {
    this.isMounted = false
  },
  activated() /* istanbul ignore next */ {
    const tabIdx = parseInt(this.value, 10)
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx
    this.$nextTick(() => {
      this.updateTabs()
      this.isMounted = true
    })
  },
  beforeDestroy() {
    this.isMounted = false
  },
  destroyed() {
    // Ensure no references to child instances exist
    this.tabs = []
  },
  methods: {
    registerTab(tab) {
      if (!arrayIncludes(this.registeredTabs, tab)) {
        this.registeredTabs.push(tab)
        tab.$once('hook:destroyed', () => {
          this.unregisterTab(tab)
        })
      }
    },
    unregisterTab(tab) {
      this.registeredTabs = this.registeredTabs.slice().filter(t => t !== tab)
    },
    setObserver(on) {
      // DOM observer is needed to detect changes in order of tabs
      if (on) {
        // Make sure no existing observer running
        this.setObserver(false)
        const self = this
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */
        const handler = () => {
          // We delay the update to ensure that `tab.safeId()` has
          // updated with the final ID value.
          self.$nextTick(() => {
            requestAF(() => {
              self.updateTabs()
            })
          })
        }
        // Watch for changes to <b-tab> sub components
        this._bvObserver = observeDom(this.$refs.tabsContainer, handler, {
          childList: true,
          subtree: false,
          attributes: true,
          attributeFilter: ['id']
        })
      } else {
        if (this._bvObserver && this._bvObserver.disconnect) {
          this._bvObserver.disconnect()
        }
        this._bvObserver = null
      }
    },
    getTabs() {
      // We use registeredTabs as the source of truth for child tab components. And we
      // filter out any BTab components that are extended BTab with a root child BTab.
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3260
      const tabs = this.registeredTabs.filter(
        tab => tab.$children.filter(t => t._isTab).length === 0
      )
      // DOM Order of Tabs
      let order = []
      if (this.isMounted && tabs.length > 0) {
        // We rely on the DOM when mounted to get the 'true' order of the b-tab children.
        // querySelectorAll(...) always returns elements in document order, regardless of
        // order specified in the selector.
        const selector = tabs.map(tab => `#${tab.safeId()}`).join(', ')
        order = selectAll(selector, this.$el)
          .map(el => el.id)
          .filter(identity)
      }
      // Stable sort keeps the original order if not found in the
      // `order` array, which will be an empty array before mount.
      return stableSort(tabs, (a, b) => {
        return order.indexOf(a.safeId()) - order.indexOf(b.safeId())
      })
    },
    // Update list of <b-tab> children
    updateTabs() {
      // Probe tabs
      const tabs = this.getTabs()

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
          // Current tab is not disabled
          tabIndex = currentTab
        }
      }

      // Else find *first* non-disabled tab in current tabs
      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled))
      }

      // Set the current tab state to active
      tabs.forEach(tab => {
        // tab.localActive = idx === tabIndex && !tab.disabled
        tab.localActive = false
      })
      if (tabs[tabIndex]) {
        tabs[tabIndex].localActive = true
      }

      // Update the array of tab children
      this.tabs = tabs
      // Set the currentTab index (can be -1 if no non-disabled tabs)
      this.currentTab = tabIndex
    },
    // Find a button that controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab(tab) {
      return (this.$refs.buttons || []).find(btn => btn.tab === tab)
    },
    // Force a button to re-render its content, given a <b-tab> instance
    // Called by <b-tab> on `update()`
    updateButton(tab) {
      const button = this.getButtonForTab(tab)
      if (button && button.$forceUpdate) {
        button.$forceUpdate()
      }
    },
    // Activate a tab given a <b-tab> instance
    // Also accessed by <b-tab>
    activateTab(tab) {
      let result = false
      if (tab) {
        const index = this.tabs.indexOf(tab)
        if (!tab.disabled && index > -1 && index !== this.currentTab) {
          const tabEvt = new BvEvent('activate-tab', {
            cancelable: true,
            vueTarget: this,
            componentId: this.safeId()
          })
          this.$emit(tabEvt.type, index, this.currentTab, tabEvt)
          if (!tabEvt.defaultPrevented) {
            result = true
            this.currentTab = index
          }
        }
      }
      // Couldn't set tab, so ensure v-model is set to `this.currentTab`
      /* istanbul ignore next: should rarely happen */
      if (!result && this.currentTab !== this.value) {
        this.$emit('input', this.currentTab)
      }
      return result
    },
    // Deactivate a tab given a <b-tab> instance
    // Accessed by <b-tab>
    deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(t => t !== tab).find(notDisabled))
      }
      /* istanbul ignore next: should never/rarely happen */
      return false
    },
    // Focus a tab button given its <b-tab> instance
    focusButton(tab) {
      // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(() => {
        const button = this.getButtonForTab(tab)
        if (button && button.focus) {
          button.focus()
        }
      })
    },
    // Emit a click event on a specified <b-tab> component instance
    emitTabClick(tab, evt) {
      if (isEvent(evt) && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt)
      }
    },
    // Click handler
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
    const activeTab = tabs.find(tab => tab.localActive && !tab.disabled)

    // Tab button to allow focusing when no active tab found (keynav only)
    const fallbackTab = tabs.find(tab => !tab.disabled)

    // For each <b-tab> found create the tab buttons
    const buttons = tabs.map((tab, index) => {
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
        key: tab._uid || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        refInFor: true,
        props: {
          tab: tab,
          tabs: tabs,
          id: tab.controlledBy || (tab.safeId ? tab.safeId(`_BV_tab_button_`) : null),
          controls: tab.safeId ? tab.safeId() : null,
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

    // Nav
    let nav = h(
      BNav,
      {
        ref: 'nav',
        class: this.localNavClass,
        attrs: {
          role: 'tablist',
          id: this.safeId('_BV_tab_controls_')
        },
        props: {
          fill: this.fill,
          justified: this.justified,
          align: this.align,
          tabs: !this.noNavStyle && !this.pills,
          pills: !this.noNavStyle && this.pills,
          vertical: this.vertical,
          small: this.small,
          cardHeader: this.card && !this.vertical
        }
      },
      [this.normalizeSlot('tabs-start') || h(), buttons, this.normalizeSlot('tabs-end') || h()]
    )
    nav = h(
      'div',
      {
        key: 'bv-tabs-nav',
        class: [
          {
            'card-header': this.card && !this.vertical && !this.end,
            'card-footer': this.card && !this.vertical && this.end,
            'col-auto': this.vertical
          },
          this.navWrapperClass
        ]
      },
      [nav]
    )

    let empty = h()
    if (!tabs || tabs.length === 0) {
      empty = h(
        'div',
        { key: 'bv-empty-tab', class: ['tab-pane', 'active', { 'card-body': this.card }] },
        this.normalizeSlot('empty')
      )
    }

    // Main content section
    const content = h(
      'div',
      {
        ref: 'tabsContainer',
        key: 'bv-tabs-container',
        staticClass: 'tab-content',
        class: [{ col: this.vertical }, this.contentClass],
        attrs: { id: this.safeId('_BV_tab_container_') }
      },
      concat(this.normalizeSlot('default'), empty)
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
      [this.end ? content : h(), [nav], this.end ? h() : content]
    )
  }
})
