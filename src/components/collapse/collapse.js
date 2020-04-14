import Vue from '../../utils/vue'
import { BVCollapse } from '../../utils/bv-collapse'
import { addClass, hasClass, removeClass, closest, matches, getCS } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { EVENT_OPTIONS_NO_CAPTURE, eventOnOff } from '../../utils/events'
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

// Accordion event name we emit on `$root`
const EVENT_ACCORDION = 'bv::collapse::accordion'

// --- Main component ---
// @vue/component
export const BCollapse = /*#__PURE__*/ Vue.extend({
  name: 'BCollapse',
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin],
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    isNav: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: String
      // default: null
    },
    visible: {
      type: Boolean,
      default: false
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
  data() {
    return {
      show: this.visible,
      transitioning: false
    }
  },
  computed: {
    classObject() {
      return {
        'navbar-collapse': this.isNav,
        collapse: !this.transitioning,
        show: this.show && !this.transitioning
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal !== this.show) {
        this.show = newVal
      }
    },
    show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState()
      }
    }
  },
  created() {
    this.show = this.visible
  },
  mounted() {
    this.show = this.visible
    // Listen for toggle events to open/close us
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt)
    // Listen to other collapses for accordion events
    this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt)
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
  deactivated() /* istanbul ignore next */ {
    if (this.isNav) {
      this.setWindowEvents(false)
    }
  },
  /* istanbul ignore next */
  activated() /* istanbul ignore next */ {
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
      this.$emit('show')
    },
    onAfterEnter() {
      this.transitioning = false
      this.$emit('shown')
    },
    onLeave() {
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit('hide')
    },
    onAfterLeave() {
      this.transitioning = false
      this.$emit('hidden')
    },
    emitState() {
      this.$emit('input', this.show)
      // Let `v-b-toggle` know the state of this collapse
      this.emitOnRoot(EVENT_STATE, this.safeId(), this.show)
      if (this.accordion && this.show) {
        // Tell the other collapses in this accordion to close
        this.emitOnRoot(EVENT_ACCORDION, this.safeId(), this.accordion)
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
      const restore = hasClass(this.$el, 'show')
      removeClass(this.$el, 'show')
      const isBlock = getCS(this.$el).display === 'block'
      if (restore) {
        addClass(this.$el, 'show')
      }
      return isBlock
    },
    clickHandler(evt) {
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      const el = evt.target
      if (!this.isNav || !el || getCS(this.$el).display !== 'block') {
        /* istanbul ignore next: can't test getComputedStyle in JSDOM */
        return
      }
      if (matches(el, '.nav-link,.dropdown-item') || closest('.nav-link,.dropdown-item', el)) {
        if (!this.checkDisplayBlock()) {
          // Only close the collapse if it is not forced to be `display: block !important`
          this.show = false
        }
      }
    },
    handleToggleEvt(target) {
      if (target !== this.safeId()) {
        return
      }
      this.toggle()
    },
    handleAccordionEvt(openedId, accordion) {
      if (!this.accordion || accordion !== this.accordion) {
        return
      }
      if (openedId === this.safeId()) {
        // Open this collapse if not shown
        if (!this.show) {
          this.toggle()
        }
      } else {
        // Close this collapse if shown
        if (this.show) {
          this.toggle()
        }
      }
    },
    handleResize() {
      // Handler for orientation/resize to set collapsed state in nav/navbar
      this.show = getCS(this.$el).display === 'block'
    }
  },
  render(h) {
    const scope = {
      visible: this.show,
      close: () => (this.show = false)
    }
    const content = h(
      this.tag,
      {
        class: this.classObject,
        directives: [{ name: 'show', value: this.show }],
        attrs: { id: this.safeId() },
        on: { click: this.clickHandler }
      },
      [this.normalizeSlot('default', scope)]
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
      [content]
    )
  }
})
