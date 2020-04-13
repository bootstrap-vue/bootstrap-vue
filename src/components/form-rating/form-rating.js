import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
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

// --- Constants ---
const NAME = 'BFormRating'
const MIN_STARS = 3
const DEFAULT_STARS = 5

const { LEFT, RIGHT, UP, DOWN } = KeyCodes

// --- Private helper component ---
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
    onClick(evt) {
      if (!this.disabled && !this.readonly) {
        evt.preventDefault()
        this.$emit('selected', this.star)
      }
    }
  },
  render(h) {
    const { rating, star, focused, hasClear, variant, disabled, readonly } = this
    const minStar = hasClear ? 0 : 1
    const type = rating >= star ? 'full' : rating >= star - 0.5 ? 'half' : 'empty'
    const slotScope = { variant, disabled, readonly }

    return h(
      'span',
      {
        staticClass: 'b-rating-star',
        class: {
          // When not hovered, we use this class to focus the current (or first) star
          focused: (focused && rating === star) || (!toInteger(rating) && star === minStar),
          // We add type classes to we can handle RTL styling
          'b-rating-star-empty': type === 'empty',
          'b-rating-star-half': type === 'half',
          'b-rating-star-full': type === 'full'
        },
        attrs: { tabindex: !disabled && !readonly ? '-1' : null },
        on: { click: this.onClick }
      },
      [h('span', { staticClass: 'b-rating-icon' }, [this.normalizeSlot(type, slotScope)])]
    )
  }
})

// --- Utility methods ---
const computeStars = stars => Math.max(MIN_STARS, toInteger(stars, DEFAULT_STARS))

const clampValue = (value, min, max) => Math.max(Math.min(value, max), min)

// --- BFormRating ---
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
      default: () => getComponentConfig(NAME, 'variant')
    },
    color: {
      // CSS color string (overrides variant)
      type: String,
      default: () => getComponentConfig(NAME, 'color')
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
      // Locale for the formatted value (if shown)
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
    const value = toFloat(this.value, null)
    const stars = computeStars(this.stars)
    return {
      localValue: isNull(value) ? null : clampValue(value, 0, stars),
      hasFocus: false
    }
  },
  computed: {
    computedStars() {
      return computeStars(this.stars)
    },
    computedRating() {
      const value = toFloat(this.localValue, 0)
      const precision = toInteger(this.precision, 3)
      // We clamp the value between `0` and stars
      return clampValue(toFloat(value.toFixed(precision)), 0, this.computedStars)
    },
    computedLocale() {
      const locales = concat(this.locale).filter(identity)
      const nf = new Intl.NumberFormat(locales)
      return nf.resolvedOptions().locale
    },
    isInteractive() {
      return !this.disabled && !this.readonly
    },
    isRTL() {
      return isLocaleRTL(this.computedLocale)
    },
    formattedRating() {
      const value = this.localValue
      const precision = toInteger(this.precision)
      return isNull(value)
        ? ''
        : value.toLocaleString(this.computedLocale, {
            notation: 'standard',
            minimumFractionDigits: isNaN(precision) ? 0 : precision,
            maximumFractionDigits: isNaN(precision) ? 3 : precision
          })
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        const value = toFloat(newVal, null)
        this.localValue = isNull(value) ? null : clampValue(value, 0, this.computedStars)
      }
    },
    localValue(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== (this.value || 0)) {
        this.$emit('change', newVal || null)
      }
    },
    disabled(newVal) {
      if (newVal) {
        this.hasFocus = false
        this.blur()
      }
    }
  },
  methods: {
    // --- Public methods ---
    focus() {
      if (!this.disabled) {
        try {
          this.$el.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          this.$el.blur()
        } catch {}
      }
    },
    // --- Private methods ---
    onKeydown(evt) {
      const { keyCode } = evt
      if (this.isInteractive && arrayIncludes([LEFT, DOWN, RIGHT, UP], keyCode)) {
        evt.preventDefault()
        const value = toInteger(this.localValue, 0)
        const min = this.showClear ? 0 : 1
        const stars = this.computedStars
        // In RTL mode, LEFT/RIGHT are swapped
        const amountRtl = this.isRTL ? -1 : 1
        if (keyCode === LEFT) {
          this.localValue = clampValue(value - amountRtl, min, stars) || null
        } else if (keyCode === RIGHT) {
          this.localValue = clampValue(value + amountRtl, min, stars)
        } else if (keyCode === DOWN) {
          this.localValue = clampValue(value - 1, min, stars) || null
        } else if (keyCode === UP) {
          this.localValue = clampValue(value + 1, min, stars)
        }
      }
    },
    onSelected(value) {
      if (this.isInteractive) {
        this.localValue = value
      }
    },
    onFocus(evt) {
      this.hasFocus = !this.isInteractive ? false : evt.type === 'focus'
    },
    // --- Render methods ---
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
    iconClearFn() {
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
      isInteractive,
      $scopedSlots
    } = this
    const $content = []

    if (showClear && !disabled && !readonly) {
      const $icon = h('span', { staticClass: 'b-rating-icon' }, [
        ($scopedSlots['icon-clear'] || this.iconClearFn)()
      ])
      $content.push(
        h(
          'span',
          {
            staticClass: 'b-rating-star b-rating-star-clear flex-grow-1',
            class: { focused: hasFocus && computedRating === 0 },
            attrs: { tabindex: isInteractive ? '-1' : null },
            on: { click: () => this.onSelected(null) },
            key: 'clear'
          },
          [$icon]
        )
      )
    }

    for (let index = 0; index < computedStars; index++) {
      const value = index + 1
      $content.push(
        h(BVFormRatingStar, {
          staticClass: 'flex-grow-1',
          style: color && !disabled ? { color } : {},
          props: {
            rating: computedRating,
            star: value,
            variant: disabled ? null : variant || null,
            disabled,
            readonly,
            focused: hasFocus,
            hasClear: showClear
          },
          on: { selected: this.onSelected },
          scopedSlots: {
            empty: $scopedSlots['icon-empty'] || this.iconEmptyFn,
            half: $scopedSlots['icon-half'] || this.iconHalfFn,
            full: $scopedSlots['icon-full'] || this.iconFullFn
          },
          key: index
        })
      )
    }

    if (name) {
      $content.push(
        h('input', {
          attrs: {
            type: 'hidden',
            value: isNull(this.localValue) ? '' : computedRating,
            name,
            form: form || null
          },
          key: 'hidden'
        })
      )
    }

    if (this.showValue) {
      $content.push(
        h(
          'b',
          {
            staticClass: 'b-rating-value flex-grow-1',
            attrs: { 'aria-hidden': 'true' },
            key: 'value'
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
          'd-inline-flex': inline,
          'd-flex': !inline,
          'border-0': noBorder,
          disabled,
          readonly: !disabled && readonly
        },
        attrs: {
          id: this.safeId(),
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
