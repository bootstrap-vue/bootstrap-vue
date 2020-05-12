import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import BVTransition from '../../utils/bv-transition'
import { attemptFocus, contains, getActiveElement, getTabables } from '../../utils/dom'
import { getComponentConfig } from '../../utils/config'
import { isBrowser } from '../../utils/env'
import { toString } from '../../utils/string'
import attrsMixin from '../../mixins/attrs'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import {
  EVENT_TOGGLE,
  EVENT_STATE,
  EVENT_STATE_REQUEST,
  EVENT_STATE_SYNC
} from '../../directives/toggle/toggle'
import { BButtonClose } from '../button/button-close'
import { BIconX } from '../../icons/icons'

// --- Constants ---

const NAME = 'BSidebar'
const CLASS_NAME = 'b-sidebar'

// --- Render methods ---
const renderHeaderTitle = (h, ctx) => {
  const title = ctx.normalizeSlot('title', ctx.slotScope) || toString(ctx.title) || null

  // Render a empty `<span>` when to title was provided
  if (!title) {
    return h('span')
  }

  return h('strong', { attrs: { id: ctx.safeId('__title__') } }, [title])
}

const renderHeaderClose = (h, ctx) => {
  if (ctx.noHeaderClose) {
    return h()
  }

  const { closeLabel, textVariant, hide } = ctx

  return h(
    BButtonClose,
    {
      ref: 'close-button',
      props: { ariaLabel: closeLabel, textVariant },
      on: { click: hide }
    },
    [ctx.normalizeSlot('header-close') || h(BIconX)]
  )
}

const renderHeader = (h, ctx) => {
  if (ctx.noHeader) {
    return h()
  }

  const $title = renderHeaderTitle(h, ctx)
  const $close = renderHeaderClose(h, ctx)

  return h(
    'header',
    {
      key: 'header',
      staticClass: `${CLASS_NAME}-header`,
      class: ctx.headerClass
    },
    ctx.right ? [$close, $title] : [$title, $close]
  )
}

