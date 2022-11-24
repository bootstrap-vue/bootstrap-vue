import { COMPONENT_UID_KEY, REF_FOR_KEY, extend } from '../../vue'
import { NAME_TABS, NAME_TAB_BUTTON_HELPER } from '../../constants/components'
import { IS_BROWSER } from '../../constants/env'
import {
  EVENT_NAME_ACTIVATE_TAB,
  EVENT_NAME_CHANGED,
  EVENT_NAME_CLICK,
  EVENT_NAME_FIRST,
  EVENT_NAME_LAST,
  EVENT_NAME_NEXT,
  EVENT_NAME_PREV
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
import { attemptFocus, selectAll, requestAF } from '../../utils/dom'
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
const BVTabButton = /*#__PURE__*/ extend({
  name: NAME_TAB_BUTTON_HELPER,
  inject: {
    getBvTabs: {
      default: /* istanbul ignore next */ () => () => ({})
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
    tabIndex: makeProp(PROP_TYPE_NUMBER)
  },
  computed: {
    bvTabs() {
      return this.getBvTabs()
    }
  },
  methods: {
    focus() {
      attemptFocus(this.$refs.link)
    },
    handleEvent(event) {
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
    const { id, tabIndex, setSize, posInSet, controls, handleEvent } = this
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
          click: handleEvent,
          keydown: handleEvent
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
export const BTabs = /*#__PURE__*/ extend({
  name: NAME_TABS,
  mixins: [idMixin, modelMixin, normalizeSlotMixin],
  provide() {
    return {
      getBvTabs: () => this
    }
  },
  props,
  data() {
    return {
      // Index of current tab
      currentTab: toInteger(this[MODEL_PROP_NAME], -1),
      // Array of direct child `<b-tab>` instances, in DOM order
      tabs: [],
      // Array of child instances registered (for triggering reactive updates)
      registeredTabs: []
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
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        newValue = toInteger(newValue, -1)
        oldValue = toInteger(oldValue, 0)

        const $tab = this.tabs[newValue]
        if ($tab && !$tab.disabled) {
          this.activateTab($tab)
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
    currentTab(newValue) {
      let index = -1

      // Ensure only one tab is active at most
      this.tabs.forEach(($tab, i) => {
        if (i === newValue && !$tab.disabled) {
          $tab.localActive = true
          index = i
        } else {
          $tab.localActive = false
        }
      })

      // Update the v-model
      this.$emit(MODEL_EVENT_NAME, index)
    },
    // If tabs added, removed, or re-ordered, we emit a `changed` event
    tabs(newValue, oldValue) {
      // We use `_uid` instead of `safeId()`, as the later is changed in a `$nextTick()`
      // if no explicit ID is provided, causing duplicate emits
      if (
        !looseEqual(
          newValue.map($tab => $tab[COMPONENT_UID_KEY]),
          oldValue.map($tab => $tab[COMPONENT_UID_KEY])
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
    // Each `<b-tab>` will register/unregister itself
    // We use this to detect when tabs are added/removed
    // to trigger the update of the tabs
    registeredTabs() {
      this.updateTabs()
    }
  },
  created() {
    // Create private non-reactive props
    this.$_observer = null
  },
  mounted() {
    this.setObserver(true)
  },
  beforeDestroy() {
    this.setObserver(false)
    // Ensure no references to child instances exist
    this.tabs = []
  },
  methods: {
    registerTab($tab) {
      if (!arrayIncludes(this.registeredTabs, $tab)) {
        this.registeredTabs.push($tab)
      }
    },
    unregisterTab($tab) {
      this.registeredTabs = this.registeredTabs.slice().filter($t => $t !== $tab)
    },
    // DOM observer is needed to detect changes in order of tabs
    setObserver(on = true) {
      this.$_observer && this.$_observer.disconnect()
      this.$_observer = null

      if (on) {
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */
        const handler = () => {
          this.$nextTick(() => {
            requestAF(() => {
              this.updateTabs()
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
      const $tabs = this.registeredTabs
      // Dropped intentionally
      // .filter(
      //   $tab => $tab.$children.filter($t => $t && $t._isTab).length === 0
      // )

      // DOM Order of Tabs
      let order = []
      /* istanbul ignore next: too difficult to test */
      if (IS_BROWSER && $tabs.length > 0) {
        // We rely on the DOM when mounted to get the "true" order of the `<b-tab>` children
        // `querySelectorAll()` always returns elements in document order, regardless of
        // order specified in the selector
        const selector = $tabs.map($tab => `#${$tab.safeId()}`).join(', ')
        order = selectAll(selector, this.$el)
          .map($el => $el.id)
          .filter(identity)
      }

      // Stable sort keeps the original order if not found in the `order` array,
      // which will be an empty array before mount
      return stableSort($tabs, (a, b) => order.indexOf(a.safeId()) - order.indexOf(b.safeId()))
    },
    updateTabs() {
      const $tabs = this.getTabs()

      // Find last active non-disabled tab in current tabs
      // We trust tab state over `currentTab`, in case tabs were added/removed/re-ordered
      let tabIndex = $tabs.indexOf(
        $tabs
          .slice()
          .reverse()
          .find($tab => $tab.localActive && !$tab.disabled)
      )

      // Else try setting to `currentTab`
      if (tabIndex < 0) {
        const { currentTab } = this
        if (currentTab >= $tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = $tabs.indexOf(
            $tabs
              .slice()
              .reverse()
              .find(notDisabled)
          )
        } else if ($tabs[currentTab] && !$tabs[currentTab].disabled) {
          // Current tab is not disabled
          tabIndex = currentTab
        }
      }

      // Else find first non-disabled tab in current tabs
      if (tabIndex < 0) {
        tabIndex = $tabs.indexOf($tabs.find(notDisabled))
      }

      // Ensure only one tab is active at a time
      $tabs.forEach(($tab, index) => {
        $tab.localActive = index === tabIndex
      })

      this.tabs = $tabs
      this.currentTab = tabIndex
    },
    // Find a button that controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab($tab) {
      return (this.$refs.buttons || []).find($btn => $btn.tab === $tab)
    },
    // Force a button to re-render its content, given a `<b-tab>` instance
    // Called by `<b-tab>` on `update()`
    updateButton($tab) {
      const $button = this.getButtonForTab($tab)
      if ($button && $button.$forceUpdate) {
        $button.$forceUpdate()
      }
    },
    // Activate a tab given a `<b-tab>` instance
    // Also accessed by `<b-tab>`
    activateTab($tab) {
      const { currentTab, tabs: $tabs } = this
      let result = false

      if ($tab) {
        const index = $tabs.indexOf($tab)
        if (index !== currentTab && index > -1 && !$tab.disabled) {
          const tabEvent = new BvEvent(EVENT_NAME_ACTIVATE_TAB, {
            cancelable: true,
            vueTarget: this,
            componentId: this.safeId()
          })

          this.$emit(tabEvent.type, index, currentTab, tabEvent)

          if (!tabEvent.defaultPrevented) {
            this.currentTab = index
            result = true
          }
        }
      }

      // Couldn't set tab, so ensure v-model is up to date
      /* istanbul ignore next: should rarely happen */
      if (!result && this[MODEL_PROP_NAME] !== currentTab) {
        this.$emit(MODEL_EVENT_NAME, currentTab)
      }

      return result
    },
    // Deactivate a tab given a `<b-tab>` instance
    // Accessed by `<b-tab>`
    deactivateTab($tab) {
      if ($tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter($t => $t !== $tab).find(notDisabled))
      }
      /* istanbul ignore next: should never/rarely happen */
      return false
    },
    // Focus a tab button given its `<b-tab>` instance
    focusButton($tab) {
      // Wrap in `$nextTick()` to ensure DOM has completed rendering
      this.$nextTick(() => {
        attemptFocus(this.getButtonForTab($tab))
      })
    },
    // Emit a click event on a specified `<b-tab>` component instance
    emitTabClick(tab, event) {
      if (isEvent(event) && tab && tab.$emit && !tab.disabled) {
        tab.$emit(EVENT_NAME_CLICK, event)
      }
    },
    // Click handler
    clickTab($tab, event) {
      this.activateTab($tab)
      this.emitTabClick($tab, event)
    },
    // Move to first non-disabled tab
    firstTab(focus) {
      const $tab = this.tabs.find(notDisabled)
      if (this.activateTab($tab) && focus) {
        this.focusButton($tab)
        this.emitTabClick($tab, focus)
      }
    },
    // Move to previous non-disabled tab
    previousTab(focus) {
      const currentIndex = mathMax(this.currentTab, 0)
      const $tab = this.tabs
        .slice(0, currentIndex)
        .reverse()
        .find(notDisabled)
      if (this.activateTab($tab) && focus) {
        this.focusButton($tab)
        this.emitTabClick($tab, focus)
      }
    },
    // Move to next non-disabled tab
    nextTab(focus) {
      const currentIndex = mathMax(this.currentTab, -1)
      const $tab = this.tabs.slice(currentIndex + 1).find(notDisabled)
      if (this.activateTab($tab) && focus) {
        this.focusButton($tab)
        this.emitTabClick($tab, focus)
      }
    },
    // Move to last non-disabled tab
    lastTab(focus) {
      const $tab = this.tabs
        .slice()
        .reverse()
        .find(notDisabled)
      if (this.activateTab($tab) && focus) {
        this.focusButton($tab)
        this.emitTabClick($tab, focus)
      }
    }
  },
  render(h) {
    const {
      align,
      card,
      end,
      fill,
      firstTab,
      justified,
      lastTab,
      nextTab,
      noKeyNav,
      noNavStyle,
      pills,
      previousTab,
      small,
      tabs: $tabs,
      vertical
    } = this

    // Currently active tab
    const $activeTab = $tabs.find($tab => $tab.localActive && !$tab.disabled)

    // Tab button to allow focusing when no active tab found (keynav only)
    const $fallbackTab = $tabs.find($tab => !$tab.disabled)

    // For each `<b-tab>` found create the tab buttons
    const $buttons = $tabs.map(($tab, index) => {
      const { safeId } = $tab

      // Ensure at least one tab button is focusable when keynav enabled (if possible)
      let tabIndex = null
      if (!noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1
        if ($tab === $activeTab || (!$activeTab && $tab === $fallbackTab)) {
          // Place tab button in tab sequence
          tabIndex = null
        }
      }

      return h(BVTabButton, {
        props: {
          controls: safeId ? safeId() : null,
          id: $tab.controlledBy || (safeId ? safeId(`_BV_tab_button_`) : null),
          noKeyNav,
          posInSet: index + 1,
          setSize: $tabs.length,
          tab: $tab,
          tabIndex
        },
        on: {
          [EVENT_NAME_CLICK]: event => {
            this.clickTab($tab, event)
          },
          [EVENT_NAME_FIRST]: firstTab,
          [EVENT_NAME_PREV]: previousTab,
          [EVENT_NAME_NEXT]: nextTab,
          [EVENT_NAME_LAST]: lastTab
        },
        key: $tab[COMPONENT_UID_KEY] || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        [REF_FOR_KEY]: true
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
          fill,
          justified,
          align,
          tabs: !noNavStyle && !pills,
          pills: !noNavStyle && pills,
          vertical,
          small,
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

    const $children = this.normalizeSlot() || []

    let $empty = h()
    if ($children.length === 0) {
      $empty = h(
        'div',
        {
          class: ['tab-pane', 'active', { 'card-body': card }],
          key: 'bv-empty-tab'
        },
        this.normalizeSlot(SLOT_NAME_EMPTY)
      )
    }

    const $content = h(
      'div',
      {
        staticClass: 'tab-content',
        class: [{ col: vertical }, this.contentClass],
        attrs: { id: this.safeId('_BV_tab_container_') },
        key: 'bv-content',
        ref: 'content'
      },
      [$children, $empty]
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
