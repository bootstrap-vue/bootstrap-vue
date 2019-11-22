// Tagged input form control
// Based loosely on https://adamwathan.me/renderless-components-in-vuejs/
import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import toString from '../../utils/to-string'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { requestAF, select } from '../../utils/dom'
import { isString } from '../../utils/inspect'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BFormTag } from './form-tag'
import { BButton } from '../button/button'

const NAME = 'BFormTags'

const cleanTags = tags => {
  return concat(tags)
    .map(tag => toString(tag).trim())
    .filter((tag, index, arr) => tag.length > 0 && arr.indexOf(tag) === index)
}

const processEventValue = evt => {
  const value = isString(evt) ? evt : evt instanceof Event ? evt.target.value : ''
  return value || ''
}

export const BFormTags = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    inputId: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: () => getComponentConfig(NAME, 'placeholder')
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
      // Tri-state: true, false, null
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
    addButtonText: {
      type: String,
      default: 'Add'
    },
    addButtonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    tagVariant: {
      type: String,
      default: () => getComponentConfig(NAME, 'tagVariant')
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
      default: () => getComponentConfig(NAME, 'tagRemoveLabel')
    },
    noAddOnChange: {
      type: Boolean,
      default: false
    },
    noAddOnEnter: {
      type: Boolean,
      default: false
    },
    noOuterFocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newTag: '',
      tags: [],
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
        disabled: this.disabled || null,
        maxlength: this.tagMaxlength || null,
        minlength: this.tagMinlength || null
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
    tags(newValue) {
      if (!looseEqual(newValue, this.value)) {
        this.$emit('input', newValue)
      }
    }
  },
  created() {
    this.tags = cleanTags(this.value)
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
      // TODO:
      //   Emit a cancellable 'new-tag' event
      //   Emit a 'duplicate-tag' event if duplicate attempted
      if (tag.length > 0 && !arrayIncludes(this.tags, tag)) {
        this.tags.push(tag)
        this.newTag = ''
      }
    },
    removeTag(tag) {
      // TODO:
      //   Emit a cancellable 'remove-tag' event
      this.tags = this.tags.filter(t => t !== tag)
    },
    // --- Input element event handlers ---
    onInputInput(evt) {
      this.newTag = processEventValue(evt)
      // TODO:
      //   Check if last character on input is special (i.e. space, comma, etc)
      //   And trigger the tag add (stripping off trailing special character
      //   The character stripping could be handled in this.addTag() method
      //   Need a prop that users can specify the characters
    },
    onInputChange(evt) {
      // Change is triggered on `<input>` blur, or `<select>` selected
      // We listen to this event since ENTER on mobile is not always possible
      if (!this.noAddOnChange && evt) {
        this.newTag = processEventValue(evt)
        this.addTag()
      }
    },
    onInputKeydown(evt) {
      if (!this.noAddOnEnter && evt && evt.keyCode === KeyCodes.ENTER) {
        evt.preventDefault()
        this.addTag()
      }
    },
    // --- Wrapper event handlers ---
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
    // --- Public methods ---
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
    let $content = null
    if (this.hasNormalizedSlot('default')) {
      // User supplied default slot render
      $content = this.normalizeSlot('default', {
        // Array of tags (shallow copy)
        tags: this.tags.slice(),
        // Methods
        removeTag: this.removeTag,
        addTag: this.addTag,
        // <input> v-bind:inputAttrs
        inputAttrs: this.computedInputAttrs,
        // <input> v-on:inputHandlers
        inputHandlers: this.computedInputHandlers,
        // <input> :id="inputId"
        inputId: this.computedInputId,
        // <input> :id="inputClass"
        inputClass: this.inputClass,
        // Pass-though values
        disabled: this.disabled,
        state: this.state,
        placeholder: this.placeholder,
        tagRemoveLabel: this.tagRemoveLabel,
        tagVariant: this.tagVariant,
        tagPills: this.tagPills,
        tagClass: this.tagClass
      })
    } else {
      // Internal rendering
      // Render any provided tags
      $content = this.tags.map((tag, idx) => {
        tag = toString(tag)
        return h(
          BFormTag,
          {
            key: `li-tag__${tag}`,
            class: this.tagClass,
            style: { margin: '1px 2px 1px 0' },
            props: {
              tag: 'li',
              title: tag,
              disabled: this.disabled,
              variant: this.tagVariant,
              pill: this.tagPills,
              removeLabel: this.tagRemoveLabel
            },
            on: {
              remove: () => this.removeTag(tag)
            }
          },
          tag
        )
      })

      // Add default input and button
      const $input = h('input', {
        ref: 'input',
        staticClass: 'b-form-tags-input w-100 flex-grow-1 px-1 py-0 m-0 bg-transparent border-0',
        class: this.inputClass,
        style: { outline: 0, minWidth: '5rem' },
        attrs: {
          ...this.computedInputAttrs,
          type: 'text',
          placeholder: this.placeholder || null
        },
        domProps: { value: this.newTag },
        on: this.computedInputHandlers
      })
      const newTag = this.newTag.trim()
      const $button = h(
        BButton,
        {
          ref: 'button',
          staticClass: 'b-form-tags-button py-0',
          class: {
            // Only show the button if the tag can be added
            invisible: newTag.length === 0 || arrayIncludes(this.tags, newTag)
          },
          style: { fontSize: '90%' },
          props: { variant: this.addButtonVariant },
          on: { click: () => this.addTag() }
        },
        [this.normalizeSlot('add-button') || this.addButtonText]
      )
      $content.push(
        h('li', { key: 'li-input__', staticClass: 'd-inline-flex flex-grow-1' }, [$input, $button])
      )

      // Wrap in an unordered list element
      $content = h(
        'ul',
        { staticClass: 'list-unstyled m-0 d-flex flex-wrap align-items-center' },
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
          focus: this.hasFocus && !this.noOuterFocus,
          disabled: this.disabled,
          'is-valid': this.state === true,
          'is-invalid': this.state === false,
          [`form-control-${this.size}`]: this.size
        },
        attrs: {
          id: this.safeId(),
          role: 'group',
          tabindex: !this.disabled && !this.noOuterFocus ? '-1' : null
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
