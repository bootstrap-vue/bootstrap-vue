import { Vue } from '../vue'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../constants/props'
import { attemptFocus, isVisible, matches, requestAF, select } from '../utils/dom'
import { makeProp, makePropsConfigurable } from '../utils/props'

// --- Constants ---

const SELECTOR = 'input, textarea, select'

// --- Props ---

export const props = makePropsConfigurable(
  {
    autofocus: makeProp(PROP_TYPE_BOOLEAN, false),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    form: makeProp(PROP_TYPE_STRING),
    id: makeProp(PROP_TYPE_STRING),
    name: makeProp(PROP_TYPE_STRING),
    required: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  'formControls'
)

// --- Mixin ---

// @vue/component
export const formControlMixin = Vue.extend({
  props,
  mounted() {
    this.handleAutofocus()
  },
  /* istanbul ignore next */
  activated() {
    this.handleAutofocus()
  },
  methods: {
    handleAutofocus() {
      this.$nextTick(() => {
        requestAF(() => {
          let el = this.$el
          if (this.autofocus && isVisible(el)) {
            if (!matches(el, SELECTOR)) {
              el = select(SELECTOR, el)
            }
            attemptFocus(el)
          }
        })
      })
    }
  }
})
