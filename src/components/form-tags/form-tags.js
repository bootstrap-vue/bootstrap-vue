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
    event: 'input'
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
        value: this.newTag || '',
        placeholder: this.placeholder || null,
        disabled: this.disabled || null,
        maxlength: this.tagMaxlength || null,
        minlength: this.tagMinlength || null,
        type: this.inputType || null
      }
    },
    computedInputHandlers() {
      return {
        input: this.onInput,
        change: this.onChange,
        keydown: this.onKeydown
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
  mounted() {
    this.handleAutofocus()
  },
  activated() /* istanbul ignore next */ {
    this.handleAutofocus()
  },
  methods: {
    addTag(tag = this.newTag) {
      tag = tag.trim()
      if (tag.length > 0 && !arrayIncludes(this.tags, tag)) {
        this.tags.push(tag)
        this.newTag = ''
      }
    },
    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag)
    },
    // -- Input element event handlers
    onInput(evt) {
      this.newTag = evt.target.value || ''
    },
    onChange(evt) {
      // Change is triggered on input blur, or select selected
      // We listen to this event since ENTER on mobile is not always possible
      this.newTag = evt.target.value || ''
      this.addTag()
    },
    onKeydown(evt) {
      if (evt.keyCode === KeyCodes.ENTER) {
        evt.preventDefault()
        this.addTag()
      }
    },
    // -- Wrapper event handlers
    onClick(evt) {
      if (evt.target === evt.currentTarget && !this.disabled) {
        this.focus()
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
          this.focus()
        })
      })
    },
    getInput() {
      return select(`#{this.computedInputId}`, this.$el)
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
        input.focus()
      } catch {}
    }
  },
  render(h) {
    // Base wrapper data
    const data = {
      staticClass: 'b-form-tags form-control',
      class: {
        focus: this.hasFocus,
        disabled: this.disabled,
        'is-valid': this.state === true,
        'is-invalid': this.state === false
      },
      attrs: {
        id: this.safeId(),
        role: 'group',
        tabindex: this.disabled ? null : '-1'
      }
    }
    // Default slot scope
    const scope = {
      // Array of tags
      tags: this.tags,
      // Methods
      addTag: this.addTag,
      removeTag: this.removeTag,
      // input v-bind
      inputAttrs: this.inputAttrs,
      // input v-on
      inputHandlers: this.inputHandlers,
      // Pass-though values
      removeLabel: this.tagRemoveLabel,
      disabled: this.disabled,
      state: this.state,
      tagVariant: this.variant
    }
    // User supplied default slot render
    let $content = this.normalizeSlot('defaut', scope)
    // Internal rendering
    if (!$content) {
      data.class['d-flex'] = true
      data.class['flex-wrap'] = true
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
            key: `li-tag-${idx}`,
            staticClass: 'b-form-tag d-inline-flex align-items-center font-weight-normal',
            class: this.tagClass,
            style: { margin: '1px 2px 1px 0' },
            props: {
              tag: 'li',
              variant: this.tagVariant,
              pill: this.tagPills
            }
          },
          [$tag, $remove]
        )
      })
      if (!this.disabled) {
        const $input = h('input', {
          ref: 'input',
          staticClass: 'b-form-tags-input w-100 px-1 py-0 m-0 bg-transparent border-0',
          class: this.inputClass,
          style: { outline: 0 },
          attrs: this.computedInputAttrs,
          on: this.computedInputHanlders
        })
        $content.push(
          h('li', { key: 'li-input', staticClass: 'd-inline-flex flex-grow-1' }, [$input])
        )
      }
      $content = h(
        'ul',
        {
          staticClass: 'list-unstyled m-0 d-flex flex-wrap align-items-center'
        },
        $content
      )
    }
    if (this.name) {
      // We add hidden inputs for each tag if a name is provided
      // for native submission of forms
      $content = concat($content)
      this.tags.forEach(tag => {
        const $hidden = h('input', {
          attrs: {
            type: 'hidden',
            name: this.name,
            form: this.form || null
          }
        })
        $content.push($hidden)
      })
    }
    return h('div', data, $content)
  }
})
