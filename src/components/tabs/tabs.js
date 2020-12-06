import { COMPONENT_UID_KEY, Vue } from '../../vue'
import { NAME_TABS, NAME_TAB_BUTTON_HELPER } from '../../constants/components'
import {
  EVENT_NAME_CHANGED,
  EVENT_NAME_CLICK,
  EVENT_NAME_FIRST,
  EVENT_NAME_LAST,
  EVENT_NAME_NEXT,
  EVENT_NAME_PREV,
  HOOK_EVENT_NAME_DESTROYED
} from '../../constants/events'
import {
  CODE_DOWN,
  CODE_END,
  CODE_HOME,
  CODE_LEFT,
  CODE_RIGHT,
  CODE_SPACE,
  CODE_UP
} from '../../constants/key-codes'
import {
  PROP_TYPE_ARRAY,
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER,
  PROP_TYPE_STRING
} from '../../constants/props'
import {
  SLOT_NAME_EMPTY,
  SLOT_NAME_TABS_END,
  SLOT_NAME_TABS_START,
  SLOT_NAME_TITLE
} from '../../constants/slots'
import { arrayIncludes } from '../../utils/array'
import { BvEvent } from '../../utils/bv-event.class'
import { attemptFocus, requestAF, selectAll } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import { identity } from '../../utils/identity'
import { isEvent } from '../../utils/inspect'
import { looseEqual } from '../../utils/loose-equal'
import { mathMax } from '../../utils/math'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import { omit, sortKeys } from '../../utils/object'
import { observeDom } from '../../utils/observe-dom'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { stableSort } from '../../utils/stable-sort'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BLink } from '../link/link'
import { BNav, props as BNavProps } from '../nav/nav'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', { type: PROP_TYPE_NUMBER })

// --- Helper methods ---

// Filter function to filter out disabled tabs
const notDisabled = tab => !tab.disabled

// --- Helper components ---

// @vue/component
const BVTabButton = /*#__PURE__*/ Vue.extend({
  name: NAME_TAB_BUTTON_HELPER,
  inject: {
    bvTabs: {
      default: /* istanbul ignore next */ () => ({})
    }
  },
  props: {
    controls: makeProp(PROP_TYPE_STRING),
    id: makeProp(PROP_TYPE_STRING),
    noKeyNav: makeProp(PROP_TYPE_BOOLEAN, false),
    posInSet: makeProp(PROP_TYPE_NUMBER),
    setSize: makeProp(PROP_TYPE_NUMBER),
    // Reference to the child <b-tab> instance
    tab: makeProp(),
    tabIndex: makeProp(PROP_TYPE_NUMBER),
    tabs: makeProp(PROP_TYPE_ARRAY, [])
  },
  methods: {
    focus() {
      attemptFocus(this.$refs.link)
    },
    handleEvt(event) {
      /* istanbul ignore next */
      if (this.tab.disabled) {
        return
      }
      const { type, keyCode, shiftKey } = event
      if (type === 'click') {
        stopEvent(event)
        this.$emit(EVENT_NAME_CLICK, event)
      } else if (type === 'keydown' && keyCode === CODE_SPACE) {
        // For ARIA tabs the SPACE key will also trigger a click/select
        // Even with keyboard navigation disabled, SPACE should "click" the button
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
        stopEvent(event)
        this.$emit(EVENT_NAME_CLICK, event)
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if ([CODE_UP, CODE_LEFT, CODE_HOME].indexOf(keyCode) !== -1) {
          stopEvent(event)
          if (shiftKey || keyCode === CODE_HOME) {
            this.$emit(EVENT_NAME_FIRST, event)
          } else {
            this.$emit(EVENT_NAME_PREV, event)
          }
        } else if ([CODE_DOWN, CODE_RIGHT, CODE_END].indexOf(keyCode) !== -1) {
          stopEvent(event)
          if (shiftKey || keyCode === CODE_END) {
            this.$emit(EVENT_NAME_LAST, event)
          } else {
            this.$emit(EVENT_NAME_NEXT, event)
          }
        }
      }
    }
  },
  render(h) {
    const { id, tabIndex, setSize, posInSet, controls, handleEvt } = this
    const {
      title,
      localActive,
      disabled,
      titleItemClass,
      titleLinkClass,
      titleLinkAttributes
    } = this.tab

    const $link = h(
      BLink,
      {
        staticClass: 'nav-link',
        class: [
          {
            active: localActive && !disabled,
            disabled
          },
          titleLinkClass,
          // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
          localActive ? this.bvTabs.activeNavItemClass : null
        ],
        props: { disabled },
        attrs: {
          ...titleLinkAttributes,
          id,
          role: 'tab',
          // Roving tab index when keynav enabled
          tabindex: tabIndex,
          'aria-selected': localActive && !disabled ? 'true' : 'false',
          'aria-setsize': setSize,
          'aria-posinset': posInSet,
          'aria-controls': controls
        },
        on: {
          click: handleEvt,
          keydown: handleEvt
        },
        ref: 'link'
      },
      [this.tab.normalizeSlot(SLOT_NAME_TITLE) || title]
    )

    return h(
      'li',
      {
        staticClass: 'nav-item',
        class: [titleItemClass],
        attrs: { role: 'presentation' }
      },
      [$link]
    )
  }
})

