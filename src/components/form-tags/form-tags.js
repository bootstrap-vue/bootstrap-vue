// Tagged input form control
// Based loosely on https://adamwathan.me/renderless-components-in-vuejs/
import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import toString from '../../utils/to-string'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { requestAF, select } from '../../utils/dom'
import { isEvent, isFunction, isString } from '../../utils/inspect'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BFormTag } from './form-tag'
import { BButton } from '../button/button'

const NAME = 'BFormTags'

// --- Pre-compiled regular expressions for performance reasons ---

const RX_ESCAPE_1 = /[-/\\^$*+?.()|[\]{}]/g
const RX_ESCAPE_2 = /[\s\uFEFF\xA0]+/g
const RX_TRIM_LEFT = /^s+/

// --- Utility methods ---

const trimLeft = str => str.replace(RX_TRIM_LEFT, '')

// This is similar to the escape used by table filtering,
// but the second replace is different
const escapeRegExpChars = str => str.replace(RX_ESCAPE_1, '\\$&').replace(RX_ESCAPE_2, '\\s')

const cleanTags = tags => {
  return concat(tags)
    .map(tag => toString(tag).trim())
    .filter((tag, index, arr) => tag.length > 0 && arr.indexOf(tag) === index)
}

const processEventValue = evt => (isString(evt) ? evt : isEvent(evt) ? evt.target.value || '' : '')

// @vue/component
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
    addButtonText: {
      type: String,
      default: () => getComponentConfig(NAME, 'addButtonText')
    },
    addButtonVariant: {
      type: String,
      default: () => getComponentConfig(NAME, 'addButtonVariant')
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
    tagValidator: {
      type: Function,
      default: null
    },
    separator: {
      // Character (or characters) that trigger adding tags
      type: String,
      default: null
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
        disabled: this.disabled || null
      }
    },
    computedInputHandlers() {
      return {
        input: this.onInputInput,
        change: this.onInputChange,
        keydown: this.onInputKeydown
      }
    },
    computedSeparator() {
      // We use a computed prop here to precompile the RegExp
      const separator = this.separator
      return separator && isString(separator)
        ? new RegExp(`[${escapeRegExpChars(separator)}]+`)
        : null
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
    addTag(newTag = this.newTag) {
      newTag = toString(newTag)
      const separator = this.computedSeparator
      // Split the tag(s) via the optional separator
      // Normally only a single tag is provided, but copy/paste
      // can enter multiple tags in a single operation
      let tags = separator ? trimLeft(newTag).split(separator) : [newTag]
      tags = tags.map(tag => tag.trim()).filter(identity)
      // Tags to be added
      const validTags = []
      // Tags that do not pass validation
      const invalidTags = []
      // Tags that are duplicates
      const duplicateTags = []
      // Get the unique tags
      tags.forEach(tag => {
        // We only add unique/valid tags
        if (arrayIncludes(this.tags, tag) || arrayIncludes(validTags, tag)) {
          duplicateTags.push(tag)
        } else if (this.validateTag(tag)) {
          validTags.push(tag)
        } else {
          invalidTags.push(tag)
        }
      })
      // Add any new tags to the tags array, or if the
      // array of "raw" tags is empty, we clear the input
      if (validTags.length > 0 || tags.length === 0) {
        // We add the new tags in one atomic operation
        // to trigger reactivity once (instead of once per tag)
        this.tags = [...this.tags, ...validTags]
        // Clear the user input model
        this.newTag = ''
      }
      if (validTags.length > 0 || invalidTags.length > 0 || duplicateTags.length > 0) {
        this.$emit('new-tags', validTags, invalidTags, duplicateTags)
      }
    },
    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag)
    },
    // --- Input element event handlers ---
    onInputInput(evt) {
      /* istanbul ignore if: hard to test composition events */
      if (isEvent(evt) && evt.target.composing) {
        // `evt.target.composing` is set by Vue (v-model directive)
        // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
        return
      }
      const newTag = processEventValue(evt)
      const separator = this.computedSeparator
      this.newTag = newTag
      if (separator && separator.test(trimLeft(newTag))) {
        // A separator character was entered, so add the tag(s).
        // Note, more than one tag on input event is possible via copy/paste
        this.addTag()
      }
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
    // --- Private methods ---
    validateTag(tag) {
      const validator = this.tagValidator
      return isFunction(validator) ? validator(tag) : true
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
        // Pass-though values
        separator: this.separator,
        disabled: this.disabled,
        state: this.state,
        size: this.size,
        placeholder: this.placeholder,
        inputClass: this.inputClass,
        tagRemoveLabel: this.tagRemoveLabel,
        tagVariant: this.tagVariant,
        tagPills: this.tagPills,
        tagClass: this.tagClass,
        addButtonText: this.addButtontext,
        addButtonVariant: this.addButtonVariant
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
        // Directive needed to get `evt.target.composing` set (if needed)
        directives: [{ name: 'model', value: this.newTag }],
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
      const hideButton = newTag.length === 0 || arrayIncludes(this.tags, newTag)
      const $button = h(
        BButton,
        {
          ref: 'button',
          staticClass: 'b-form-tags-button py-0',
          class: {
            // Only show the button if the tag can be added
            // We use the `invisible` class to maintain layout
            // to prevent the user input from jumping around
            invisible: hideButton
          },
          style: { fontSize: '90%' },
          props: { variant: this.addButtonVariant, disabled: hideButton },
          on: { click: () => this.addTag() }
        },
        [this.normalizeSlot('add-button-text') || this.addButtonText]
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
