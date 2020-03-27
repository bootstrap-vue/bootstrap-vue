import Vue from '../../utils/vue'
import { contains } from '../../utils/dom'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_REQUEST } from '../../directives/toggle/toggle'

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
      default: false
    },
    width: {
      type: String
      // default: null
    },
    zIndex: {
      type: [Number, String]
      // default: null
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
            enterClass: '',
            enterActiveClass: 'slide',
            enterToClass: 'show',
            leaveClass: 'show',
            leaveActiveClass: 'slide',
            leaveToClass: ''
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
  },
  beforeDestroy() {
    this.localShow = false
    this.$_returnFocusEl = null
  },
  methods: {
    hide() /* istanbul ignore next: until tests are created */ {
      this.localShow = false
    },
    emitState(state = this.localShow) {
      this.$root.$emit(EVENT_STATE, this.safeId(), state)
    },
    handleToggle(id) /* istanbul ignore next: until tests are created */ {
      if (id && id === this.safeId()) {
        this.localShow = !this.localShow
      }
    },
    handleSync(id) /* istanbul ignore next: until tests are created */ {
      if (id && id === this.safeId()) {
        this.emitState(this.localShow)
      }
    },
    onBeforeEnter() {
      this.$_returnFocusEl = null
      try {
        this.$_returnFocusEl = document.activeElement || null
      } catch {}
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

    const $sidebar = h(
      this.tag,
      {
        directives: [{ name: 'show', value: localShow }],
        staticClass: 'b-sidebar',
        class: {
          shadow: shadow === true,
          [`shadow-${shadow}`]: shadow && shadow !== true,
          'b-sidebar-right': this.right,
          [`bg-${this.bgVariant}`]: !!this.bgVariant,
          [`text-${this.textVariant}`]: !!this.textVariant
        },
        attrs: {
          id: this.safeId(),
          tabindex: '-1',
          role: 'dialog',
          'aria-modal': 'false',
          'aria-hidden': localShow ? 'true' : null
        },
        style: { width: this.width, zIndex: this.zIndex }
      },
      [this.normalizeSlot('default', { expanded: localShow, hide: this.hide })]
    )

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