import Vue from '../../utils/vue'
import { contains } from '../../utils/dom'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_REQUEST } from '../../directives/toggle/toggle'

// TODO:
//  - Listen for other sidebars opening and close self

const EVENT_SIDEBAR = 'bv::sidebar::show'

// @vue/component
export const BSidebar = /*#__PURE__*/ Vue.extend({
  name: 'BSidebar',
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin],
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    right: {
      type: Boolean,
      default: false
    },
    bgVariant: {
      type: String,
      default: 'light'
    },
    textVariant: {
      type: String,
      default: 'dark'
    },
    tag: {
      type: String,
      default: 'div'
    },
    show: {
      type: Boolean,
      default: false
    },
    noSlide: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: [Boolean, String],
      default: false;
    }
  },
  data() {
    return {
      localShow: false
    }
  },
  computed: {
    transitionProps() {
      return this.noSlide
        ? { css: true }
        : {
            css: true,
            enterClass: 'd-none',
            enterActiveClass: 'slide',
            enterToClass: 'show',
            leaveClass: 'show',
            leaveActiveClass: 'slide',
            leaveToClass: 'd-none'
          }
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (!!newVal !== !!oldVal) {
        this.localShow = !!newVal
      }
    },
    localShow(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState(newVal)
        this.$emit('input', newVal)
      }
    }
  },
  created() {
    this.$_returnFocusEl = null
    this.localShow = !!this.show
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggle)
    this.listenOnRoot(EVENT_STATE_REQUEST, this.handleSync)
    this.listenOnRoot(EVENT_SIDEBAR, this.handleOthers)
  },
  beforeDestroy() {
    this.localShow = false
    this.$_returnFocusEl = null
  },
  methods: {
    emitState(state = this.localShow) {
      this.$root.$emit(EVENT_STATE, this.safeId(), state)
    },
    handleToggle(id, show) /* istanbul ignore next: until tests are created */ {
      if (id && id === this.safeId()) {
        this.localShow = !!show
      }
    },
    handleSync(id) /* istanbul ignore next: until tests are created */ {
      if (id && id === this.safeId()) {
        this.emitState(this.localShow)
      }
    },
    handleOthers(id) /* istanbul ignore next: until tests are created */ {
      // Close self when another sidebar opens
      if (id && id !== this.safeId()) {
        this.localShow = false
      }
    },
    onBeforeEnter() {
      this.$_returnFocusEl = null
      try {
        this.$_returnFocusEl = document.activeElement || null
      } catch {}
      this.$root.$emit(EVENT_SIDEBAR, this.safeId())
    },
    onAfterEnter(el) {
      try {
        if (!contains(el, document.activeElement)) {
          el.focus()
        }
      } catch {}
      this.$emit('shown')
    },
    onAfterLeave() {
      try {
        this.$_returnFocusEl.focus()
      } catch {}
      this.$_returnFocusEl = null
      this.$emit('hidden')
    }
  },
  render(h) {
    const localShow = !!this.localShow
    const shadow = this.shadow === '' ? true : this.shadow

    let $sidebar = h()
    if (localShow) {
      $sidebar = h(
        this.tag,
        {
          staticClass: 'b-sidebar',
          class: {
            shadow: shadow === true,
            [`shadow-${shadow}]: shadow && shadow !== true,
            'b-sidebar-right': this.right,
            [`bg-${this.bgVariant}`]: !!this.bgVariant,
            [`text-${this.textVariant}`]: !!this.textVariant
          },
          attrs: {
            id: this.safeId(),
            tabindex: '-1'
          }
        },
        [this.normalizeSlot('default', { expanded: localShow })]
      )
    }

    return h(
      'transition',
      {
        props: this.transitionProps,
        on: {
          beforeEnter: this.onBeforeEnter,
          afterEnter: this.onAfterEnter,
          afterLeave: this.onAfterLeave
        }
      },
      [$sidebar]
    )
  }
})