// --- Props ---

const navProps = omit(BNavProps, ['tabs', 'isNavBar', 'cardHeader'])

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...navProps,
    // Only applied to the currently active `<b-nav-item>`
    activeNavItemClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    // Only applied to the currently active `<b-tab>`
    // This prop is sniffed by the `<b-tab>` child
    activeTabClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    card: makeProp(PROP_TYPE_BOOLEAN, false),
    contentClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    // Synonym for 'bottom'
    end: makeProp(PROP_TYPE_BOOLEAN, false),
    // This prop is sniffed by the `<b-tab>` child
    lazy: makeProp(PROP_TYPE_BOOLEAN, false),
    navClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    navWrapperClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    noFade: makeProp(PROP_TYPE_BOOLEAN, false),
    noKeyNav: makeProp(PROP_TYPE_BOOLEAN, false),
    noNavStyle: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  }),
  NAME_TABS
)

// --- Main component ---

// @vue/component
export const BTabs = /*#__PURE__*/ Vue.extend({
  name: NAME_TABS,
  mixins: [idMixin, modelMixin, normalizeSlotMixin],
  provide() {
    return {
      bvTabs: this
    }
  },
  props,
  data() {
    return {
      // Index of current tab
      currentTab: toInteger(this[MODEL_PROP_NAME], -1),
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
    currentTab(newValue) {
      let index = -1
      // Ensure only one tab is active at most
      this.tabs.forEach((tab, idx) => {
        if (newValue === idx && !tab.disabled) {
          tab.localActive = true
          index = idx
        } else {
          tab.localActive = false
        }
      })
      // Update the v-model
      this.$emit(MODEL_EVENT_NAME, index)
    },
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        newValue = toInteger(newValue, -1)
        oldValue = toInteger(oldValue, 0)
        const tabs = this.tabs
        if (tabs[newValue] && !tabs[newValue].disabled) {
          this.activateTab(tabs[newValue])
        } else {
          // Try next or prev tabs
          if (newValue < oldValue) {
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
    tabs(newValue, oldValue) {
      // If tabs added, removed, or re-ordered, we emit a `changed` event
      // We use `tab._uid` instead of `tab.safeId()`, as the later is changed
      // in a `$nextTick()` if no explicit ID is provided, causing duplicate emits
      if (
        !looseEqual(
          newValue.map(t => t[COMPONENT_UID_KEY]),
          oldValue.map(t => t[COMPONENT_UID_KEY])
        )
      ) {
        // In a `$nextTick()` to ensure `currentTab` has been set first
        this.$nextTick(() => {
          // We emit shallow copies of the new and old arrays of tabs,
          // to prevent users from potentially mutating the internal arrays
          this.$emit(EVENT_NAME_CHANGED, newValue.slice(), oldValue.slice())
        })
      }
    },
    isMounted(newValue) {
      // Trigger an update after mounted
      // Needed for tabs inside lazy modals
      if (newValue) {
        requestAF(() => {
          this.updateTabs()
        })
      }
      // Enable or disable the observer
      this.setObserver(newValue)
    }
  },
  created() {
    // Create private non-reactive props
    this.$_observer = null
    this.currentTab = toInteger(this[MODEL_PROP_NAME], -1)
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
      // Flag we are now mounted and to switch to DOM for tab probing
      // As `$slots.default` appears to lie about component instances
      // after b-tabs is destroyed and re-instantiated
      // And `$children` does not respect DOM order
      this.isMounted = true
    })
  },
  /* istanbul ignore next */
  deactivated() {
    this.isMounted = false
  },
  /* istanbul ignore next */
  activated() {
    this.currentTab = toInteger(this[MODEL_PROP_NAME], -1)
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
        tab.$once(HOOK_EVENT_NAME_DESTROYED, () => {
          this.unregisterTab(tab)
        })
      }
    },
    unregisterTab(tab) {
      this.registeredTabs = this.registeredTabs.slice().filter(t => t !== tab)
    },
    // DOM observer is needed to detect changes in order of tabs
    setObserver(on) {
      this.$_observer && this.$_observer.disconnect()
      this.$_observer = null
      if (on) {
        const self = this
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */
        const handler = () => {
          // We delay the update to ensure that `tab.safeId()` has
          // updated with the final ID value
          self.$nextTick(() => {
            requestAF(() => {
              self.updateTabs()
            })
          })
        }
        // Watch for changes to `<b-tab>` sub components
        this.$_observer = observeDom(this.$refs.content, handler, {
          childList: true,
          subtree: false,
          attributes: true,
          attributeFilter: ['id']
        })
      }
    },
    getTabs() {
      // We use `registeredTabs` as the source of truth for child tab components
      // We also filter out any `<b-tab>` components that are extended
      // `<b-tab>` with a root child `<b-tab>`
      // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/3260
      const tabs = this.registeredTabs.filter(
        tab => tab.$children.filter(t => t._isTab).length === 0
      )
      // DOM Order of Tabs
      let order = []
      if (this.isMounted && tabs.length > 0) {
        // We rely on the DOM when mounted to get the 'true' order of the `<b-tab>` children
        // `querySelectorAll()` always returns elements in document order, regardless of
        // order specified in the selector
        const selector = tabs.map(tab => `#${tab.safeId()}`).join(', ')
        order = selectAll(selector, this.$el)
          .map(el => el.id)
          .filter(identity)
      }
      // Stable sort keeps the original order if not found in the `order` array,
      // which will be an empty array before mount
      return stableSort(tabs, (a, b) => order.indexOf(a.safeId()) - order.indexOf(b.safeId()))
    },
    // Update list of `<b-tab>` children
    updateTabs() {
      // Probe tabs
      const tabs = this.getTabs()

      // Find *last* active non-disabled tab in current tabs
      // We trust tab state over `currentTab`, in case tabs were added/removed/re-ordered
      let tabIndex = tabs.indexOf(
        tabs
          .slice()
          .reverse()
          .find(tab => tab.localActive && !tab.disabled)
      )

      // Else try setting to `currentTab`
      if (tabIndex < 0) {
        const { currentTab } = this
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
    // Force a button to re-render its content, given a `<b-tab>` instance
    // Called by `<b-tab>` on `update()`
    updateButton(tab) {
      const button = this.getButtonForTab(tab)
      if (button && button.$forceUpdate) {
        button.$forceUpdate()
      }
    },
    // Activate a tab given a `<b-tab>` instance
    // Also accessed by `<b-tab>`
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
      // Couldn't set tab, so ensure v-model is set to `currentTab`
      /* istanbul ignore next: should rarely happen */
      if (!result && this.currentTab !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, this.currentTab)
      }
      return result
    },
    // Deactivate a tab given a `<b-tab>` instance
    // Accessed by `<b-tab>`
    deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(t => t !== tab).find(notDisabled))
      }
      /* istanbul ignore next: should never/rarely happen */
      return false
    },
    // Focus a tab button given its `<b-tab>` instance
    focusButton(tab) {
      // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(() => {
        attemptFocus(this.getButtonForTab(tab))
      })
    },
    // Emit a click event on a specified `<b-tab>` component instance
    emitTabClick(tab, event) {
      if (isEvent(event) && tab && tab.$emit && !tab.disabled) {
        tab.$emit(EVENT_NAME_CLICK, event)
      }
    },
    // Click handler
    clickTab(tab, event) {
      this.activateTab(tab)
      this.emitTabClick(tab, event)
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
      const currentIndex = mathMax(this.currentTab, 0)
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
      const currentIndex = mathMax(this.currentTab, -1)
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
    const { tabs, noKeyNav, card, vertical, end, firstTab, previousTab, nextTab, lastTab } = this

    // Currently active tab
    const activeTab = tabs.find(tab => tab.localActive && !tab.disabled)

    // Tab button to allow focusing when no active tab found (keynav only)
    const fallbackTab = tabs.find(tab => !tab.disabled)

    // For each `<b-tab>` found create the tab buttons
    const $buttons = tabs.map((tab, index) => {
      // Ensure at least one tab button is focusable when keynav enabled (if possible)
      let tabIndex = null
      if (!noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1
        if (activeTab === tab || (!activeTab && fallbackTab === tab)) {
          // Place tab button in tab sequence
          tabIndex = null
        }
      }

      return h(BVTabButton, {
        props: {
          tab,
          tabs,
          id: tab.controlledBy || (tab.safeId ? tab.safeId(`_BV_tab_button_`) : null),
          controls: tab.safeId ? tab.safeId() : null,
          tabIndex,
          setSize: tabs.length,
          posInSet: index + 1,
          noKeyNav
        },
        on: {
          [EVENT_NAME_CLICK]: event => {
            this.clickTab(tab, event)
          },
          [EVENT_NAME_FIRST]: firstTab,
          [EVENT_NAME_PREV]: previousTab,
          [EVENT_NAME_NEXT]: nextTab,
          [EVENT_NAME_LAST]: lastTab
        },
        key: tab[COMPONENT_UID_KEY] || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        refInFor: true
      })
    })

    let $nav = h(
      BNav,
      {
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
          vertical,
          small: this.small,
          cardHeader: card && !vertical
        },
        ref: 'nav'
      },
      [
        this.normalizeSlot(SLOT_NAME_TABS_START) || h(),
        $buttons,
        this.normalizeSlot(SLOT_NAME_TABS_END) || h()
      ]
    )

    $nav = h(
      'div',
      {
        class: [
          {
            'card-header': card && !vertical && !end,
            'card-footer': card && !vertical && end,
            'col-auto': vertical
          },
          this.navWrapperClass
        ],
        key: 'bv-tabs-nav'
      },
      [$nav]
    )

    let $empty = h()
    if (!tabs || tabs.length === 0) {
      $empty = h(
        'div',
        {
          class: ['tab-pane', 'active', { 'card-body': card }],
          key: 'bv-empty-tab'
        },
        this.normalizeSlot(SLOT_NAME_EMPTY)
      )
    }

    // Main content section
    const $content = h(
      'div',
      {
        staticClass: 'tab-content',
        class: [{ col: vertical }, this.contentClass],
        attrs: { id: this.safeId('_BV_tab_container_') },
        key: 'bv-content',
        ref: 'content'
      },
      [this.normalizeSlot() || $empty]
    )

    // Render final output
    return h(
      this.tag,
      {
        staticClass: 'tabs',
        class: {
          row: vertical,
          'no-gutters': vertical && card
        },
        attrs: { id: this.safeId() }
      },
      [end ? $content : h(), $nav, end ? h() : $content]
    )
  }
})
