import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'
import { from as arrayFrom, isArray } from '../../utils/array'

// @vue/component
export default {
  name: 'BFormFile',
  mixins: [idMixin, formMixin, formStateMixin, formCustomMixin],
  props: {
    value: {
      // type: Object,
      default: null
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
      default: 'No file chosen' // Chrome default file prompt
    },
    browseText: {
      type: String,
      default: null
    },
    dropPlaceholder: {
      type: String,
      default: null
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

      // Multiple files
      if (this.multiple) {
        return this.selectedFile.map(file => file.name).join(', ')
      }

      // Single file
      return this.selectedFile.name
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
      try {
        // Wrapped in try in case IE 11 craps out
        this.$refs.input.value = ''
      } catch (e) {}
      // IE 11 doesn't support setting `input.value` to '' or null
      // So we use this little extra hack to reset the value, just in case.
      // This also appears to work on modern browsers as well.
      this.$refs.input.type = ''
      this.$refs.input.type = 'file'
      this.selectedFile = this.multiple ? [] : null
    },
    onFileChange(evt) {
      // Always emit original event
      this.$emit('change', evt)
      // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse
      const items = evt.dataTransfer && evt.dataTransfer.items
      if (items && !this.noTraverse) {
        /* istanbul ignore next: not supported in JSDOM */
        const queue = []
        for (let i = 0; i < items.length; i++) {
          const item = items[i].webkitGetAsEntry()
          if (item) {
            queue.push(this.traverseFileTree(item))
          }
        }
        Promise.all(queue).then(filesArr => {
          this.setFiles(arrayFrom(filesArr))
        })
        return
      }
      // Normal handling
      this.setFiles(evt.target.files || evt.dataTransfer.files)
    },
    setFiles(files = []) {
      if (!files) {
        /* istanbul ignore next: this will probably not happen */
        this.selectedFile = null
      } else if (this.multiple) {
        // Convert files to array
        const filesArray = []
        for (let i = 0; i < files.length; i++) {
          filesArray.push(files[i])
        }
        // Return file(s) as array
        this.selectedFile = filesArray
      } else {
        // Return single file object
        this.selectedFile = files[0] || null
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
      evt.dataTransfer.dropEffect = 'copy'
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
      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.onFileChange(evt)
      }
    },
    traverseFileTree(item, path) /* istanbul ignore next: not supported in JSDOM */ {
      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(resolve => {
        path = path || ''
        if (item.isFile) {
          // Get file
          item.file(file => {
            file.$path = path // Inject $path to file obj
            resolve(file)
          })
        } else if (item.isDirectory) {
          // Get folder contents
          item.createReader().readEntries(entries => {
            const queue = []
            for (let i = 0; i < entries.length; i++) {
              queue.push(this.traverseFileTree(entries[i], path + item.name + '/'))
            }
            Promise.all(queue).then(filesArr => {
              resolve(arrayFrom(filesArr))
            })
          })
        }
      })
    }
  },
  render(h) {
    // Form Input
    const input = h('input', {
      ref: 'input',
      class: [
        {
          'form-control-file': this.plain,
          'custom-file-input': this.custom,
          focus: this.custom && this.hasFocus
        },
        this.stateClass
      ],
      attrs: {
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
      },
      on: {
        change: this.onFileChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler,
        reset: this.onReset
      }
    })

    if (this.plain) {
      return input
    }

    // Overlay Labels
    const label = h(
      'label',
      {
        class: ['custom-file-label', this.dragging ? 'dragging' : null],
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
        class: ['custom-file', 'b-form-file', this.stateClass],
        attrs: { id: this.safeId('_BV_file_outer_') },
        on: {
          dragover: this.onDragover,
          dragleave: this.onDragleave,
          drop: this.onDrop
        }
      },
      [input, label]
    )
  }
}
