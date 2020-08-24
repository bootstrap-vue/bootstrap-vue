import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { from as arrayFrom, isArray, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { isFile, isFunction, isUndefinedOrNull } from '../../utils/inspect'
import { File } from '../../utils/safe-types'
import { toString } from '../../utils/string'
import { warn } from '../../utils/warn'
import attrsMixin from '../../mixins/attrs'
import formCustomMixin from '../../mixins/form-custom'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---

const NAME = 'BFormFile'

const VALUE_EMPTY_DEPRECATED_MSG =
  'Setting "value"/"v-model" to an empty string for reset is deprecated. Set to "null" instead.'

// --- Helper methods ---

const isValidValue = value => isFile(value) || (isArray(value) && value.every(v => isValidValue(v)))

// Drop handler function to get all files
/* istanbul ignore next: not supported in JSDOM */
const getAllFileEntries = async dataTransferItemList => {
  const fileEntries = []
  const queue = []
  // Unfortunately `dataTransferItemList` is not iterable i.e. no `.forEach()`
  for (let i = 0; i < dataTransferItemList.length; i++) {
    queue.push(dataTransferItemList[i].webkitGetAsEntry())
  }
  while (queue.length > 0) {
    const entry = queue.shift()
    if (entry.isFile) {
      fileEntries.push(entry)
    } else if (entry.isDirectory) {
      queue.push(...(await readAllDirectoryEntries(entry.createReader())))
    }
  }
  return fileEntries
}

// Get all the entries (files or sub-directories) in a directory
// by calling `.readEntries()` until it returns empty array
/* istanbul ignore next: not supported in JSDOM */
const readAllDirectoryEntries = async directoryReader => {
  const entries = []
  let readEntries = await readEntriesPromise(directoryReader)
  while (readEntries.length > 0) {
    entries.push(...readEntries)
    readEntries = await readEntriesPromise(directoryReader)
  }
  return entries
}

// Wrap `.readEntries()` in a promise to make working with it easier
// `.readEntries()` will return only some of the entries in a directory
// (e.g. Chrome returns at most 100 entries at a time)
/* istanbul ignore next: not supported in JSDOM */
const readEntriesPromise = async directoryReader => {
  try {
    return await new Promise((resolve, reject) => {
      directoryReader.readEntries(resolve, reject)
    })
  } catch {}
}

// @vue/component
export const BFormFile = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [attrsMixin, idMixin, formMixin, formStateMixin, formCustomMixin, normalizeSlotMixin],
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    size: {
      type: String,
      default: () => getComponentConfig('BFormControl', 'size')
    },
    value: {
      type: [File, Array],
      default: null,
      validator: value => {
        /* istanbul ignore next */
        if (value === '') {
          warn(VALUE_EMPTY_DEPRECATED_MSG, NAME)
          return true
        }
        return isUndefinedOrNull(value) || isValidValue(value)
      }
    },
    accept: {
      type: String,
      default: ''
    },
    // Instruct input to capture from camera
    capture: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: () => getComponentConfig(NAME, 'placeholder')
    },
    browseText: {
      type: String,
      default: () => getComponentConfig(NAME, 'browseText')
    },
    dropPlaceholder: {
      type: String,
      default: () => getComponentConfig(NAME, 'dropPlaceholder')
    },
    multiple: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Boolean,
      default: false
    },
    noTraverse: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    },
    fileNameFormatter: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      selectedFile: null,
      dragging: false,
      hasFocus: false
    }
  },
  computed: {
    selectLabel() {
      // Draging active
      if (this.dragging && this.dropPlaceholder) {
        return this.dropPlaceholder
      }

      // No file chosen
      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder
      }

      // Convert selectedFile to an array (if not already one)
      const files = concat(this.selectedFile).filter(identity)

      if (this.hasNormalizedSlot('file-name')) {
        // There is a slot for formatting the files/names
        return [
          this.normalizeSlot('file-name', {
            files: files,
            names: files.map(f => f.name)
          })
        ]
      } else {
        // Use the user supplied formatter, or the built in one.
        return isFunction(this.fileNameFormatter)
          ? toString(this.fileNameFormatter(files))
          : files.map(file => file.name).join(', ')
      }
    },
    computedAttrs() {
      return {
        ...this.bvAttrs,
        type: 'file',
        id: this.safeId(),
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        form: this.form || null,
        capture: this.capture || null,
        accept: this.accept || null,
        multiple: this.multiple,
        webkitdirectory: this.directory,
        'aria-required': this.required ? 'true' : null
      }
    }
  },
  watch: {
    selectedFile(newVal, oldVal) {
      // The following test is needed when the file input is "reset" or the
      // exact same file(s) are selected to prevent an infinite loop.
      // When in `multiple` mode we need to check for two empty arrays or
      // two arrays with identical files
      if (
        newVal === oldVal ||
        (isArray(newVal) &&
          isArray(oldVal) &&
          newVal.length === oldVal.length &&
          newVal.every((v, i) => v === oldVal[i]))
      ) {
        return
      }
      if (!newVal && this.multiple) {
        this.$emit('input', [])
      } else {
        this.$emit('input', newVal)
      }
    },
    value(newVal) {
      if (!newVal || (isArray(newVal) && newVal.length === 0)) {
        this.reset()
      }
    }
  },
  methods: {
    focusHandler(evt) {
      // Bootstrap v4 doesn't have focus styling for custom file input
      // Firefox has a '[type=file]:focus ~ sibling' selector issue,
      // so we add a 'focus' class to get around these bugs
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true
      }
    },
    reset() {
      // IE 11 doesn't support setting `$input.value` to `''` or `null`
      // So we use this little extra hack to reset the value, just in case
      // This also appears to work on modern browsers as well
      // Wrapped in try in case IE 11 or mobile Safari crap out
      try {
        const $input = this.$refs.input
        $input.value = ''
        $input.type = ''
        $input.type = 'file'
      } catch (e) {}
      this.selectedFile = this.multiple ? [] : null
    },
    onFileChange(evt) {
      // Always emit original event
      this.$emit('change', evt)
      // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting `no-traverse`
      const { files, items } = evt.dataTransfer || {}
      /* istanbul ignore next: not supported in JSDOM */
      if (items && !this.noTraverse) {
        getAllFileEntries(items).then(files => {
          this.setFiles(files)
        })
      } else {
        // Normal handling
        this.setFiles(evt.target.files || files)
      }
    },
    setFiles(files) {
      if (this.multiple) {
        this.selectedFile = arrayFrom(files || [])
      } else {
        this.selectedFile = files ? files[0] || null : null
      }
    },
    onReset() {
      // Triggered when the parent form (if any) is reset
      this.selectedFile = this.multiple ? [] : null
    },
    onDragover(evt) {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.noDrop || !this.custom) {
        return
      }
      this.dragging = true
      try {
        evt.dataTransfer.dropEffect = 'copy'
      } catch {}
    },
    onDragleave(evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.dragging = false
    },
    onDrop(evt) {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.noDrop) {
        return
      }
      this.dragging = false
      this.onFileChange(evt)
    }
  },
  render(h) {
    // Form Input
    const $input = h('input', {
      ref: 'input',
      class: [
        {
          'form-control-file': this.plain,
          'custom-file-input': this.custom,
          focus: this.custom && this.hasFocus
        },
        this.stateClass
      ],
      attrs: this.computedAttrs,
      on: {
        change: this.onFileChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler,
        reset: this.onReset
      }
    })

    if (this.plain) {
      return $input
    }

    // Overlay Labels
    const $label = h(
      'label',
      {
        staticClass: 'custom-file-label',
        class: [this.dragging ? 'dragging' : null],
        attrs: {
          for: this.safeId(),
          'data-browse': this.browseText || null
        }
      },
      this.selectLabel
    )

    // Return rendered custom file input
    return h(
      'div',
      {
        staticClass: 'custom-file b-form-file',
        class: [
          this.stateClass,
          {
            [`b-custom-control-${this.size}`]: this.size
          }
        ],
        attrs: { id: this.safeId('_BV_file_outer_') },
        on: {
          dragover: this.onDragover,
          dragleave: this.onDragleave,
          drop: this.onDrop
        }
      },
      [$input, $label]
    )
  }
})
