//
// BFormRating
//
import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { isLocaleRTL } from '../../utils/locale'
import { toInteger, toFloat } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BIcon } from '../../icons/icon'
import { BIconStar, BIconStarHalf, BIconStarFill } from '../../icons/icons'

const NAME = 'BFormRating'
const MIN_STARS = 3
const DEFAULT_STARS = 5

const { LEFT, RIGHT, UP, DOWN } = KeyCodes

// Private helper component
// @vue/component
const BVFormRatingStar = Vue.extend({
  name: 'BVFormRatingStar',
  mixins: [normalizeSlotMixin],
  props: {
    rating: {
      type: Number,
      default: 0
    },
    star: {
      type: Number,
      default: 0
    },
    variant: {
      type: String
      // default: null
    },
    focused: {
      // If parent is focused
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(evt) /* istanbul ignore next: until tests are ready */ {
      evt.preventDefault()
      this.$emit('selected', this.star)
    }
  },
  render(h) {
    const { rating, star, variant, focused } = this

    const type = rating >= star ? 'full' : rating >= star - 0.5 ? 'half' : 'empty'

    return h(
      'span',
      {
        staticClass: 'b-rating-star',
        class: {
          // We assume when interactive
          focused: (focused && rating === star) || (!toInteger(rating) && star === 1),
          // We add type classes to we can handle RTL styling
          'b-rating-star-empty': type === 'empty',
          'b-rating-star-half': type === 'half',
          'b-rating-star-full': type === 'full'
        },
        on: { click: this.onClick }
      },
      [this.normalizeSlot(type, { type, variant })]
    )
  }
})

// BFormRating
// @vue/component
export const BFormRating = /*#__PURE__*/ Vue.extend({
  name: NAME,
  components: { BIconStar, BIconStarHalf, BIconStarFill },
  mixins: [idMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    stars: {
      type: [Number, String],
      default: DEFAULT_STARS,
      validator: val => toInteger(val) >= MIN_STARS
    },
    variant: {
      type: String,
      default: 'warning'
    },
    color: {
      // CSS color string (overrides variant)
      type: String
      // default: null
    },
    showValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
      // default: null
    },
    form: {
      type: String
      // default: null
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    precision: {
      type: [Number, String],
      default: null
    },
    iconEmpty: {
      type: String,
      default: 'star'
    },
    iconHalf: {
      type: String,
      default: 'star-half'
    },
    iconFull: {
      type: String,
      default: 'star-fill'
    },
    locale: {
      // Locale for the foratted value (if shown)
      // Defaults to the browser locale. Falls back to `en`
      type: [String, Array]
      // default: undefined
    }
  },
  data() {
    return {
      localValue: toFloat(this.value, 0),
      hasFocus: false
    }
  },
  computed: {
    computedRating() {
      return toFloat(this.localValue.toFixed(toInteger(this.precision, 2)))
    },
    computedStars() {
      return Math.max(MIN_STARS, toInteger(this.stars, DEFAULT_STARS))
    },
    computedLocale() {
      const locales = concat(this.locale).filter(identity)
      const nf = new Intl.NumberFormat(locales)
      return nf.locale
    },
    isRTL() {
      return isLocaleRTL(this.computedLocale)
    },
    formattedRating() {
      const precision = this.precision
      const value = parseFloat(this.computedRating.toFixed(precision))
      return value.toLocaleString(this.computedLocale, {
        notation: 'standard',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
    }
  },
  watch: {
    localValue(newVal, oldVal) /* istanbul ignore next: until tests are ready */ {
      if (newVal !== oldVal && newVal !== (this.value || 0)) {
        this.$emit('change', newVal || null)
      }
    }
  },
  methods: {
    // Public methods
    focus() /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled) {
        try {
          this.$el.focus()
        } catch {}
      }
    },
    blur() /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled) {
        try {
          this.$el.blur()
        } catch {}
      }
    },
    // Private methods
    onKeydown(evt) /* istanbul ignore next: until tests are ready */ {
      const { keyCode } = evt
      if (!this.disabled && !this.readonly) {
        if (arrayIncludes([LEFT, DOWN], keyCode)) {
          evt.preventDefault()
          this.localValue = Math.max(1, this.localValue - 1)
        } else if (arrayIncludes([RIGHT, UP], keyCode)) {
          evt.preventDefault()
          this.localValue = Math.min(this.computedStars, this.localValue + 1)
        }
      }
    },
    onSelected(value) /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled && !this.readonly) {
        this.localValue = value
      }
    },
    onFocus(evt) /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled && !this.readonly) {
        this.hasFocus = evt.type === 'focus'
      } else {
        this.hasFocus = false
      }
    },
    // Render helper functions
    renderIcon(icon) {
      return this.$createElement(BIcon, { props: { icon, variant: this.variant || null } })
    },
    iconEmptyFn() {
      return this.renderIcon(this.iconEmpty)
    },
    iconHalfFn() {
      return this.renderIcon(this.iconHalf)
    },
    iconFullFn() {
      return this.renderIcon(this.iconFull)
    }
  },
  render(h) {
    const {
      disabled,
      readonly,
      size,
      name,
      form,
      inline,
      variant,
      color,
      noBorder,
      hasFocus,
      computedRating,
      computedStars,
      formattedRating,
      $scopedSlots
    } = this
    const $content = []

    for (let index = 0; index < computedStars; index++) {
      const value = index + 1
      $content.push(
        h(BVFormRatingStar, {
          key: index,
          props: {
            rating: computedRating,
            star: value,
            variant: disabled ? null : variant || null,
            disabled,
            readonly,
            focused: hasFocus
          },
          staticClass: 'flex-grow-1',
          style: color && !disabled ? { color } : {},
          on: { selected: this.onSelected },
          scopedSlots: {
            empty: $scopedSlots['icon-empty'] || this.iconEmptyFn,
            half: $scopedSlots['icon-half'] || this.iconHalfFn,
            full: $scopedSlots['icon-full'] || this.iconFullFn
          }
        })
      )
    }

    /* istanbul ignore next: until tests are ready */
    if (name) {
      $content.push(
        h('input', {
          key: 'hidden',
          attrs: {
            type: 'hidden',
            value: computedRating || '',
            name,
            form: form || null
          }
        })
      )
    }

    /* istanbul ignore next: until tests are ready */
    if (this.showValue) {
      $content.push(
        h(
          'span',
          {
            key: 'value',
            staticClass: 'b-rating-value flex-grow-1',
            attrs: { 'aria-hidden': 'true' }
          },
          toString(formattedRating)
        )
      )
    }

    return h(
      'output',
      {
        staticClass: 'b-rating form-control align-items-center',
        class: {
          [`form-control-${size}`]: !!size,
          'd-flex-inline': inline,
          'd-flex': !inline,
          'border-transparent': noBorder,
          disabled,
          readonly: !disabled && readonly
        },
        attrs: {
          dir: this.isRTL ? 'rtl' : null,
          tabindex: disabled ? null : '0',
          disabled,
          role: 'slider',
          'aria-disabled': disabled ? 'true' : null,
          'aria-readonly': !disabled && readonly ? 'true' : null,
          'aria-live': 'off',
          'aria-valuemin': '1',
          'aria-valuemax': toString(computedStars),
          'aria-valuenow': computedRating ? toString(computedRating) : null
        },
        on: {
          keydown: this.onKeydown,
          focus: this.onFocus,
          blur: this.onFocus
        }
      },
      $content
    )
  }
})
