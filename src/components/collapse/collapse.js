import listenOnRootMixin from '../../mixins/listen-on-root'
import { inBrowser } from '../../utils/env'
import { closest, matches, reflow, getCS, getBCR, eventOn, eventOff } from '../../utils/dom'

// Events we emit on $root
const EVENT_STATE = 'bv::collapse::state'
const EVENT_ACCORDION = 'bv::collapse::accordion'
// Events we listen to on $root
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Event Listener options
const EventOptions = { passive: true, capture: false }

// @vue/component
export default {
  name: 'BCollapse',
  mixins: [listenOnRootMixin],
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isNav: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
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
    // Listen for toggle events to open/close us
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt)
    // Listen to other collapses for accordion events
    this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt)
  },
  mounted() {
    if (this.isNav && inBrowser) {
      // Set up handlers
      this.setWindowEvents(true)
      this.handleResize()
    }
    this.emitState()
  },
  deactivated() /* istanbul ignore next */ {
    if (this.isNav && inBrowser) {
      this.setWindowEvents(false)
    }
  },
  activated() /* istanbul ignore next */ {
    if (this.isNav && inBrowser) {
      this.setWindowEvents(true)
    }
  },
  updated() {
    this.$root.$emit(EVENT_STATE, this.id, this.show)
  },
  beforeDestroy() /* istanbul ignore next */ {
    if (this.isNav && inBrowser) {
      this.setWindowEvents(false)
    }
  },
  methods: {
    setWindowEvents(on) {
      const method = on ? eventOn : eventOff
      method(window, 'resize', this.handleResize, EventOptions)
      method(window, 'orientationchange', this.handleResize, EventOptions)
    },
    toggle() {
      this.show = !this.show
    },
    onEnter(el) {
      el.style.height = 0
      reflow(el)
      el.style.height = el.scrollHeight + 'px'
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit('show')
    },
    onAfterEnter(el) {
      el.style.height = null
      this.transitioning = false
      this.$emit('shown')
    },
    onLeave(el) {
      el.style.height = 'auto'
      el.style.display = 'block'
      el.style.height = getBCR(el).height + 'px'
      reflow(el)
      this.transitioning = true
      el.style.height = 0
      // This should be moved out so we can add cancellable events
      this.$emit('hide')
    },
    onAfterLeave(el) {
      el.style.height = null
      this.transitioning = false
      this.$emit('hidden')
    },
    emitState() {
      this.$emit('input', this.show)
      // Let v-b-toggle know the state of this collapse
      this.$root.$emit(EVENT_STATE, this.id, this.show)
      if (this.accordion && this.show) {
        // Tell the other collapses in this accordion to close
        this.$root.$emit(EVENT_ACCORDION, this.id, this.accordion)
      }
    },
    clickHandler(evt) {
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      const el = evt.target
      if (!this.isNav || !el || getCS(this.$el).display !== 'block') {
        return
      }
      if (matches(el, '.nav-link,.dropdown-item') || closest('.nav-link,.dropdown-item', el)) {
        this.show = false
      }
    },
    handleToggleEvt(target) {
      if (target !== this.id) {
        return
      }
      this.toggle()
    },
    handleAccordionEvt(openedId, accordion) {
      if (!this.accordion || accordion !== this.accordion) {
        return
      }
      if (openedId === this.id) {
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
    const content = h(
      this.tag,
      {
        class: this.classObject,
        directives: [{ name: 'show', value: this.show }],
        attrs: { id: this.id || null },
        on: { click: this.clickHandler }
      },
      [this.$slots.default]
    )
    return h(
      'transition',
      {
        props: {
          enterClass: '',
          enterActiveClass: 'collapsing',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: 'collapsing',
          leaveToClass: ''
        },
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
}
