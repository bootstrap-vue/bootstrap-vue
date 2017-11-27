import { idMixin, formStateMixin, formCustomMixin, formMixin } from '../../mixins'
import { from as arrayFrom } from '../../utils/array'

export default {
  mixins: [idMixin, formMixin, formStateMixin, formCustomMixin],
  render (h) {
    const t = this
    // Form Input
    const input = h(
      'input',
      {
        ref: 'input',
        class: t.inputClasses,
        attrs: {
          type: 'file',
          id: t.safeId(),
          name: t.name,
          disabled: t.disabled,
          required: t.required,
          capture: t.capture || null,
          'aria-required': t.required ? 'true' : null,
          accept: t.accept || null,
          multiple: t.multiple,
          webkitdirectory: t.directory,
          'aria-describedby': t.plain ? null : t.safeId('_BV_file_control_')
        },
        on: {
          change: t.onFileChange,
          focusin: t.focusHandler,
          focusout: t.focusHandler
        }
      }
    )
    if (t.plain) {
      return input
    }

    // 'Drop Here' target
    let droptarget = h(false)
    if (t.dragging) {
      droptarget = h(
        'span',
        {
          class: [ 'drop-here' ],
          attrs: { 'data-drop': t.dropLabel },
          on: {
            dragover: t.dragover,
            drop: t.drop,
            dragleave: t.dragleave
          }
        }
      )
    }
    // Overlay Labels
    const labels = h(
      'span',
      {
        class: [ 'custom-file-control', t.dragging ? 'dragging' : null ],
        attrs: {
          id: t.safeId('_BV_file_control_'),
          'data-choose': t.computedChooseLabel,
          'data-selected': t.selectedLabel
        }
      }
    )

    // Return rendered custom file input
    return h(
      'label',
      {
        class: [ 'custom-file', 'b-form-file', t.stateClass, 'w-100', 'd-block' ],
        attrs: { id: t.safeId('_BV_file_outer_') },
        on: { dragover: t.dragover }
      },
      [ droptarget, input, labels ]
    )
  },
  data () {
    return {
      selectedFile: null,
      dragging: false,
      hasFocus: false
    }
  },
  props: {
    accept: {
      type: String,
      default: ''
    },
    capture: {
      // Instruct input to capture from camera
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    chooseLabel: {
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
    selectedFormat: {
      type: String,
      default: ':count Files'
    },
    noDrop: {
      type: Boolean,
      default: false
    },
    dropLabel: {
      type: String,
      default: 'Drop files here'
    }
  },
  computed: {
    inputClasses () {
      return [
        {
          'form-control-file': this.plain,
          'custom-file-input': this.custom,
          'w-100': true, // BS4 beta missing this
          'focus': this.custom && this.hasFocus
        },
        this.stateClass
      ]
    },
    selectedLabel () {
      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder || 'No file chosen'
      }
      if (this.multiple) {
        if (this.selectedFile.length === 1) {
          return this.selectedFile[0].name
        }
        return this.selectedFormat
          .replace(':names', this.selectedFile.map(file => file.name).join(','))
          .replace(':count', this.selectedFile.length)
      }
      return this.selectedFile.name
    },
    computedChooseLabel () {
      return this.chooseLabel || (this.multiple ? 'Choose Files' : 'Choose File')
    }
  },
  watch: {
    selectedFile (newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      if (!newVal && this.multiple) {
        this.$emit('input', [])
      } else {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    focusHandler (evt) {
      // Boostrap v4.beta doesn't have focus styling for custom file input
      // Firefox has a borked '[type=file]:focus ~ sibling' selector issue,
      // So we add a 'focus' class to get around these "bugs"
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true
      }
    },
    reset () {
      try {
        // Wrapped in try in case IE < 11 craps out
        this.$refs.input.value = ''
      } catch (e) {
      }
      // IE < 11 doesn't support setting input.value to '' or null
      // So we use this little extra hack to reset the value, just in case
      // This also appears to work on modern browsers as well.
      this.$refs.input.type = ''
      this.$refs.input.type = 'file'
      this.selectedFile = this.multiple ? [] : null
    },
    onFileChange (evt) {
      // Always emit original event
      this.$emit('change', evt)
      // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse
      const items = evt.dataTransfer && evt.dataTransfer.items
      if (items && !this.noTraverse) {
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
    setFiles (files) {
      if (!files) {
        this.selectedFile = null
        return
      }
      if (!this.multiple) {
        this.selectedFile = files[0]
        return
      }
      // Convert files to array
      const filesArray = []
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.match(this.accept)) {
          filesArray.push(files[i])
        }
      }
      this.selectedFile = filesArray
    },
    dragover (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.noDrop || !this.custom) {
        return
      }
      this.dragging = true
      evt.dataTransfer.dropEffect = 'copy'
    },
    dragleave (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.dragging = false
    },
    drop (evt) {
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
    traverseFileTree (item, path) {
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
  }
}
