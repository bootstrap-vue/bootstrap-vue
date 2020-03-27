import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import { contains } from '../../utils/dom'
import { getComponentConfig } from '../../utils/config'
import { toString } from '../../utils/string'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_REQUEST } from '../../directives/toggle/toggle'
import { BButtonClose } from '../button/button-close'
import { BIconX } from '../../icons/icons'

// --- Constants ---

const NAME = 'BSidebar'
const CLASS_NAME = 'b-sidebar'

// --- Render methods ---
const renderHeader = (h, ctx) => {
  if (ctx.noHeader) {
    return h()
  }

  const { right, closeLabel, textVariant, headerClass, slotScope, hide } = ctx
  const title = ctx.normalizeSlot('title', slotScope) || toString(ctx.title) || null
  const titleId = title ? ctx.safeId('__title__') : null

  const $title = title ? h('strong', { attrs: { id: titleId } }, [title]) : h('span')

  const $close = h(
    BButtonClose,
    {
      props: { ariaLabel: closeLabel, textVariant },
      on: { click: hide }
    },
    [h(BIconX)]
  )

  return h(
    'header',
    {
      staticClass: `${CLASS_NAME}-header`,
      class: headerClass
    },
    right ? [$close, $title] : [$title, $close]
  )
}

const renderBody = (h, ctx) => {
  return h(
    'div',
    {
      staticClass: `${CLASS_NAME}-body`,
      class: ctx.bodyClass
    },
    [ctx.normalizeSlot('default', ctx.slotScope)]
  )
}

const renderFooter = (h, ctx) => {
  const $footer = ctx.normalizeSlot('footer', ctx.slotScope)
  if (!$footer) {
    return h()
  }
  return h(
    'footer',
    {
      staticClass: `${CLASS_NAME}-footer`,
      class: ctx.footerClass
    },
    [$footer]
  )
}

const renderContent = (h, ctx) => {
  // We render the header even if `lazy` is enabled as it
  // acts as the accessible label for the sidebar
  const $header = renderHeader(h, ctx)
  if (ctx.lazy && !ctx.isOpen) {
    return $header
  }
  return [$header, renderBody(h, ctx), renderFooter(h, ctx)]
}

// --- Main component ---
// @vue/component
export const BSidebar = /*#__PURE__*/ Vue.extend({
  name: NAME,
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
      default: () => getComponentConfig(NAME, 'bgVariant')
    },
    textVariant: {
      type: String,
      default: () => getComponentConfig(NAME, 'textVariant')
    },
    shadow: {
      type: [Boolean, String],
      default: () => getComponentConfig(NAME, 'shadow')
    },
    width: {
      type: String,
      default: () => getComponentConfig(NAME, 'width')
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
      // `aria-label` for close button
      // Defaults to 'Close'
      type: String
      // default: undefined
    },
    tag: {
      type: String,
      default: () => getComponentConfig(NAME, 'tag')
    },
    headerClass: {
      type: [String, Array, Object]
      // default: null
    },
    bodyClass: {
      type: [String, Array, Object]
      // default: null
    },
    footerClass: {
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
    noCloseOnRouteChange: {
      type: Boolean,
      default: false
    },
    lazy: {
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
      // internal v-model state
      localShow: false,
      // For lazy render triggering
      isOpen: false
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
    },
    slotScope() {
      return {
        expanded: this.localShow,
        right: this.right,
        hide: this.hide
      }
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localShow = newVal
      }
    },
    localShow(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState(newVal)
        this.$emit('change', newVal)
      }
    },
    $route(newVal = {}, oldVal = {}) /* istanbul ignore next: until tests are created */ {
      if (!this.noCloseOnRouteChange && newVal.fullPath !== oldVal.fullPath) {
        this.hide()
      }
    }
  },
  created() {
    // Define non-reactive properties
    this.$_returnFocusEl = null
    // Set initial show state
    this.localShow = this.show
    // Set initia render state
    this.isOpen = this.show
    // Add `$root` listeners
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
      this.emitOnRoot(EVENT_STATE, this.safeId(), state)
    },
    handleToggle(id) /* istanbul ignore next: until tests are created */ {
      if (id === this.safeId()) {
        this.localShow = !this.localShow
      }
    },
    handleSync(id) /* istanbul ignore next: until tests are created */ {
      if (id === this.safeId()) {
        this.emitState(this.localShow)
      }
    },
    onKeydown(evt) /* istanbul ignore next: until tests are created */ {
      const { keyCode } = evt
      if (!this.noCloseOnEsc && keyCode === KeyCodes.ESC) {
        this.hide()
      }
    },
    onBeforeEnter() {
      this.$_returnFocusEl = null
      try {
        this.$_returnFocusEl = document.activeElement || null
      } catch {}
      // Trigger lazy render
      this.isOpen = true
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
      // Trigger lazy render
      this.isOpen = false
      this.$emit('hidden')
    }
  },
  render(h) {
    const localShow = this.localShow
    const shadow = this.shadow === '' ? true : this.shadow
    const title = this.normalizeSlot('title', this.slotScope) || toString(this.title) || null
    const titleId = title ? this.safeId('__title__') : null
    const ariaLabel = this.ariaLabel || null
    // `ariaLabel` takes precedence over `ariaLabelledby`
    const ariaLabelledby = this.ariaLabelledby || titleId || null

    const $sidebar = h(
      this.tag,
      {
        directives: [{ name: 'show', value: localShow }],
        staticClass: CLASS_NAME,
        class: {
          shadow: shadow === true,
          [`shadow-${shadow}`]: shadow && shadow !== true,
          [`${CLASS_NAME}-right`]: this.right,
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
      [renderContent(h, this)]
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
