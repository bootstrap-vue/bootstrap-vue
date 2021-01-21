import { Vue } from '../../vue'
import { NAME_TOOLTIP } from '../../constants/components'
import {
  EVENT_NAME_CLOSE,
  EVENT_NAME_DISABLE,
  EVENT_NAME_DISABLED,
  EVENT_NAME_ENABLE,
  EVENT_NAME_ENABLED,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_OPEN,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  MODEL_EVENT_NAME_PREFIX
} from '../../constants/events'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_NUMBER_OBJECT_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../../constants/props'
import { HTMLElement, SVGElement } from '../../constants/safe-types'
import { getScopeId } from '../../utils/get-scope-id'
import { isUndefinedOrNull } from '../../utils/inspect'
import { pick } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BVTooltip } from './helpers/bv-tooltip'

// --- Constants ---

const MODEL_PROP_NAME_ENABLED = 'disabled'
const MODEL_EVENT_NAME_ENABLED = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_ENABLED

const MODEL_PROP_NAME_SHOW = 'show'
const MODEL_EVENT_NAME_SHOW = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_SHOW

// --- Props ---

export const props = makePropsConfigurable(
  {
    // String: scrollParent, window, or viewport
    // Element: element reference
    // Object: Vue component
    boundary: makeProp([HTMLElement, PROP_TYPE_OBJECT, PROP_TYPE_STRING], 'scrollParent'),
    boundaryPadding: makeProp(PROP_TYPE_NUMBER_STRING, 50),
    // String: HTML ID of container, if null body is used (default)
    // HTMLElement: element reference reference
    // Object: Vue Component
    container: makeProp([HTMLElement, PROP_TYPE_OBJECT, PROP_TYPE_STRING]),
    customClass: makeProp(PROP_TYPE_STRING),
    delay: makeProp(PROP_TYPE_NUMBER_OBJECT_STRING, 50),
    [MODEL_PROP_NAME_ENABLED]: makeProp(PROP_TYPE_BOOLEAN, false),
    fallbackPlacement: makeProp(PROP_TYPE_ARRAY_STRING, 'flip'),
    // ID to use for tooltip element
    // If not provided on will automatically be generated
    id: makeProp(PROP_TYPE_STRING),
    noFade: makeProp(PROP_TYPE_BOOLEAN, false),
    noninteractive: makeProp(PROP_TYPE_BOOLEAN, false),
    offset: makeProp(PROP_TYPE_NUMBER_STRING, 0),
    placement: makeProp(PROP_TYPE_STRING, 'top'),
    [MODEL_PROP_NAME_SHOW]: makeProp(PROP_TYPE_BOOLEAN, false),
    // String ID of element, or element/component reference
    // Or function that returns one of the above
    // Required
    target: makeProp(
      [HTMLElement, SVGElement, PROP_TYPE_FUNCTION, PROP_TYPE_OBJECT, PROP_TYPE_STRING],
      undefined,
      true
    ),
    title: makeProp(PROP_TYPE_STRING),
    triggers: makeProp(PROP_TYPE_ARRAY_STRING, 'hover focus'),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_TOOLTIP
)

// --- Main component ---

// @vue/component
export const BTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME_TOOLTIP,
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  props,
  data() {
    return {
      localShow: this[MODEL_PROP_NAME_SHOW],
      localTitle: '',
      localContent: ''
    }
  },
  computed: {
    // Data that will be passed to the template and popper
    templateData() {
      return {
        title: this.localTitle,
        content: this.localContent,
        interactive: !this.noninteractive,
        // Pass these props as is
        ...pick(this.$props, [
          'boundary',
          'boundaryPadding',
          'container',
          'customClass',
          'delay',
          'fallbackPlacement',
          'id',
          'noFade',
          'offset',
          'placement',
          'target',
          'target',
          'triggers',
          'variant',
          MODEL_PROP_NAME_ENABLED
        ])
      }
    },
    // Used to watch for changes to the title and content props
    templateTitleContent() {
      const { title, content } = this
      return { title, content }
    }
  },
  watch: {
    [MODEL_PROP_NAME_SHOW](newValue, oldValue) {
      if (newValue !== oldValue && newValue !== this.localShow && this.$_toolpop) {
        if (newValue) {
          this.$_toolpop.show()
        } else {
          // We use `forceHide()` to override any active triggers
          this.$_toolpop.forceHide()
        }
      }
    },
    [MODEL_PROP_NAME_ENABLED](newValue) {
      if (newValue) {
        this.doDisable()
      } else {
        this.doEnable()
      }
    },
    localShow(newValue) {
      // TODO: May need to be done in a `$nextTick()`
      this.$emit(MODEL_EVENT_NAME_SHOW, newValue)
    },
    templateData() {
      this.$nextTick(() => {
        if (this.$_toolpop) {
          this.$_toolpop.updateData(this.templateData)
        }
      })
    },
    // Watchers for title/content props (prop changes do not trigger the `updated()` hook)
    templateTitleContent() {
      this.$nextTick(this.updateContent)
    }
  },
  created() {
    // Create private non-reactive props
    this.$_toolpop = null
  },
  updated() {
    // Update the `propData` object
    // Done in a `$nextTick()` to ensure slot(s) have updated
    this.$nextTick(this.updateContent)
  },
  beforeDestroy() {
    // Shutdown our local event listeners
    this.$off(EVENT_NAME_OPEN, this.doOpen)
    this.$off(EVENT_NAME_CLOSE, this.doClose)
    this.$off(EVENT_NAME_DISABLE, this.doDisable)
    this.$off(EVENT_NAME_ENABLE, this.doEnable)
    // Destroy the tip instance
    if (this.$_toolpop) {
      this.$_toolpop.$destroy()
      this.$_toolpop = null
    }
  },
  mounted() {
    // Instantiate a new BVTooltip instance
    // Done in a `$nextTick()` to ensure DOM has completed rendering
    // so that target can be found
    this.$nextTick(() => {
      // Load the on demand child instance
      const Component = this.getComponent()
      // Ensure we have initial content
      this.updateContent()
      // Pass down the scoped style attribute if available
      const scopeId = getScopeId(this) || getScopeId(this.$parent)
      // Create the instance
      const $toolpop = (this.$_toolpop = new Component({
        parent: this,
        // Pass down the scoped style ID
        _scopeId: scopeId || undefined
      }))
      // Set the initial data
      $toolpop.updateData(this.templateData)
      // Set listeners
      $toolpop.$on(EVENT_NAME_SHOW, this.onShow)
      $toolpop.$on(EVENT_NAME_SHOWN, this.onShown)
      $toolpop.$on(EVENT_NAME_HIDE, this.onHide)
      $toolpop.$on(EVENT_NAME_HIDDEN, this.onHidden)
      $toolpop.$on(EVENT_NAME_DISABLED, this.onDisabled)
      $toolpop.$on(EVENT_NAME_ENABLED, this.onEnabled)
      // Initially disabled?
      if (this[MODEL_PROP_NAME_ENABLED]) {
        // Initially disabled
        this.doDisable()
      }
      // Listen to open signals from others
      this.$on(EVENT_NAME_OPEN, this.doOpen)
      // Listen to close signals from others
      this.$on(EVENT_NAME_CLOSE, this.doClose)
      // Listen to disable signals from others
      this.$on(EVENT_NAME_DISABLE, this.doDisable)
      // Listen to enable signals from others
      this.$on(EVENT_NAME_ENABLE, this.doEnable)
      // Initially show tooltip?
      if (this.localShow) {
        $toolpop.show()
      }
    })
  },
  methods: {
    getComponent() {
      // Overridden by BPopover
      return BVTooltip
    },
    updateContent() {
      // Overridden by BPopover
      // Tooltip: Default slot is `title`
      // Popover: Default slot is `content`, `title` slot is title
      // We pass a scoped slot function reference by default (Vue v2.6x)
      // And pass the title prop as a fallback
      this.setTitle(this.normalizeSlot() || this.title)
    },
    // Helper methods for `updateContent()`
    setTitle(value) {
      value = isUndefinedOrNull(value) ? '' : value
      // We only update the value if it has changed
      if (this.localTitle !== value) {
        this.localTitle = value
      }
    },
    setContent(value) {
      value = isUndefinedOrNull(value) ? '' : value
      // We only update the value if it has changed
      if (this.localContent !== value) {
        this.localContent = value
      }
    },
    // --- Template event handlers ---
    onShow(bvEvent) {
      // Placeholder
      this.$emit(EVENT_NAME_SHOW, bvEvent)
      if (bvEvent) {
        this.localShow = !bvEvent.defaultPrevented
      }
    },
    onShown(bvEvent) {
      // Tip is now showing
      this.localShow = true
      this.$emit(EVENT_NAME_SHOWN, bvEvent)
    },
    onHide(bvEvent) {
      this.$emit(EVENT_NAME_HIDE, bvEvent)
    },
    onHidden(bvEvent) {
      // Tip is no longer showing
      this.$emit(EVENT_NAME_HIDDEN, bvEvent)
      this.localShow = false
    },
    onDisabled(bvEvent) {
      // Prevent possible endless loop if user mistakenly
      // fires `disabled` instead of `disable`
      if (bvEvent && bvEvent.type === EVENT_NAME_DISABLED) {
        this.$emit(MODEL_EVENT_NAME_ENABLED, true)
        this.$emit(EVENT_NAME_DISABLED, bvEvent)
      }
    },
    onEnabled(bvEvent) {
      // Prevent possible endless loop if user mistakenly
      // fires `enabled` instead of `enable`
      if (bvEvent && bvEvent.type === EVENT_NAME_ENABLED) {
        this.$emit(MODEL_EVENT_NAME_ENABLED, false)
        this.$emit(EVENT_NAME_ENABLED, bvEvent)
      }
    },
    // --- Local event listeners ---
    doOpen() {
      !this.localShow && this.$_toolpop && this.$_toolpop.show()
    },
    doClose() {
      this.localShow && this.$_toolpop && this.$_toolpop.hide()
    },
    doDisable() {
      this.$_toolpop && this.$_toolpop.disable()
    },
    doEnable() {
      this.$_toolpop && this.$_toolpop.enable()
    }
  },
  render(h) {
    // Always renders a comment node
    // TODO:
    //   Future: Possibly render a target slot (single root element)
    //   which we can apply the listeners to (pass `this.$el` to BVTooltip)
    return h()
  }
})
