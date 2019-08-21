import Vue from '../../utils/vue'
import { BVTooltip } from '../../utils/bv-tooltip'
import { isArray, arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { isString } from '../../utils/inspect'
import { HTMLElement } from '../../utils/safe-types'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const NAME = 'BTooltip'

// TODO:
//   Move many of the common methods/etc to a mixin
// @vue/component
export const BTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  props: {
    target: {
      // String ID of element, or element/component reference
      // Or function that returns one of the above
      type: [String, HTMLElement, Function, Object],
      // default: undefined,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    },
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip',
      validator(value) {
        return (
          (isArray(value) && value.every(v => isString(v))) ||
          arrayIncludes(['flip', 'clockwise', 'counterclockwise'], value)
        )
      }
    },
    variant: {
      type: String,
      default: () => getComponentConfig(NAME, 'variant')
    },
    customClass: {
      type: String,
      default: () => getComponentConfig(NAME, 'customClass')
    },
    delay: {
      type: [Number, Object, String],
      default: () => getComponentConfig(NAME, 'delay')
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      // Object: Vue component
      type: [String, HTMLElement, Object],
      default: () => getComponentConfig(NAME, 'boundary')
    },
    boundaryPadding: {
      type: Number,
      default: () => getComponentConfig(NAME, 'boundaryPadding')
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    noFade: {
      type: Boolean,
      default: false
    },
    container: {
      // String: HTML ID of container, if null body is used (default)
      // HTMLElement: element reference reference
      // Object: Vue Component
      type: [String, HTMLElement, Object]
      // default: undefined
    },
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localTitle: '',
      localContent: '',
      localShow: this.show
    }
  },
  computed: {
    templateProps() {
      // We return an observerd object so that
      // BVTooltip wil react to changes
      return {
        // Could we just use `...this.$props`, and then override ones as necessary (i.e. title)
        // Common to both tooltip/popover
        target: this.target,
        triggers: this.triggers,
        placement: this.placement,
        fallbackPlacement: this.fallbackPlacement,
        variant: this.variant,
        customClass: this.customClass,
        container: this.container,
        boundary: this.boundary,
        delay: this.delay,
        offset: this.offset,
        noFade: this.noFade,
        disabled: this.disabled,
        // generic to both tooltip & popover
        title: this.localTitle,
        content: this.localContent
      }
    }
  },
  watch: {
    title(newVal, oldVal) {
      if (newVal !== oldVal && !this.hasNormalizedSlot('default')) {
        // Default slot has precidence over title prop
        // TODO:
        //   Move this into a common method
        this.localTitle = this.title
      }
    },
    show(show, oldVal) {
      if (show !== oldVal && show !== this.localShow && this.$_bv_toolpop) {
        if (show) {
          this.$_bv_toolpop.show()
        } else {
          // We use forceHide to override any active triggers
          this.$_bv_toolpop.forceHide()
        }
      }
    },
    localShow(show, oldVal) {
      if (show !== this.show) {
        this.$emit('update:show', show)
      }
    }
  },
  created() {
    // Non reactive property
    this.$_bv_toolpop = null
  },
  updated() {
    if (this.hasNormalizedSlot('default')) {
      // Render teh default slot as the title content
      this.$nextTick(() => {
        // Should check the slot function, and if it hasn't
        // changed then don't force an update
        // This should be a method that Popover can override
        this.localTitle = this.normalizeSlot('default')
      })
    }
  },
  beforeDestroy() {
    // Shutdown our local event listeners
    this.$off('open', this.doOpen)
    this.$off('close', this.doClose)
    this.$off('disable', this.doDisable)
    this.$off('enable', this.doEnable)
    // Destroy the tip instance
    this.$_bv_toolpop && this.$_bv_toolpop.$destroy()
    this.$_bv_toolpop = null
  },
  mounted() {
    // Set the intial title
    // TODO:
    //   Move this into a method
    this.localTitle = this.hasNormalizedSlot('default') ? this.normalizeSlot('default') : this.title

    // Instantiate a new BVTooltip instance
    // Done in a $nextTick to ensure DOM has completed
    // rendering so that target can be found
    this.$nextTick(() => {
      this.$_bv_toolpop = new BVTooltip({
        parent: this,
        propsData: this.templateProps,
        attrs: this.$attrs,
        on: {
          show: this.onShow,
          shown: this.onShown,
          hide: this.onHide,
          hidden: this.onHidden,
          disabled: this.onDisabled,
          enabled: this.onEnabled
        }
      })
      // Initially disabled?
      if (this.disabled) {
        // Initially disabled
        this.onDisable()
      }
      // Listen to open signals from others
      this.$on('open', this.doOpen)
      // Listen to close signals from others
      this.$on('close', this.doClose)
      // Listen to disable signals from others
      this.$on('disable', this.doDisable)
      // Listen to enable signals from others
      this.$on('enable', this.doEnable)
      // initially show tooltip?
      if (this.localShow) {
        this.$_bv_toolpop && this.$_bv_toolpop.show()
      }
    })
  },
  methods: {
    updateContent() {
      // Overridden by popover
      // tooltip: default slot is title
      // popover: default slot is content, title slot is title
      // TODO:
      //   Make object of data/slot/prop and update content based on that
      this.$nextTick(() => {
        if (this.hasNormalizedSlot('default')) {
          this.localTitle = this.normalizeSlot('default')
        } else {
          this.loalTitle = this.title
        }
      })
    },
    //
    // Template event handlers
    //
    onShow(bvEvt) {
      // Placeholder
      this.$emit('show', bvEvt)
      if (bvEvt) {
        this.localShow = !bvEvt.defaultPrevented
      }
    },
    onShown(bvEvt) {
      // Tip is now showing
      this.localShow = true
      this.$emit('shown', bvEvt)
    },
    onHide(bvEvt) {
      this.$emit('hide', bvEvt)
    },
    onHidden(bvEvt) {
      // Tip is no longer showing
      this.localShow = false
      this.$emit('hidden', bvEvt)
    },
    onDisabled(bvEvt) {
      // Prevent possible endless loop if user mistakenly
      // fires disabled instead of disable
      if (bvEvt && bvEvt.type === 'disabled') {
        this.$emit('update:disabled', true)
        this.$emit('disabled', bvEvt)
      }
    },
    onEnabled(bvEvt) {
      // Prevent possible endless loop if user mistakenly
      // fires `enabled` instead of `enable`
      if (bvEvt && bvEvt.type === 'enabled') {
        this.$emit('update:disabled', false)
        this.$emit('enabled', bvEvt)
      }
    },
    //
    // local Event listeners
    //
    doOpen() {
      !this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.show()
    },
    doClose() {
      this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.hide()
    },
    doDisable(evt) {
      this.$_bv_toolpop && this.$_bv_toolpop.disable()
    },
    doEnable() {
      this.$_bv_toolpop && this.$_bv_toolpop.enable()
    }
  },
  render(h) {
    // Always renders a comment node
    // TODO:
    //    Future, possibly render a target slot (single root element)
    //    Which we can apply the listeners to (pass this.$el to BVTooltip)
    return h()
  }
})

export default BTooltip
