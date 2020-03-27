import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import { contains } from '../../utils/dom'
import { toString } from '../../utils/string'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_REQUEST } from '../../directives/toggle/toggle'
import { BButtonClose } from '../button/button-close'
import { BIconX } from '../../icons/icons'

// @vue/component
export const BSidebar = /*#__PURE__*/ Vue.extend({
  name: 'BSidebar',
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin],
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    title: {
      type: String
      // default: null
    },
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
    },
    ariaLabel: {
      type: String
      // default: null
    },
    ariaLabelledby: {
      type: String
      // default: null
    },
    closeLabel: {
      // `aria-label` for close button. Defaults to 'Close'
      type: String
      // default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    headerClass: {
      type: [String, Array, Object]
      // default: null
    },
    noSlide: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noCloseOnEsc: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
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
        this.$emit('change', newVal)
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
    onKeydown(evt) /* istanbul ignore next: until tests are created */ {
      if (!this.noCloseOnEsc && evt && evt.keyCode === KeyCodes.ESC) {
        this.hide()
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
    const right = !!this.right
    const scope = { expanded: localShow, hide: this.hide, right }
    const title = this.normalizeSlot('title', scope) || toString(this.title) || null
    const titleId = title ? this.safeId('__title__') : null
    const ariaLabel = this.ariaLabel || null
    // `ariaLabel` takes precedence over `ariaLabelledby`
    const ariaLabelledby = this.ariaLabelledby || titleId || null

    let $header = h()
    if (!this.noHeader) {
      const $title = title ? h('strong', { attrs: { id: titleId } }, [title]) : h('span')
      const $close = h(
        BButtonClose,
        {
          props: { ariaLabel: this.closeLabel, textVariant: this.textVariant },
          on: { click: this.hide }
        },
        [h(BIconX)]
      )
      $header = right ? [$close, $title] : [$title, $close]
      $header = h('header', { staticClass: 'b-sidebar-header', class: this.headerClass }, $header)
    }

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
          'aria-hidden': localShow ? 'true' : null,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledby
        },
        style: { width: this.width, zIndex: this.zIndex },
        on: { keydown: this.onKeydown }
      },
      // TODO: Add in optional lazy render of default slot
      [$header, this.normalizeSlot('default', scope)]
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
