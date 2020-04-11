//
// BFormRating
//
import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { isNull } from '../../utils/inspect'
import { isLocaleRTL } from '../../utils/locale'
import { toInteger, toFloat } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BIcon } from '../../icons/icon'
import { BIconStar, BIconStarHalf, BIconStarFill, BIconX } from '../../icons/icons'

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
    focused: {
      // If parent is focused
      type: Boolean,
      default: false
    },
    variant: {
      type: String
      // default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hasClear: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(evt) /* istanbul ignore next: until tests are ready */ {
      if (!this.disabed && !this.readonly) {
        evt.preventDefault()
        this.$emit('selected', this.star)
      }
    }
  },
  render(h) {
    const { rating, star, focused, hasClear, variant, disabled, readonly } = this
    const minStar = hasClear ? 0 : 1
    const type = rating >= star ? 'full' : rating >= star - 0.5 ? 'half' : 'empty'
    const scope = { variant, disabled, readonly }

    return h(
      'span',
      {
        staticClass: 'b-rating-star',
        class: {
          // We assume when interactive
          focused: (focused && rating === star) || (!toInteger(rating) && star === minStar),
          // We add type classes to we can handle RTL styling
          'b-rating-star-empty': type === 'empty',
          'b-rating-star-half': type === 'half',
          'b-rating-star-full': type === 'full'
        },
        on: { click: this.onClick }
      },
      [h('span', { staticClass: 'b-rating-icon' }, [this.normalizeSlot(type, scope)])]
    )
  }
})

// BFormRating
// @vue/component
export const BFormRating = /*#__PURE__*/ Vue.extend({
  name: NAME,
  components: { BIconStar, BIconStarHalf, BIconStarFill, BIconX },
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
    size: {
      type: String
      // default: null
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
    iconClear: {
      type: String,
      default: 'x'
    },
    locale: {
      // Locale for the foratted value (if shown)
      // Defaults to the browser locale. Falls back to `en`
      type: [String, Array]
      // default: undefined
    },
    showClear: {
      type: Boolean,
      default: false
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
      return toFloat(toFloat(this.localValue, 0).toFixed(toInteger(this.precision, 2)))
    },
    computedStars() {
      return Math.max(MIN_STARS, toInteger(this.stars, DEFAULT_STARS))
    },
    computedLocale() {
      const locales = concat(this.locale).filter(identity)
      const nf = new Intl.NumberFormat(locales)
      return nf.resolvedOptions().locale
    },
    isRTL() {
      return isLocaleRTL(this.computedLocale)
    },
    formattedRating() {
      if (isNull(this.localValue)) {
        return ''
      }
      const precision = this.precision
      return this.computedRating.toLocaleString(this.computedLocale, {
        notation: 'standard',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
    }
  },
  watch: {
    value(newVal, oldVal) /* istanbul ignore next: until tests are ready */ {
      if (newVal !== oldVal) {
        this.localValue = toFloat(newVal, null)
      }
    },
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
          this.localValue = Math.max(this.showClear ? 0 : 1, this.localValue - 1) || null
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
      return this.$createElement(BIcon, {
        props: {
          icon,
          variant: this.disabled || this.color ? null : this.variant || null
        }
      })
    },
    iconEmptyFn() {
      return this.renderIcon(this.iconEmpty)
    },
    iconHalfFn() {
      return this.renderIcon(this.iconHalf)
    },
    iconFullFn() {
      return this.renderIcon(this.iconFull)
    },
    iconClearFn() /* istanbul ignore next: until tests are ready */ {
      return this.$createElement(BIcon, { props: { icon: this.iconClear } })
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
      showClear,
      isRTL,
      $scopedSlots
    } = this
    const $content = []

    /* istanbul ignore next: until tests are ready */
    if (showClear && !disabled && !readonly) {
      const $icon = h('span', { staticClass: 'b-rating-icon' }, [
        ($scopedSlots['icon-clear'] || this.iconClearFn)()
      ])
      $content.push(
        h(
          'span',
          {
            key: 'clear',
            staticClass: 'b-rating-star b-rating-star-clear flex-grow-1',
            class: { focused: hasFocus && computedRating === 0 },
            on: { click: () => this.onSelected(null) }
          },
          [$icon]
        )
      )
    }

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
            focused: hasFocus,
            hasClear: showClear
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
            value: isNull(this.localValue) ? '' : computedRating,
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
          'b',
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
          'border-0': noBorder,
          disabled,
          readonly: !disabled && readonly
        },
        attrs: {
          dir: isRTL ? 'rtl' : 'ltr',
          tabindex: disabled ? null : '0',
          disabled,
          role: 'slider',
          'aria-disabled': disabled ? 'true' : null,
          'aria-readonly': !disabled && readonly ? 'true' : null,
          'aria-live': 'off',
          'aria-valuemin': showClear ? '0' : '1',
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
