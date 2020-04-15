// Tagged input form control
// Based loosely on https://adamwathan.me/renderless-components-in-vuejs/
import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import identity from '../../utils/identity'
import looseEqual from '../../utils/loose-equal'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { matches, requestAF, select } from '../../utils/dom'
import { isEvent, isFunction, isString } from '../../utils/inspect'
import { escapeRegExp, toString, trim, trimLeft } from '../../utils/string'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'
import { BFormInvalidFeedback } from '../form/form-invalid-feedback'
import { BFormText } from '../form/form-text'
import { BFormTag } from './form-tag'

// --- Constants ---

const NAME = 'BFormTags'

// Supported input types (for built in input)
const TYPES = ['text', 'email', 'tel', 'url', 'number']

// Pre-compiled regular expressions for performance reasons
const RX_SPACES = /[\s\uFEFF\xA0]+/g

// KeyCode constants
const { ENTER, BACKSPACE, DELETE } = KeyCodes

// --- Utility methods ---

// Escape special chars in string and replace
// contiguous spaces with a whitespace match
const escapeRegExpChars = str => escapeRegExp(str).replace(RX_SPACES, '\\s')

// Remove leading/trailing spaces from array of tags and remove duplicates
const cleanTags = tags => {
  return concat(tags)
    .map(tag => trim(toString(tag)))
    .filter((tag, index, arr) => tag.length > 0 && arr.indexOf(tag) === index)
}

// Processes an input/change event, normalizing string or event argument
const processEventValue = evt => (isString(evt) ? evt : isEvent(evt) ? evt.target.value || '' : '')

// Returns a fresh empty `tagsState` object
const cleanTagsState = () => ({
  all: [],
  valid: [],
  invalid: [],
  duplicate: []
})

