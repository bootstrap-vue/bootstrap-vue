import { defineComponent, h, resolveDirective } from '../../vue'
import { NAME_COLLAPSE } from '../../constants/components'
import { CLASS_NAME_SHOW } from '../../constants/class-names'
import {
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_OPTIONS_NO_CAPTURE
} from '../../constants/events'
import { SLOT_NAME_DEFAULT } from '../../constants/slots'
import { BVCollapse } from '../../utils/bv-collapse'
import { makePropsConfigurable } from '../../utils/config'
import { addClass, hasClass, removeClass, closest, matches, getCS } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { getRootEventName, eventOnOff } from '../../utils/events'
import { makeModelMixin } from '../../utils/model'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import {
  EVENT_TOGGLE,
  EVENT_STATE,
  EVENT_STATE_REQUEST,
  EVENT_STATE_SYNC
} from '../../directives/toggle/toggle'

// --- Constants ---

const PROP_NAME_VISIBLE = 'visible'

const ROOT_EVENT_NAME_COLLAPSE_ACCORDION = getRootEventName(NAME_COLLAPSE, 'accordion')

const { mixin: modelMixin, event: EVENT_NAME_UPDATE_VISIBLE } = makeModelMixin(PROP_NAME_VISIBLE)

// --- Main component ---
// @vue/component
export const BCollapse = /*#__PURE__*/ defineComponent({
  name: NAME_COLLAPSE,
  mixins: [idMixin, modelMixin, normalizeSlotMixin, listenOnRootMixin],
  props: makePropsConfigurable(
    {
      [PROP_NAME_VISIBLE]: {
        type: Boolean,
        default: false
      },
      isNav: {
        type: Boolean,
        default: false
      },
      accordion: {
        type: String
        // default: null
      },
      tag: {
        type: String,
        default: 'div'
      },
      appear: {
        // If `true` (and `visible` is `true` on mount), animate initially visible
        type: Boolean,
        default: false
      }
    },
    NAME_COLLAPSE
  ),
  emits: [EVENT_NAME_HIDDEN, EVENT_NAME_HIDE, EVENT_NAME_SHOW, EVENT_NAME_SHOWN],
  data() {
    return {
      show: this[PROP_NAME_VISIBLE],
      transitioning: false
    }
  },
  computed: {
    classObject() {
      const { transitioning } = this

      return {
        'navbar-collapse': this.isNav,
        collapse: !transitioning,
        show: this.show && !transitioning
      }
    },
    slotScope() {
      return {
        visible: this.show,
        close: () => {
          this.show = false
        }
      }
    }
  },
  watch: {
    [PROP_NAME_VISIBLE](newValue) {
      if (newValue !== this.show) {
        this.show = newValue
      }
    },
    show(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.emitState()
      }
    }
  },
  created() {
    this.show = this[PROP_NAME_VISIBLE]
  },
  mounted() {
    this.show = this[PROP_NAME_VISIBLE]
    // Listen for toggle events to open/close us
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt)
    // Listen to other collapses for accordion events
    this.listenOnRoot(ROOT_EVENT_NAME_COLLAPSE_ACCORDION, this.handleAccordionEvt)
    if (this.isNav) {
      // Set up handlers
      this.setWindowEvents(true)
      this.handleResize()
    }
    this.$nextTick(() => {
      this.emitState()
    })
    // Listen for "Sync state" requests from `v-b-toggle`
    this.listenOnRoot(EVENT_STATE_REQUEST, id => {
      if (id === this.safeId()) {
        this.$nextTick(this.emitSync)
      }
    })
  },
  updated() {
    // Emit a private event every time this component updates to ensure
    // the toggle button is in sync with the collapse's state
    // It is emitted regardless if the visible state changes
    this.emitSync()
  },
  /* istanbul ignore next */
  deactivated() {
    if (this.isNav) {
      this.setWindowEvents(false)
    }
  },
  /* istanbul ignore next */
  activated() {
    if (this.isNav) {
      this.setWindowEvents(true)
    }
    this.emitSync()
  },
  beforeDestroy() {
    // Trigger state emit if needed
    this.show = false
    if (this.isNav && isBrowser) {
      this.setWindowEvents(false)
    }
  },
  methods: {
    setWindowEvents(on) {
      eventOnOff(on, window, 'resize', this.handleResize, EVENT_OPTIONS_NO_CAPTURE)
      eventOnOff(on, window, 'orientationchange', this.handleResize, EVENT_OPTIONS_NO_CAPTURE)
    },
    toggle() {
      this.show = !this.show
    },
    onEnter() {
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit(EVENT_NAME_SHOW)
    },
    onAfterEnter() {
      this.transitioning = false
      this.$emit(EVENT_NAME_SHOWN)
    },
    onLeave() {
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit(EVENT_NAME_HIDE)
    },
    onAfterLeave() {
      this.transitioning = false
      this.$emit(EVENT_NAME_HIDDEN)
    },
    emitState() {
      const { show, accordion } = this
      const id = this.safeId()

      this.$emit(EVENT_NAME_UPDATE_VISIBLE, show)

      // Let `v-b-toggle` know the state of this collapse
      this.emitOnRoot(EVENT_STATE, id, show)
      if (accordion && show) {
        // Tell the other collapses in this accordion to close
        this.emitOnRoot(ROOT_EVENT_NAME_COLLAPSE_ACCORDION, id, accordion)
      }
    },
    emitSync() {
      // Emit a private event every time this component updates to ensure
      // the toggle button is in sync with the collapse's state
      // It is emitted regardless if the visible state changes
      this.emitOnRoot(EVENT_STATE_SYNC, this.safeId(), this.show)
    },
    checkDisplayBlock() {
      // Check to see if the collapse has `display: block !important` set
      // We can't set `display: none` directly on `this.$el`, as it would
      // trigger a new transition to start (or cancel a current one)
      const { $el } = this
      const restore = hasClass($el, CLASS_NAME_SHOW)
      removeClass($el, CLASS_NAME_SHOW)
      const isBlock = getCS($el).display === 'block'
      if (restore) {
        addClass($el, CLASS_NAME_SHOW)
      }
      return isBlock
    },
    clickHandler(evt) {
      const { target } = evt
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      /* istanbul ignore next: can't test `getComputedStyle()` in JSDOM */
      if (!this.isNav || !target || getCS(this.$el).display !== 'block') {
        return
      }
      // Only close the collapse if it is not forced to be `display: block !important`
      if (
        (matches(target, '.nav-link,.dropdown-item') ||
          closest('.nav-link,.dropdown-item', target)) &&
        !this.checkDisplayBlock()
      ) {
        this.show = false
      }
    },
    handleToggleEvt(id) {
      if (id === this.safeId()) {
        this.toggle()
      }
    },
    handleAccordionEvt(openedId, openAccordion) {
      const { accordion, show } = this
      if (!accordion || accordion !== openAccordion) {
        return
      }
      const isThis = openedId === this.safeId()
      // Open this collapse if not shown or
      // close this collapse if shown
      if ((isThis && !show) || (!isThis && show)) {
        this.toggle()
      }
    },
    handleResize() {
      // Handler for orientation/resize to set collapsed state in nav/navbar
      this.show = getCS(this.$el).display === 'block'
    }
  },
  render() {
    const $content = h(
      this.tag,
      {
        class: this.classObject,
        directives: [{ name: resolveDirective('show'), value: this.show }],
        attrs: { id: this.safeId() },
        on: { click: this.clickHandler }
      },
      this.normalizeSlot(SLOT_NAME_DEFAULT, this.slotScope)
    )

    return h(
      BVCollapse,
      {
        props: { appear: this.appear },
        on: {
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          leave: this.onLeave,
          afterLeave: this.onAfterLeave
        }
      },
      [$content]
    )
  }
})
