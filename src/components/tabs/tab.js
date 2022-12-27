import { extend } from '../../vue'
import { NAME_TAB } from '../../constants/components'
import { MODEL_EVENT_NAME_PREFIX } from '../../constants/events'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_TITLE } from '../../constants/slots'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BVTransition } from '../transition/bv-transition'

// --- Constants ---

const MODEL_PROP_NAME_ACTIVE = 'active'
const MODEL_EVENT_NAME_ACTIVE = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_ACTIVE

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    [MODEL_PROP_NAME_ACTIVE]: makeProp(PROP_TYPE_BOOLEAN, false),
    buttonId: makeProp(PROP_TYPE_STRING),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    lazy: makeProp(PROP_TYPE_BOOLEAN, false),
    noBody: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'div'),
    title: makeProp(PROP_TYPE_STRING),
    // Sniffed by `<b-tabs>` and added to nav `li.nav-item`
    titleItemClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    titleLinkAttributes: makeProp(PROP_TYPE_OBJECT),
    // Sniffed by `<b-tabs>` and added to nav `a.nav-link`
    titleLinkClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
  }),
  NAME_TAB
)

// --- Main component ---

// @vue/component
export const BTab = /*#__PURE__*/ extend({
  name: NAME_TAB,
  mixins: [idMixin, normalizeSlotMixin],
  inject: {
    getBvTabs: {
      default: () => () => ({})
    }
  },
  props,
  data() {
    return {
      localActive: this[MODEL_PROP_NAME_ACTIVE] && !this.disabled
    }
  },
  computed: {
    bvTabs() {
      return this.getBvTabs()
    },
    // For parent sniffing of child
    _isTab() {
      return true
    },
    tabClasses() {
      const { localActive: active, disabled } = this

      return [
        {
          active,
          disabled,
          'card-body': this.bvTabs.card && !this.noBody
        },
        // Apply <b-tabs> `activeTabClass` styles when this tab is active
        active ? this.bvTabs.activeTabClass : null
      ]
    },
    controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__')
    },
    computedNoFade() {
      return !(this.bvTabs.fade || false)
    },
    computedLazy() {
      return this.bvTabs.lazy || this.lazy
    }
  },
  watch: {
    [MODEL_PROP_NAME_ACTIVE](newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          // If activated post mount
          this.activate()
        } else {
          /* istanbul ignore next */
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate
            this.$emit(MODEL_EVENT_NAME_ACTIVE, this.localActive)
          }
        }
      }
    },
    disabled(newValue, oldValue) {
      if (newValue !== oldValue) {
        const { firstTab } = this.bvTabs
        if (newValue && this.localActive && firstTab) {
          this.localActive = false
          firstTab()
        }
      }
    },
    localActive(newValue) {
      // Make `active` prop work with `.sync` modifier
      this.$emit(MODEL_EVENT_NAME_ACTIVE, newValue)
    }
  },
  mounted() {
    // Inform `<b-tabs>` of our presence
    this.registerTab()
  },
  updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    const { updateButton } = this.bvTabs
    if (updateButton && this.hasNormalizedSlot(SLOT_NAME_TITLE)) {
      updateButton(this)
    }
  },
  beforeDestroy() {
    // Inform `<b-tabs>` of our departure
    this.unregisterTab()
  },
  methods: {
    // Private methods
    registerTab() {
      // Inform `<b-tabs>` of our presence
      const { registerTab } = this.bvTabs
      if (registerTab) {
        registerTab(this)
      }
    },
    unregisterTab() {
      // Inform `<b-tabs>` of our departure
      const { unregisterTab } = this.bvTabs
      if (unregisterTab) {
        unregisterTab(this)
      }
    },
    // Public methods
    activate() {
      // Not inside a `<b-tabs>` component or tab is disabled
      const { activateTab } = this.bvTabs
      return activateTab && !this.disabled ? activateTab(this) : false
    },
    deactivate() {
      // Not inside a `<b-tabs>` component or not active to begin with
      const { deactivateTab } = this.bvTabs
      return deactivateTab && this.localActive ? deactivateTab(this) : false
    }
  },
  render(h) {
    const { localActive } = this

    const $content = h(
      this.tag,
      {
        staticClass: 'tab-pane',
        class: this.tabClasses,
        directives: [{ name: 'show', value: localActive }],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          'aria-hidden': localActive ? 'false' : 'true',
          'aria-labelledby': this.controlledBy || null
        },
        ref: 'panel'
      },
      // Render content lazily if requested
      [localActive || !this.computedLazy ? this.normalizeSlot() : h()]
    )

    return h(
      BVTransition,
      {
        props: {
          mode: 'out-in',
          noFade: this.computedNoFade
        }
      },
      [$content]
    )
  }
})
