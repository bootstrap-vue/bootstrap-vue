import Vue from '../../utils/vue'
import { BVTooltip } from '../../utils/bv-tooltip'
import { isArray, arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { isString, isUndefinedOrNull } from '../../utils/inspect'
import { keys } from '../../utils/object'
import { HTMLElement } from '../../utils/safe-types'

const NAME = 'BTooltip'

// @vue/component
export const BTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME,
  inheritAttrs: false,
  props: {
    title: {
      type: String
      // default: undefined
    },
    // Added in by BPopover
    // content: {
    //   type: String,
    //   default: undefined
    // },
    target: {
      // String ID of element, or element/component reference
      // Or function that returns one of the above
      type: [String, HTMLElement, Function, Object],
      // default: undefined,
      required: true
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
      localShow: this.show
    }
  },
  watch: {
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
      // TODO:
      //   May need to be done in a $nextTick
      this.$emit('update:show', show)
    },
    // Watchers for props (prop changes do not trigger the `updated()` hook)
    title(newval, oldVal) {
      this.$nextTick(this.handleUpdate)
    },
    content(newVal, oldVal) {
      this.$nextTick(this.handleUpdate)
    },
  },
  created() {
    // Non reactive properties
    this.$_bv_toolpop = null
    this.$_bv_propsData = null
    // Create our observed propsData object for the template
    // We crate it as a non reactive prop to prevent changes to
    // it causing updates/re-renders of this instance
    // Requires Vue 2.6+
    // TODO:
    //   Should we warn if Vue.observable is not available
    //   Or fallback to making a Vue instance with only data()
    //   This may need to be in a nextTick to ensure the props are passed
    this.$_bv_propsData = Vue.observable({
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
      attrs: {},
      title: '',
      content: ''
    })
  },
  updated() {
    // Update the propData object
    // Done in a next tick to ensure slot(s) have updated
    this.$nextTick(this.handleUpdate)
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
    // Destroy the observable object
    this.$_bv_propsData = null
  },
  mounted() {
    // Set the intial props
    this.handleUpdate()

    // Instantiate a new BVTooltip instance
    // Done in a $nextTick to ensure DOM has completed
    // rendering so that target can be found
    this.$nextTick(() => {
      const $toolpop = (this.$_bv_toolpop = new BVTooltip({
        parent: this,
        // The following jsut pre-populates the prop data so
        // that thevalues are available in created hook), but
        // is not reactive to changes in the props data (see below)
        propsData: this.$_bv_propsData
      }))
      // Hack to make props reactive
      // Since the toolpop is parented, we can't mutate the
      // instance props directly.
      // TODO:
      //   Possibly: rather than using props, would be to define all of
      //   the "props" as data values in bv-tooltip/popover, which we
      //   can directly mutate without warnings being generated,
      //   Or create a method in the bv-tooltip/popover instance that
      //   we can call with updated values, pasing a computed prop of props
      //   As this "hack" may break in Vue 3.x
      $toolpop._props = this.$_bv_propsData
      // Set listeners
      $toolpop.$on('show', this.onShow)
      $toolpop.$on('shown', this.onShown)
      $toolpop.$on('hide', this.onHide)
      $toolpop.$on('hidden', this.onHidden)
      $toolpop.$on('disabled', this.onDisabled)
      $toolpop.$on('enabled', this.onEnabled)
      // Initially disabled?
      if (this.disabled) {
        // Initially disabled
        this.doDisable()
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
      // Overridden by BPopover
      // tooltip: default slot is title
      // popover: default slot is content, title slot is title
      // We pass a scoped slot function by default (v2.6x)
      // And pass the title prop as a fallback
      this.setTitle(this.$scopedSlots.default ? this.$scopedSlots.default({}) : this.title)
    },
    // Helper methods for updateContent
    setTitle(val) {
      val = isUndefinedOrNull(val) ? '' : val
      if (this.$_bv_propsData.title !== val) {
        this.$_bv_propsData.title = val
      }
    },
    setContent(val) {
      val = isUndefinedOrNull(val) ? '' : val
      if (this.$_bv_propsData.content !== val) {
        this.$_bv_propsData.content = val
      }
    },
    handleUpdate() {
      // Update the propData object with any new values
      const propsData = this.$_bv_propsData
      keys(propsData)
        // Exclude hte title and content values, as they are handled specially
        .filter(prop => prop !== 'title' && prop !== 'content')
        // Copy the prop values to the propsData object
        .forEach(prop => {
          if (propsData[prop] !== this[prop]) {
            propsData[prop] = this[prop]
          }
        })
      // Update the title/content
      this.updateContent()
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
      this.$emit('hidden', bvEvt)
      this.localShow = false
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
