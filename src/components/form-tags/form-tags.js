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
import { BFormInvalidFeedback } from '../form/form-invalid-feedback'
import { BFormText } from '../form/form-text'
import { BButton } from '../button/button'

const NAME = 'BFormTags'

// --- Pre-compiled regular expressions for performance reasons ---

const RX_ESCAPE_1 = /[-/\\^$*+?.()|[\]{}]/g
const RX_ESCAPE_2 = /[\s\uFEFF\xA0]+/g
const RX_TRIM_LEFT = /^\s+/

// --- Utility methods ---

// Remove leading whitespace from string
const trimLeft = str => str.replace(RX_TRIM_LEFT, '')

// This is similar to the escape used by table filtering,
// but the second replace is different
const escapeRegExpChars = str => str.replace(RX_ESCAPE_1, '\\$&').replace(RX_ESCAPE_2, '\\s')

const cleanTags = tags => {
  return concat(tags)
    .map(tag => toString(tag).trim())
    .filter((tag, index, arr) => tag.length > 0 && arr.indexOf(tag) === index)
}

// Processes an input/change event, normalizing string or event argument
const processEventValue = evt => (isString(evt) ? evt : isEvent(evt) ? evt.target.value || '' : '')

// Returns a ffresh empty tagsState object
const cleanTagsState = () => {
  return {
    all: [],
    valid: [],
    invalid: [],
    duplicate: []
  }
}
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
    duplicateTagText: {
      // TODO: Move to config defaults
      type: String,
      default: () => getComponentConfig(NAME, 'duplicateTagText')
    },
    invalidTagText: {
      // TODO: Move to config defaults
      type: String,
      default: () => getComponentConfig(NAME, 'invalidTagText')
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
      // Disable the focus ring on the root element
      type: Boolean,
      default: false
    },
    value: {
      // The v-model prop
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
      tagsState: cleanTagsState()
    }
  },
  computed: {
    computedInputId() {
      return this.inputId || this.safeId('__input__')
    },
    computedInputAttrs() {
      return {
        // Merge in user supplied attributes
        ...this.inputAttrs,
        // Must have attributes
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
      // Merge the array into a string
      return concat(this.separator)
        .filter(isString)
        .filter(identity)
        .join('')
    },
    computedSeparatorRegExp() {
      // We use a computed prop here to precompile the RegExp
      // The RegExp is a character class RE in the form of
      // /[abc]+/ where a, b, and c are the valid separator characters
      //    tags = str.split(/[abc]+/).filter(t => t)
      const separator = this.computedSeparator
      return separator ? new RegExp(`[${escapeRegExpChars(separator)}]+`) : null
    },
    computedJoiner() {
      // When tag(s) are invalid or duplicate, we leave them
      // in the input so that the user can see them
      // If there are more than one tag in the input, we use the
      // first separator character as the separator in the input
      // We append a space if the first separator is not a space
      const joiner = this.computedSeparator.charAt(0)
      return joiner !== ' ' ? `${joiner} ` : joiner
    },
    disableAddButton() {
      // if Add button should be disabled
      // If the input contains at least one tag that can
      // be added, then the Add button should be enabled
      const newTag = this.newTag.trim()
      return (
        newTag === '' ||
        !this.splitTags(newTag).some(t => !arrayIncludes(this.tags, t) && this.validateTag(t))
      )
    },
    duplicateTags() {
      return this.tagsState.duplicate
    },
    hasDuplicateTags() {
      return this.duplicateTags.length > 0
    },
    invalidTags() {
      return this.tagsState.invalid
    },
    hasInvalidTags() {
      return this.invalidTags.length > 0
    }
  },
  watch: {
    value(newVal) {
      this.tags = cleanTags(newVal)
    },
    tags(newVal) {
      // Update the v-model (if it differs from the value prop)
      if (!looseEqual(newVal, this.value)) {
        this.$emit('input', newVal)
      }
    },
    tagsState(newVal, oldVal) {
      // Emit a tag-state event when the tagsState object changes
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('tag-state', newVal.valid, newVal.invalid, newVal.duplicate)
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
      newTag = toString(newTag)
      /* istanbul ignore next */
      if (this.disabled || newTag.trim() === '') {
        // Early exit
        return
      }
      const parsed = this.parseTags(newTag)
      // Add any new tags to the tags array, or if the
      // array of allTags is empty, we clear the input
      if (parsed.valid.length > 0 || parsed.all.length === 0) {
        // We add the new tags in one atomic operation
        // to trigger reactivity once (instead of once per tag)
        // concat can be faster than array spread, when both args are arrays
        this.tags = concat(this.tags, parsed.valid)
        // Clear the user input element (and leave in any invalid/duplicate tag(s)
        // Note: this may cause issues with <select> elements that
        // do not have a <option disabled value=""> on Safari
        // Perhaps we should have an example with select in the docs
        const invalidAndDups = [...parsed.invalid, ...parsed.duplicate]
        this.newTag = parsed.all
          .filter(tag => arrayIncludes(invalidAndDups, tag))
          .join(this.computedJoiner)
          .concat(invalidAndDups.length > 0 ? this.computedJoiner.charAt(0) : '')
      }
      this.tagsState = parsed
    },
    removeTag(tag) {
      /* istanbul ignore next */
      if (this.disabled) {
        return
      }
      // TODO:
      //   Add onRemoveTag(tag) user method, which if returns false
      //   will prevent the tag from being removed (i.e. confirmation)
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
      let newTag = processEventValue(evt)
      const separatorRe = this.computedSeparatorRegExp
      this.newTag = newTag
      // We ignore leading whitespace for the following
      newTag = trimLeft(newTag)
      if (separatorRe && separatorRe.test(newTag.slice(-1))) {
        // A trailing separator character was entered, so add the tag(s).
        // Note, more than one tag on input event is possible via copy/paste
        this.addTag()
      } else if (newTag === '') {
        this.tagsState = cleanTagsState()
      } else {
        // Validate (parse tags) on input event
        this.tagsState = this.parseTags(newTag)
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
    splitTags(newTag) {
      // Split the input into an array of raw tags
      newTag = toString(newTag)
      const separatorRe = this.computedSeparatorRegExp
      // Split the tag(s) via the optional separator
      // Normally only a single tag is provided, but copy/paste
      // can enter multiple tags in a single operation
      return (separatorRe ? newTag.split(separatorRe) : [newTag])
        .map(tag => tag.trim())
        .filter(identity)
    },
    parseTags(newTag) {
      // Takes newTag value and parses it into validTags,
      // invalidTags, and duplicate tags as an object
      // Split the input into raw tags
      const tags = this.splitTags(newTag)
      // Base results
      const parsed = {
        all: tags,
        valid: [],
        invalid: [],
        duplicate: []
      }
      // Parse the unique tags
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
        // Invalid/Duplicate state information
        invalidTags: this.invalidTags.slice(),
        isInvalid: this.hasInvalidTags,
        duplicateTags: this.duplicateTags.slice(),
        isDuplicate: this.hasDuplicateTags,
        // If the add buton should be disabled
        disableAddButton: this.disableAddButton,
        // Pass-though values
        state: this.state,
        separator: this.separator,
        disabled: this.disabled,
        size: this.size,
        placeholder: this.placeholder,
        inputClass: this.inputClass,
        tagRemoveLabel: this.tagRemoveLabel,
        tagVariant: this.tagVariant,
        tagPills: this.tagPills,
        tagClass: this.tagClass,
        addButtonText: this.addButtontext,
        addButtonVariant: this.addButtonVariant,
        invalidTagText: this.invalidTagText,
        duplicateTagText: this.duplicateTagText
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

      // Feedback IDs if needed
      const invalidFeedbackId =
        this.invalidTagText && this.hasInvalidTags ? this.safeId('__invalid_feedback__') : null
      const duplicateFeedbackId =
        this.duplicateTagText && this.hasDuplicateTags
          ? this.safeId('__duplicate_feedback__')
          : null
      // Compute the aria-describedby attribute value
      const ariaDescribedby = [
        this.computedInputAttrs['aria-describedby'],
        invalidFeedbackId,
        duplicateFeedbackId
      ]
        .filter(identity)
        .join(' ')

      // Add default input and button
      const $input = h('input', {
        ref: 'input',
        // Directive needed to get `evt.target.composing` set (if needed)
        directives: [{ name: 'model', value: this.newTag }],
        staticClass: 'b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0',
        class: this.inputClass,
        style: { outline: 0, minWidth: '5rem' },
        attrs: {
          ...this.computedInputAttrs,
          'aria-describedby': ariaDescribedby || null,
          type: 'text',
          placeholder: this.placeholder || null
        },
        domProps: { value: this.newTag },
        on: this.computedInputHandlers
      })
      const hideButton = this.disableAddButton
      const $button = h(
        BButton,
        {
          ref: 'button',
          staticClass: 'b-form-tags-button py-0',
          class: {
            // Only show the button if the tag can be added. We use the
            // `invisible` class instead of not rendering the button, so that
            // we maintain layout to prevent the user input from jumping around
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

      // Wrap in an unordered list element (we use a list for accesibility)
      $content = h(
        'ul',
        { staticClass: 'list-unstyled mt-n1 mb-0 d-flex flex-wrap align-items-center' },
        $content
      )

      // Ensure we have an array
      $content = concat($content)

      // Add invalid tag feedback if needed
      if (invalidFeedbackId) {
        $content.push(
          h(BFormInvalidFeedback, { props: { id: invalidFeedbackId, forceShow: true } }, [
            this.invalidTagText,
            ': ',
            this.invalidTags.join(this.computedJoiner)
          ])
        )
      }

      // Add duplicate tag feedback if needed (warning, not error)
      if (duplicateFeedbackId) {
        $content.push(
          h(BFormText, { props: { id: duplicateFeedbackId } }, [
            this.duplicateTagText,
            ': ',
            this.duplicateTags.join(this.computedJoiner)
          ])
        )
      }
    }

    // Ensure we have an array
    $content = concat($content)

    // Add hidden inputs for form submission
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
