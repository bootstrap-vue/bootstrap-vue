import { Vue } from '../../../vue'
import { NAME_TOOLTIP_TEMPLATE } from '../../../constants/components'
import {
  EVENT_NAME_FOCUSIN,
  EVENT_NAME_FOCUSOUT,
  EVENT_NAME_MOUSEENTER,
  EVENT_NAME_MOUSELEAVE
} from '../../../constants/events'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../../constants/props'
import { isFunction } from '../../../utils/inspect'
import { makeProp } from '../../../utils/props'
import { scopedStyleMixin } from '../../../mixins/scoped-style'
import { BVPopper } from './bv-popper'

// --- Props ---

export const props = {
  // Used only by the directive versions
  html: makeProp(PROP_TYPE_BOOLEAN, false),
  // Other non-reactive (while open) props are pulled in from BVPopper
  id: makeProp(PROP_TYPE_STRING)
}

// --- Main component ---

// @vue/component
export const BVTooltipTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME_TOOLTIP_TEMPLATE,
  extends: BVPopper,
  mixins: [scopedStyleMixin],
  props,
  data() {
    // We use data, rather than props to ensure reactivity
    // Parent component will directly set this data
    return {
      title: '',
      content: '',
      variant: null,
      customClass: null,
      interactive: true
    }
  },
  computed: {
    templateType() {
      return 'tooltip'
    },
    templateClasses() {
      const { variant, attachment, templateType } = this

      return [
        {
          // Disables pointer events to hide the tooltip when the user
          // hovers over its content
          noninteractive: !this.interactive,
          [`b-${templateType}-${variant}`]: variant,
          // `attachment` will come from BVToolpop
          [`bs-${templateType}-${attachment}`]: attachment
        },
        this.customClass
      ]
    },
    templateAttributes() {
      const { id } = this

      return {
        // Apply attributes from root tooltip component
        ...this.$parent.$parent.$attrs,

        id,
        role: 'tooltip',
        tabindex: '-1',

        // Add the scoped style data attribute to the template root element
        ...this.scopedStyleAttrs
      }
    },
    templateListeners() {
      // Used for hover/focus trigger listeners
      return {
        mouseenter: /* istanbul ignore next */ event => {
          this.$emit(EVENT_NAME_MOUSEENTER, event)
        },
        mouseleave: /* istanbul ignore next */ event => {
          this.$emit(EVENT_NAME_MOUSELEAVE, event)
        },
        focusin: /* istanbul ignore next */ event => {
          this.$emit(EVENT_NAME_FOCUSIN, event)
        },
        focusout: /* istanbul ignore next */ event => {
          this.$emit(EVENT_NAME_FOCUSOUT, event)
        }
      }
    }
  },
  methods: {
    renderTemplate(h) {
      const { title } = this

      // Title can be a scoped slot function
      const $title = isFunction(title) ? title({}) : title

      // Directive versions only
      const domProps = this.html && !isFunction(title) ? { innerHTML: title } : {}

      return h(
        'div',
        {
          staticClass: 'tooltip b-tooltip',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', {
            staticClass: 'arrow',
            ref: 'arrow'
          }),
          h(
            'div',
            {
              staticClass: 'tooltip-inner',
              domProps
            },
            [$title]
          )
        ]
      )
    }
  }
})
