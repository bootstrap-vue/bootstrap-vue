// tagged input
import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { requestAF, select } from '../../utils/dom'
import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import toString from '../../utils/to-string'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'
import { BBadge } from '../badge/badge'

const NAME = 'BFormTags'

const cleanTags = tags => {
  return concat(tags).filter(tag => toString(tag).length > 0)
}

export const BFormTags = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    inputId: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Add tag...'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    form: {
      type: String,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    state: {
      // tri-state: true, false, null
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    inputClass: {
      type: [String, Array, Object],
      default: null
    },
    inputMaxlength: {
      type: [Number, String],
      default: null
    },
    inputMinlength: {
      type: [Number, String],
      default: null
    },
    inputType: {
      type: String,
      default: 'text'
    },
    tagVariant: {
      type: String,
      default: 'secondary'
    },
    tagClass: {
      type: [String, Array, Object],
      default: null
    },
    tagPills: {
      type: Boolean,
      default: false
    },
    tagRemoveLabel: {
      type: String,
      default: 'Remove tag'
    },
    value: {
      type: Array,
      default: () => []
    },
    inputValue: {
      // Syncable prop with the current value
      // of the text in the <input>
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newTag: '',
      tags: cleanTags(this.value),
      hasFocus: false
    }
  },
  computed: {
    computedInputId() {
      return this.inputId || this.safeId('__input__')
    },
    computedInputAttrs() {
      return {
        id: this.computedInputId,
        value: this.newTag,
        placeholder: this.placeholder || null,
        disabled: this.disabled || null,
        maxlength: this.tagMaxlength || null,
        minlength: this.tagMinlength || null,
        type: this.inputType || null
      }
    },
    computedInputHandlers() {
      return {
        input: this.onInputInput,
        change: this.onInputChange,
        keydown: this.onInputKeydown
      }
    }
  },
  watch: {
    value(newValue) {
      this.tags = cleanTags(newValue)
    },
    newTag(newValue) {
      // Update syncable prop `input-value`
      this.$emit('update:inputValue', newValue)
    },
    tags(newValue) {
      if (!looseEqual(newValue, this.value)) {
        this.$emit('change', newValue)
      }
    }
  },
  mounted() {
    this.handleAutofocus()
  },
  activated() /* istanbul ignore next */ {
    this.handleAutofocus()
  },
  methods: {
    addTag(tag = this.newTag) {
      tag = toString(tag).trim()
      if (tag.length > 0 && !arrayIncludes(this.tags, tag)) {
        this.tags.push(tag)
        this.newTag = ''
      }
    },
    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag)
    },
    // -- Input element event handlers
    onInputInput(evt) {
      this.newTag = evt.target.value || ''
    },
    onInputChange(evt) {
      // Change is triggered on `<input>` blur, or `<select>` selected
      // We listen to this event since ENTER on mobile is not always possible
      this.newTag = evt.target.value || ''
      this.addTag()
    },
    onInputKeydown(evt) {
      if (evt.keyCode === KeyCodes.ENTER) {
        evt.preventDefault()
        this.addTag()
      }
    },
    // -- Wrapper event handlers
    onClick(evt) {
      if (evt.target === evt.currentTarget && !this.disabled) {
        this.$nextTick(this.focus)
      }
    },
    onFocusin() {
      this.hasFocus = true
    },
    onFocusout() {
      this.hasFocus = false
    },
    handleAutofocus() {
      this.$nextTick(() => {
        requestAF(() => {
          if (this.autofocus) {
            this.focus()
          }
        })
      })
    },
    getInput() {
      return select(`#${this.computedInputId}`, this.$el)
    },
    // -- Public methods
    focus() {
      if (!this.disabled) {
        try {
          const input = this.getInput()
          input.focus()
        } catch {}
      }
    },
    blur() {
      try {
        const input = this.getInput()
        input.blur()
      } catch {}
    }
  },
  render(h) {
    // Generate the control content
    let $content = h()
    if (this.hasNormalizedSlot('default')) {
      // User supplied default slot render
      $content = this.normalizeSlot('default', {
        // Array of tags
        tags: this.tags,
        // Methods
        removeTag: this.removeTag,
        addTag: this.addTag,
        // <input> v-bind:inputAttrs
        inputAttrs: this.computedInputAttrs,
        // <input> v-on:inputHandlers
        inputHandlers: this.computedInputHandlers,
        // Pass-though values
        disabled: this.disabled,
        state: this.state,
        tagRemoveLabel: this.tagRemoveLabel,
        tagVariant: this.variant
      })
    } else {
      // Internal rendering
      // Render any provided tags
      $content = this.tags.map((tag, idx) => {
        let $remove = h()
        if (!this.disabled) {
          $remove = h(BButtonClose, {
            props: { ariaLabel: this.removeLabel },
            staticClass: 'b-form-tag-remove ml-1 text-reset d-inline-flex float-none',
            style: { fontSize: '1.25em' },
            on: {
              click: () => this.removeTag(tag)
            }
          })
        }
        const $tag = h('span', {}, toString(tag))
        return h(
          BBadge,
          {
            key: `li-tag__${tag}`,
            staticClass: 'b-form-tag d-inline-flex align-items-center font-weight-normal',
            class: this.tagClass,
            style: { margin: '1px 2px 1px 0' },
            attrs: { title: tag },
            props: {
              tag: 'li',
              variant: this.tagVariant,
              pill: this.tagPills
            }
          },
          [$tag, $remove]
        )
      })

      // Add default input
      const $input = h('input', {
        ref: 'input',
        staticClass: 'b-form-tags-input w-100 px-1 py-0 m-0 bg-transparent border-0',
        class: this.inputClass,
        style: { outline: 0, minWidth: '5rem' },
        attrs: this.computedInputAttrs,
        domProps: { value: this.newTag },
        on: this.computedInputHandlers
      })
      $content.push(
        h('li', { key: 'li-input__', staticClass: 'd-inline-flex flex-grow-1' }, [$input])
      )

      // Wrap in a list element
      $content = h(
        'ul',
        {
          staticClass: 'list-unstyled m-0 d-flex flex-wrap align-items-center'
        },
        $content
      )
    }
    // Ensure we have an array
    $content = concat($content)
    if (this.name) {
      // We add hidden inputs for each tag if a name is provided
      // for native submission of forms
      this.tags.forEach(tag => {
        const $hidden = h('input', {
          key: tag,
          attrs: {
            type: 'hidden',
            value: tag,
            name: this.name,
            form: this.form || null
          }
        })
        $content.push($hidden)
      })
    }
    return h(
      'div',
      {
        staticClass: 'b-form-tags form-control h-auto',
        class: {
          focus: this.hasFocus,
          disabled: this.disabled,
          'is-valid': this.state === true,
          'is-invalid': this.state === false,
          [`form-control-${this.size}`]: this.size
        },
        attrs: {
          id: this.safeId(),
          role: 'group',
          tabindex: this.disabled ? null : '-1'
        },
        on: {
          focusin: this.onFocusin,
          focusout: this.onFocusout,
          click: this.onClick
        }
      },
      $content
    )
  }
})