const renderBody = (h, ctx) => {
  return h(
    'div',
    {
      key: 'body',
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
      key: 'footer',
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

const renderBackdrop = (h, ctx) => {
  if (!ctx.backdrop) {
    return h()
  }
  return h('div', {
    directives: [{ name: 'show', value: ctx.localShow }],
    staticClass: 'b-sidebar-backdrop',
    on: { click: ctx.onBackdropClick }
  })
}

// --- Main component ---
// @vue/component
export const BSidebar = /*#__PURE__*/ Vue.extend({
  name: NAME,
  // Mixin order is important!
  mixins: [attrsMixin, idMixin, listenOnRootMixin, normalizeSlotMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
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
    sidebarClass: {
      type: [String, Array, Object]
      // default: null
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
    backdrop: {
      // If true, shows a basic backdrop
      type: Boolean,
      default: false
    },
    noSlide: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noHeaderClose: {
      type: Boolean,
      default: false
    },
    noCloseOnEsc: {
      type: Boolean,
      default: false
    },
    noCloseOnBackdrop: {
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
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Internal `v-model` state
      localShow: !!this.visible,
      // For lazy render triggering
      isOpen: !!this.visible
    }
  },
  computed: {
    transitionProps() {
      return this.noSlide
        ? /* istanbul ignore next */ { css: true }
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
        visible: this.localShow,
        right: this.right,
        hide: this.hide
      }
    },
    computedTile() {
      return this.normalizeSlot('title', this.slotScope) || toString(this.title) || null
    },
    titleId() {
      return this.computedTile ? this.safeId('__title__') : null
    },
    computedAttrs() {
      return {
        ...this.bvAttrs,
        id: this.safeId(),
        tabindex: '-1',
        role: 'dialog',
        'aria-modal': this.backdrop ? 'true' : 'false',
        'aria-hidden': this.localShow ? null : 'true',
        'aria-label': this.ariaLabel || null,
        'aria-labelledby': this.ariaLabelledby || this.titleId || null
      }
    }
  },
  watch: {
    visible(newVal, oldVal) {
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
    /* istanbul ignore next */
    $route(newVal = {}, oldVal = {}) /* istanbul ignore next: pain to mock */ {
      if (!this.noCloseOnRouteChange && newVal.fullPath !== oldVal.fullPath) {
        this.hide()
      }
    }
  },
  created() {
    // Define non-reactive properties
    this.$_returnFocusEl = null
  },
  mounted() {
    // Add `$root` listeners
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggle)
    this.listenOnRoot(EVENT_STATE_REQUEST, this.handleSync)
    // Send out a gratuitous state event to ensure toggle button is synced
    this.$nextTick(() => {
      this.emitState(this.localShow)
    })
  },
  /* istanbul ignore next */
  activated() /* istanbul ignore next */ {
    this.emitSync()
  },
  beforeDestroy() {
    this.localShow = false
    this.$_returnFocusEl = null
  },
  methods: {
    hide() {
      this.localShow = false
    },
    emitState(state = this.localShow) {
      this.emitOnRoot(EVENT_STATE, this.safeId(), state)
    },
    emitSync(state = this.localShow) {
      this.emitOnRoot(EVENT_STATE_SYNC, this.safeId(), state)
    },
    handleToggle(id) {
      // Note `safeId()` can be null until after mount
      if (id && id === this.safeId()) {
        this.localShow = !this.localShow
      }
    },
    handleSync(id) {
      // Note `safeId()` can be null until after mount
      if (id && id === this.safeId()) {
        this.$nextTick(() => {
          this.emitSync(this.localShow)
        })
      }
    },
    onKeydown(evt) {
      const { keyCode } = evt
      if (!this.noCloseOnEsc && keyCode === KeyCodes.ESC && this.localShow) {
        this.hide()
      }
    },
    onBackdropClick() {
      if (this.localShow && !this.noCloseOnBackdrop) {
        this.hide()
      }
    },
    /* istanbul ignore next */
    onTopTrapFocus() /* istanbul ignore next */ {
      const tabables = getTabables(this.$refs.content)
      attemptFocus(tabables.reverse()[0])
    },
    /* istanbul ignore next */
    onBottomTrapFocus() /* istanbul ignore next */ {
      const tabables = getTabables(this.$refs.content)
      attemptFocus(tabables[0])
    },
    onBeforeEnter() {
      // Returning focus to `document.body` may cause unwanted scrolls,
      // so we exclude setting focus on body
      this.$_returnFocusEl = getActiveElement(isBrowser ? [document.body] : [])
      // Trigger lazy render
      this.isOpen = true
    },
    onAfterEnter(el) {
      if (!contains(el, getActiveElement())) {
        attemptFocus(el)
      }
      this.$emit('shown')
    },
    onAfterLeave() {
      attemptFocus(this.$_returnFocusEl)
      this.$_returnFocusEl = null
      // Trigger lazy render
      this.isOpen = false
      this.$emit('hidden')
    }
  },
  render(h) {
    const localShow = this.localShow
    const shadow = this.shadow === '' ? true : this.shadow

    let $sidebar = h(
      this.tag,
      {
        ref: 'content',
        directives: [{ name: 'show', value: localShow }],
        staticClass: CLASS_NAME,
        class: [
          {
            shadow: shadow === true,
            [`shadow-${shadow}`]: shadow && shadow !== true,
            [`${CLASS_NAME}-right`]: this.right,
            [`bg-${this.bgVariant}`]: !!this.bgVariant,
            [`text-${this.textVariant}`]: !!this.textVariant
          },
          this.sidebarClass
        ],
        attrs: this.computedAttrs,
        style: { width: this.width }
      },
      [renderContent(h, this)]
    )

    $sidebar = h(
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

    const $backdrop = h(BVTransition, { props: { noFade: this.noSlide } }, [
      renderBackdrop(h, this)
    ])

    let $tabTrapTop = h()
    let $tabTrapBottom = h()
    if (this.backdrop && this.localShow) {
      $tabTrapTop = h('div', {
        attrs: { tabindex: '0' },
        on: { focus: this.onTopTrapFocus }
      })
      $tabTrapBottom = h('div', {
        attrs: { tabindex: '0' },
        on: { focus: this.onBottomTrapFocus }
      })
    }

    return h(
      'div',
      {
        staticClass: 'b-sidebar-outer',
        style: { zIndex: this.zIndex },
        attrs: { tabindex: '-1' },
        on: { keydown: this.onKeydown }
      },
      [$tabTrapTop, $sidebar, $tabTrapBottom, $backdrop]
    )
  }
})