// @vue/component
export const BFormTags = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  model: {
    // Even though this is the default that Vue assumes, we need
    // to add it for the docs to reflect that this is the model
    prop: 'value',
    event: 'input'
  },
  props: {
    inputId: {
      type: String
      // default: null
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
      type: String
      // default: null
    },
    form: {
      type: String
      // default: null
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    state: {
      // Tri-state: `true`, `false`, `null`
      type: Boolean,
      default: null
    },
    size: {
      type: String
      // default: null
    },
    inputType: {
      type: String,
      default: 'text',
      validator: type => arrayIncludes(TYPES, type)
    },
    inputClass: {
      type: [String, Array, Object]
      // default: null
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
      type: [String, Array, Object]
      // default: null
    },
    tagPills: {
      type: Boolean,
      default: false
    },
    tagRemoveLabel: {
      type: String,
      default: () => getComponentConfig(NAME, 'tagRemoveLabel')
    },
    tagRemovedLabel: {
      type: String,
      default: () => getComponentConfig(NAME, 'tagRemovedLabel')
    },
    tagValidator: {
      type: Function
      // default: null
    },
    duplicateTagText: {
      type: String,
      default: () => getComponentConfig(NAME, 'duplicateTagText')
    },
    invalidTagText: {
      type: String,
      default: () => getComponentConfig(NAME, 'invalidTagText')
    },
    separator: {
      // Character (or characters) that trigger adding tags
      type: [String, Array]
      // default: null
    },
    removeOnDelete: {
      // Enable deleting last tag in list when BACKSPACE is
      // pressed and input is empty
      type: Boolean,
      default: false
    },
    addOnChange: {
      // Enable change event triggering tag addition
      // Handy if using <select> as the input
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
      // Tags that were removed
      removedTags: [],
      // Populated when tags are parsed
      tagsState: cleanTagsState()
    }
  },
  computed: {
    computedInputId() {
      return this.inputId || this.safeId('__input__')
    },
    computedInputType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.inputType) ? this.inputType : 'text'
    },
    computedInputAttrs() {
      return {
        // Merge in user supplied attributes
        ...this.inputAttrs,
        // Must have attributes
        id: this.computedInputId,
        value: this.newTag,
        disabled: this.disabled || null,
        form: this.form || null
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
      // The RegExp is a character class RE in the form of `/[abc]+/`
      // where a, b, and c are the valid separator characters
      // -> `tags = str.split(/[abc]+/).filter(t => t)`
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
      // If 'Add' button should be disabled
      // If the input contains at least one tag that can
      // be added, then the 'Add' button should be enabled
      const newTag = trim(this.newTag)
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
    tags(newVal, oldVal) {
      // Update the `v-model` (if it differs from the value prop)
      if (!looseEqual(newVal, this.value)) {
        this.$emit('input', newVal)
      }
      if (!looseEqual(newVal, oldVal)) {
        newVal = concat(newVal).filter(identity)
        oldVal = concat(oldVal).filter(identity)
        this.removedTags = oldVal.filter(old => !arrayIncludes(newVal, old))
      }
    },
    tagsState(newVal, oldVal) {
      // Emit a tag-state event when the `tagsState` object changes
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
  /* istanbul ignore next */
  activated() /* istanbul ignore next */ {
    this.handleAutofocus()
  },
  methods: {
    addTag(newTag) {
      newTag = isString(newTag) ? newTag : this.newTag
      /* istanbul ignore next */
      if (this.disabled || trim(newTag) === '') {
        // Early exit
        return
      }
      const parsed = this.parseTags(newTag)
      // Add any new tags to the `tags` array, or if the
      // array of `allTags` is empty, we clear the input
      if (parsed.valid.length > 0 || parsed.all.length === 0) {
        // Clear the user input element (and leave in any invalid/duplicate tag(s)
        /* istanbul ignore if: full testing to be added later */
        if (matches(this.getInput(), 'select')) {
          // The following is needed to properly
          // work with `<select>` elements
          this.newTag = ''
        } else {
          const invalidAndDuplicates = [...parsed.invalid, ...parsed.duplicate]
          this.newTag = parsed.all
            .filter(tag => arrayIncludes(invalidAndDuplicates, tag))
            .join(this.computedJoiner)
            .concat(invalidAndDuplicates.length > 0 ? this.computedJoiner.charAt(0) : '')
        }
      }
      if (parsed.valid.length > 0) {
        // We add the new tags in one atomic operation
        // to trigger reactivity once (instead of once per tag)
        // We do this after we update the new tag input value
        // `concat()` can be faster than array spread, when both args are arrays
        this.tags = concat(this.tags, parsed.valid)
      }
      this.tagsState = parsed
      // Attempt to re-focus the input (specifically for when using the Add
      // button, as the button disappears after successfully adding a tag
      this.focus()
    },
    removeTag(tag) {
      /* istanbul ignore next */
      if (this.disabled) {
        return
      }
      // TODO:
      //   Add `onRemoveTag(tag)` user method, which if returns `false`
      //   will prevent the tag from being removed (i.e. confirmation)
      //   Or emit cancelable `BvEvent`
      this.tags = this.tags.filter(t => t !== tag)
      // Return focus to the input (if possible)
      this.$nextTick(() => {
        this.focus()
      })
    },
    // --- Input element event handlers ---
    onInputInput(evt) {
      /* istanbul ignore next: hard to test composition events */
      if (this.disabled || (isEvent(evt) && evt.target.composing)) {
        // `evt.target.composing` is set by Vue (`v-model` directive)
        // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
        return
      }
      let newTag = processEventValue(evt)
      const separatorRe = this.computedSeparatorRegExp
      if (this.newTag !== newTag) {
        this.newTag = newTag
      }
      // We ignore leading whitespace for the following
      newTag = trimLeft(newTag)
      if (separatorRe && separatorRe.test(newTag.slice(-1))) {
        // A trailing separator character was entered, so add the tag(s)
        // Note: More than one tag on input event is possible via copy/paste
        this.addTag()
      } else {
        // Validate (parse tags) on input event
        this.tagsState = newTag === '' ? cleanTagsState() : this.parseTags(newTag)
      }
    },
    onInputChange(evt) {
      // Change is triggered on `<input>` blur, or `<select>` selected
      // This event is opt-in
      if (!this.disabled && this.addOnChange) {
        const newTag = processEventValue(evt)
        /* istanbul ignore next */
        if (this.newTag !== newTag) {
          this.newTag = newTag
        }
        this.addTag()
      }
    },
    onInputKeydown(evt) {
      // Early exit
      /* istanbul ignore next */
      if (this.disabled || !isEvent(evt)) {
        return
      }
      const keyCode = evt.keyCode
      const value = evt.target.value || ''
      /* istanbul ignore else: testing to be added later */
      if (!this.noAddOnEnter && keyCode === ENTER) {
        // Attempt to add the tag when user presses enter
        evt.preventDefault()
        this.addTag()
      } else if (
        this.removeOnDelete &&
        (keyCode === BACKSPACE || keyCode === DELETE) &&
        value === ''
      ) {
        // Remove the last tag if the user pressed backspace/delete and the input is empty
        evt.preventDefault()
        this.tags = this.tags.slice(0, -1)
      }
    },
    // --- Wrapper event handlers ---
    onClick(evt) {
      if (!this.disabled && isEvent(evt) && evt.target === evt.currentTarget) {
        this.$nextTick(() => {
          this.focus()
        })
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
    // --- Public methods ---
    focus() {
      if (!this.disabled) {
        try {
          this.getInput().focus()
        } catch {}
      }
    },
    blur() {
      try {
        this.getInput().blur()
      } catch {}
    },
    // --- Private methods ---
    splitTags(newTag) {
      // Split the input into an array of raw tags
      newTag = toString(newTag)
      const separatorRe = this.computedSeparatorRegExp
      // Split the tag(s) via the optional separator
      // Normally only a single tag is provided, but copy/paste
      // can enter multiple tags in a single operation
      return (separatorRe ? newTag.split(separatorRe) : [newTag]).map(trim).filter(identity)
    },
    parseTags(newTag) {
      // Takes `newTag` value and parses it into `validTags`,
      // `invalidTags`, and duplicate tags as an object
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
    // Default User Interface render
    defaultRender({
      tags,
      addTag,
      removeTag,
      inputType,
      inputAttrs,
      inputHandlers,
      inputClass,
      tagClass,
      tagVariant,
      tagPills,
      tagRemoveLabel,
      invalidTagText,
      duplicateTagText,
      isInvalid,
      isDuplicate,
      disabled,
      placeholder,
      addButtonText,
      addButtonVariant,
      disableAddButton
    }) {
      const h = this.$createElement

      // Make the list of tags
      const $tags = tags.map(tag => {
        tag = toString(tag)
        return h(
          BFormTag,
          {
            key: `li-tag__${tag}`,
            staticClass: 'mt-1 mr-1',
            class: tagClass,
            props: {
              // `BFormTag` will auto generate an ID
              // so we do not need to set the ID prop
              tag: 'li',
              title: tag,
              disabled: disabled,
              variant: tagVariant,
              pill: tagPills,
              removeLabel: tagRemoveLabel
            },
            on: { remove: () => removeTag(tag) }
          },
          tag
        )
      })

      // Feedback IDs if needed
      const invalidFeedbackId =
        invalidTagText && isInvalid ? this.safeId('__invalid_feedback__') : null
      const duplicateFeedbackId =
        duplicateTagText && isDuplicate ? this.safeId('__duplicate_feedback__') : null

      // Compute the `aria-describedby` attribute value
      const ariaDescribedby = [
        inputAttrs['aria-describedby'],
        invalidFeedbackId,
        duplicateFeedbackId
      ]
        .filter(identity)
        .join(' ')

      // Input
      const $input = h('input', {
        ref: 'input',
        // Directive needed to get `evt.target.composing` set (if needed)
        directives: [{ name: 'model', value: inputAttrs.value }],
        staticClass: 'b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0',
        class: inputClass,
        style: { outline: 0, minWidth: '5rem' },
        attrs: {
          ...inputAttrs,
          'aria-describedby': ariaDescribedby || null,
          type: inputType,
          placeholder: placeholder || null
        },
        domProps: { value: inputAttrs.value },
        on: inputHandlers
      })

      // Add button
      const $button = h(
        BButton,
        {
          ref: 'button',
          staticClass: 'b-form-tags-button py-0',
          class: {
            // Only show the button if the tag can be added
            // We use the `invisible` class instead of not rendering
            // the button, so that we maintain layout to prevent
            // the user input from jumping around
            invisible: disableAddButton
          },
          style: { fontSize: '90%' },
          props: { variant: addButtonVariant, disabled: disableAddButton },
          on: { click: () => addTag() }
        },
        [this.normalizeSlot('add-button-text') || addButtonText]
      )

      // ID of the tags+input `<ul>` list
      // Note we could concatenate inputAttrs.id with `__TAG__LIST__`
      // But note that the inputID may be null until after mount
      // `safeId` returns `null`, if no user provided ID, until after
      // mount when a unique ID is generated
      const tagListId = this.safeId('__TAG__LIST__')

      const $field = h(
        'li',
        {
          key: '__li-input__',
          staticClass: 'flex-grow-1 mt-1',
          attrs: {
            role: 'none',
            'aria-live': 'off',
            'aria-controls': tagListId
          }
        },
        [h('div', { staticClass: 'd-flex', attrs: { role: 'group' } }, [$input, $button])]
      )

      // Wrap in an unordered list element (we use a list for accessibility)
      const $ul = h(
        'ul',
        {
          key: '_tags_list_',
          staticClass: 'list-unstyled mt-n1 mb-0 d-flex flex-wrap align-items-center',
          attrs: { id: tagListId }
        },
        // `concat()` is faster than array spread when args are known to be arrays
        concat($tags, $field)
      )

      // Assemble the feedback
      let $feedback = h()
      if (invalidTagText || duplicateTagText) {
        // Add an aria live region for the invalid/duplicate tag
        // messages if the user has not disabled the messages
        const joiner = this.computedJoiner

        // Invalid tag feedback if needed (error)
        let $invalid = h()
        if (invalidFeedbackId) {
          $invalid = h(
            BFormInvalidFeedback,
            {
              key: '_tags_invalid_feedback_',
              props: { id: invalidFeedbackId, forceShow: true }
            },
            [this.invalidTagText, ': ', this.invalidTags.join(joiner)]
          )
        }

        // Duplicate tag feedback if needed (warning, not error)
        let $duplicate = h()
        if (duplicateFeedbackId) {
          $duplicate = h(
            BFormText,
            {
              key: '_tags_duplicate_feedback_',
              props: { id: duplicateFeedbackId }
            },
            [this.duplicateTagText, ': ', this.duplicateTags.join(joiner)]
          )
        }

        $feedback = h(
          'div',
          {
            key: '_tags_feedback_',
            attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' }
          },
          [$invalid, $duplicate]
        )
      }
      // Return the content
      return [$ul, $feedback]
    }
  },
  render(h) {
    // Scoped slot properties
    const scope = {
      // Array of tags (shallow copy to prevent mutations)
      tags: this.tags.slice(),
      // Methods
      removeTag: this.removeTag,
      addTag: this.addTag,
      // We don't include this in the attrs, as users may want to override this
      inputType: this.computedInputType,
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
      // If the 'Add' button should be disabled
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
      addButtonText: this.addButtonText,
      addButtonVariant: this.addButtonVariant,
      invalidTagText: this.invalidTagText,
      duplicateTagText: this.duplicateTagText
    }

    // Generate the user interface
    const $content = this.normalizeSlot('default', scope) || this.defaultRender(scope)

    // Generate the `aria-live` region for the current value(s)
    const $output = h(
      'output',
      {
        staticClass: 'sr-only',
        attrs: {
          id: this.safeId('_selected-tags_'),
          role: 'status',
          for: this.computedInputId,
          'aria-live': this.hasFocus ? 'polite' : 'off',
          'aria-atomic': 'true',
          'aria-relevant': 'additions text'
        }
      },
      this.tags.join(', ')
    )

    // Removed tag live region
    const $removed = h(
      'div',
      {
        staticClass: 'sr-only',
        attrs: {
          id: this.safeId('_removed-tags_'),
          role: 'status',
          'aria-live': this.hasFocus ? 'assertive' : 'off',
          'aria-atomic': 'true'
        }
      },
      this.removedTags.length > 0 ? `(${this.tagRemovedLabel}) ${this.removedTags.join(', ')}` : ''
    )

    // Add hidden inputs for form submission
    let $hidden = h()
    if (this.name && !this.disabled) {
      // We add hidden inputs for each tag if a name is provided
      // for native submission of forms
      $hidden = this.tags.map(tag => {
        return h('input', {
          key: tag,
          attrs: {
            type: 'hidden',
            value: tag,
            name: this.name,
            form: this.form || null
          }
        })
      })
    }

    // Return the rendered output
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
          tabindex: this.disabled || this.noOuterFocus ? null : '-1',
          'aria-describedby': this.safeId('_selected_')
        },
        on: {
          focusin: this.onFocusin,
          focusout: this.onFocusout,
          click: this.onClick
        }
      },
      concat($output, $removed, $content, $hidden)
    )
  }
})
