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

// --- Utility methods ---

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
    inputAttrs: {
      // Additional attributes to add to the input element
      type: Object,
      default: () => ({})
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
      type: [String, Array],
      default: null
    },
    removeOnDelete: {
      // Enable deleteing last tag in list when DEL is
      // pressed and input is empty
      type: Boolean,
      default: false
    },
    noAddOnChange: {
      // Disable change event from triggering tag addition
      type: Boolean,
      default: false
    },
    noAddOnEnter: {
      // Disable ENTER key from triggering tag addition
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
      hasFocus: false,
      newTag: '',
      tags: [],
      // Populated when tags are parsed
      // TODO:
      //   Populate this information on add, and optionally on input
      //   Also disable addTags / Add button when duplicates and/or
      //   Invalids are still in the input element, to prevent weird
      //   input behaviour while the user is deleting characters
      duplicateTags: [],
      invalidTags: []
    }
  },
  computed: {
    computedInputId() {
      return this.inputId || this.safeId('__input__')
    },
    computedInputAttrs() {
      return {
        ...this.inputAttrs,
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
      return concat(this.separator)
        .filter(isString)
        .filter(identity)
        .join('')
    },
    computedSeparatorRegExp() {
      // We use a computed prop here to precompile the RegExp
      // The RegExp is a character class RE in the form of
      // /[abc]+/ where a, b, and c are the separator characters
      //    tags = str.split(/[abc]+/).filter(t => t)
      // For some reason /(a|b|c)+/ has issues with leaving some consecutive
      // separators in the tags array, when using str.split(/(a|b|c)+/)
      const separator = this.computedSeparator
      return separator ? new RegExp(`[${escapeRegExpChars(separator)}]+`) : null
    },
    computedJoiner() {
      // When tag(s) are invalid (not duplicate), we leave them in the input
      const joiner = this.computedSeparator.charAt(0)
      return joiner !== ' ' ? `${joiner} ` : joiner
    },
    hasDuplicateTags() {
      return this.duplicateTags.length > 0
    },
    hasInvalidTags() {
      return this.invalidTags.length > 0
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
    // We do this in created to make sure an input event emits
    // if the cleaned tags are not equal to the value prop
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
      /* istanbul ignore next */
      if (this.disabled) {
        return
      }
      const { all, valid, invalid, duplicate } = this.parseTags(newTag)
      // Add any new tags to the tags array, or if the
      // array of allTags is empty, we clear the input
      if (valid.length > 0 || all.length === 0) {
        // We add the new tags in one atomic operation
        // to trigger reactivity once (instead of once per tag)
        // concat can be faster than array spread, when both args are arrays
        this.tags = concat(this.tags, valid)
        // Clear the user input model (and leave in any invalid tag(s)
        // Duplicate tags are not left in, but could be by doing
        // const invalidAndDups = [...invalid, ...duplicate]
        // this.newTag = parsed.allTags
        //   .filter(tag => arrayIncludes(invalidAndDups, tag))
        //   .join(this.computedJoiner)
        // But that may be confusing to the user (best to ignore duplicates?)
        this.newTag = invalid.join(this.computedJoiner)
      }
      if (all.length > 0) {
        this.$emit('new-tags', valid, invalid, duplicate)
      }
    },
    removeTag(tag) {
      /* istanbul ignore next */
      if (this.disabled) {
        return
      }
      // TODO:
      //   Add onRemoveTag(tag) user method, which if returns false
      //   prevent tag from being removed (i.e. confirmation)
      this.tags = this.tags.filter(t => t !== tag)
      // return focus to the input (if possible)
      this.focus()
    },
    // --- Input element event handlers ---
    onInputInput(evt) {
      /* istanbul ignore next: hard to test composition events */
      if (this.disabled || (isEvent(evt) && evt.target.composing)) {
        // `evt.target.composing` is set by Vue (v-model directive)
        // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
        return
      }
      const newTag = processEventValue(evt)
      const separatorRe = this.computedSeparatorRegExp
      this.newTag = newTag
      if (separatorRe && separatorRe.test(newTag.slice(-1))) {
        // A separator character was entered, so add the tag(s).
        // Note, more than one tag on input event is possible via copy/paste
        this.addTag()
      } else {
        // TODO:
        //    Validate tag as typed (optionally), and store validation
        //    state in data and make available to scoped slot. Also
        //    if tag is valid, but is a duplicate set a isDuplicate flag
        //    Also, passing the invalid and duplicate tag arrays to the
        //    scoped slot may be usefull for user error messages
      }
    },
    onInputChange(evt) {
      // Change is triggered on `<input>` blur, or `<select>` selected
      // We listen to this event since ENTER on mobile is not always possible
      if (!this.disabled && !this.noAddOnChange && isEvent(evt)) {
        this.newTag = processEventValue(evt)
        this.addTag()
      }
    },
    onInputKeydown(evt) {
      /* istanbul ignore next */
      if (this.disabled || !isEvent(evt)) {
        // Early exit
        return
      }
      const keyCode = evt.keyCode
      const value = evt.target.value || ''
      /* istanbul ignore else: testing to be added later */
      if (!this.noAddOnEnter && keyCode === KeyCodes.ENTER) {
        // Attempt to add the tag when user presses enter
        evt.preventDefault()
        this.addTag()
      } else if (this.removeOnDelete && keyCode === KeyCodes.BACKSPACE && value === '') {
        // Remove the last tag if the user pressed backspace and the input is empty
        evt.preventDefault()
        this.tags.pop()
      }
    },
    // --- Wrapper event handlers ---
    onClick(evt) {
      if (!this.disabled && isEvent(evt) && evt.target === evt.currentTarget) {
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
          if (this.autofocus && !this.disabled) {
            this.focus()
          }
        })
      })
    },
    // --- Private methods ---
    parseTags(newTag) {
      // Takes newTag value and parses it into validTags,
      // invalidTags, and duplicate tags: as an object
      newTag = toString(newTag)
      const separatorRe = this.computedSeparatorRegExp
      // Split the tag(s) via the optional separator
      // Normally only a single tag is provided, but copy/paste
      // can enter multiple tags in a single operation
      const tags = (separatorRe ? newTag.split(separatorRe) : [newTag])
        .map(tag => tag.trim())
        .filter(identity)
      // Base results
      const parsed = {
        all: tags,
        valid: [],
        invalid: [],
        duplicate: []
      }
      // Parse the unique tags
      // TODO:
      //   Possibly store the parsed object in data,
      //   so we can make computed props for tagValid, tagDuplicate flags
      //   and pass invalidTags and duplicateTags to the scoped lot
      tags.forEach(tag => {
        if (arrayIncludes(this.tags, tag) || arrayIncludes(parsed.valid, tag)) {
          // Unique duplicate tags
          if (!arrayIncludes(parsed.duplicate, tag)) {
            parsed.duplicate.push(tag)
          }
        } else if (this.validateTag(tag)) {
          // We only add unique/valid tags
          parsed.valid.push(tag)
        } else {
          // Unique invalid tags
          if (!arrayIncludes(parsed.invalid, tag)) {
            parsed.invalid.push(tag)
          }
        }
      })
      return parsed
    },
    validateTag(tag) {
      // Call the user supplied tag validator
      const validator = this.tagValidator
      return isFunction(validator) ? validator(tag) : true
    },
    getInput() {
      // Returns the input element reference (or null if not found)
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
        // Array of tags (shallow copy to prevent mutations)
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
        // Ivvalid/Duplicate state information
        invalidTags: this.invalidTags.slice(),
        isInvalid: this.hasInvalidTags,
        duplicateTags: this.duplicateTags.slice(),
        isDuplicate: this.hasDuplicateTags,
        // Pass-though values
        state: this.state,
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
        // TODO:
        //   Add in input validation state (isInvalid, isDuplicate)
        //   as well as the arrays of invalid and duplicate tags
      })
    } else {
      // Internal rendering
      // TODO: move this to a method this.defaultRender(scope)
      // Render any provided tags
      $content = this.tags.map((tag, idx) => {
        tag = toString(tag)
        return h(
          BFormTag,
          {
            key: `li-tag__${tag}`,
            staticClass: 'mt-1 mr-1',
            class: this.tagClass,
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
        h(
          'li',
          {
            key: 'li-input__',
            staticClass: 'd-inline-flex flex-grow-1 mt-1'
          },
          [$input, $button]
        )
      )

      // Wrap in an unordered list element
      $content = h(
        'ul',
        { staticClass: 'list-unstyled mt-n1 mb-0 d-flex flex-wrap align-items-center' },
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
          focus: this.hasFocus && !this.noOuterFocus && !this.disabled,
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
