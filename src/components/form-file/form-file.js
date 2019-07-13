import Vue from '../../utils/vue'
import { from as arrayFrom, flattenDeep, isArray } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { isFunction, isString } from '../../utils/inspect'
import formCustomMixin from '../../mixins/form-custom'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const NAME = 'BFormFile'

// --- Helper methods ---

/* istanbul ignore next: used by drag/drop which can't be tested easily */
const evtStopPrevent = evt => {
  evt.preventDefault()
  evt.stopPropagation()
}

// @vue/component
export const BFormFile = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, formMixin, formStateMixin, formCustomMixin, normalizeSlotMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
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
      type: [Boolean, String],
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
      // Internally files are always stored in true Array format
      selectedFiles: [],
      dragging: false,
      hasFocus: false
    }
  },
  computed: {
    computedAccept() /* istanbul ignore next: for now until testing can be created */ {
      // Convert `accept` to an array of [{ RegExpr, isMime }, ...]
      let accept = this.accept
      accept = (isString(accept) ? this.accept.trim() : '').split(/[,\s]+/).filter(Boolean)
      if (accept.length === 0) {
        return null
      }
      return accept.map(extOrType => {
        let rx
        let isMime = false
        if (/^\..+/.test(extOrType)) {
          // File extension /\.ext$/
          // Escape all RegExp special chars
          extOrType = extOrType.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          rx = new RegExp(`${extOrType}$`)
        } else {
          // MIME type /^mime\/.+$/ or /^mime\/type$/
          isMime = true
          // Escape all RegExp special chars, ecept `*`
          extOrType = extOrType.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
          // Special handling, we convert `*` as `.+`
          extOrType = extOrType.replace(/\*/g, '.+')
          rx = new RegExp(`^${extOrType}$`)
        }
        return { rx, isMime }
      })
    },
    computedCapture() {
      const capture = this.capture
      return capture === true || capture === '' ? true : capture || null
    },
    filesFlat() {
      return flattenDeep(this.selectedFiles).filter(Boolean)
    },
    fileNamesFlat() {
      return this.filesFlat.map(file => `${file.$path || ''}${file.name}`)
    },
    selectLabel() {
      // Draging active
      if (this.dragging && this.dropPlaceholder) {
        /* istanbul ignore next: used by drag/drop which cant be tested easily */
        return this.dropPlaceholder
      }

      // No file chosen
      if (this.selectedFiles.length === 0) {
        return this.placeholder
      }

      const files = this.selectedFiles.filter(Boolean)

      if (this.hasNormalizedSlot('file-name')) {
        // There is a slot for formatting the files/names
        return [
          this.normalizeSlot('file-name', {
            files: files,
            names: this.fileNamesFlat
          })
        ]
      } else {
        // Use the user supplied formatter, or the built in one.
        return isFunction(this.fileNameFormatter)
          ? String(this.fileNameFormatter(files))
          : files.map(file => file.name).join(', ')
      }
    }
  },
  watch: {
    selectedFiles(newVal, oldVal) {
      // The following test is needed when the file input is "reset" or the
      // exact same file(s) are selected to prevent an infinite loop.
      // When in `multiple` mode we need to check for two empty arrays or
      // two arrays with identical files
      if (
        newVal === oldVal ||
        (newVal.length === oldVal.length && newVal.every((v, i) => v === oldVal[i]))
      ) {
        return
      }
      this.$emit('input', this.multiple ? newVal : flattenDeep(newVal)[0] || null)
    },
    value(newVal, oldVal) {
      // Handle "clearing" the input file(s)
      if ((newVal !== oldVal && !newVal) || (isArray(newVal) && newVal.length === 0)) {
        this.reset()
      }
    }
  },
  methods: {
    fileValid(f) /* istanbul ignore next: for now until testing can be created */ {
      // Check if a file matches one of the accept types
      if (!f) {
        return false
      }
      const accept = this.computedAccept
      return accept ? accept.some(a => a.rx.test(a.isMime ? f.type : f.name)) : true
    },
    fileArrayFilter(entry)  /* istanbul ignore next: directory mode not supported in JSDOM */{
      // Filters out empty arrays and files that don't match accept
      return isArray(entry) ? entry.length !== 0 : this.fileValid(entry)
    },
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
      this.selectedFiles = []
    },
    onDragenter(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      if (this.noDrop || this.disabled) {
        return
      }
      this.dragging = true
      /*
      const dt = evt.dataTransfer
      if (dt && dt.items) {
        // Can't check dt.files, as it is empty at this point
        const items = arrayFrom(dt.items).filter(Boolean)
        if (
          // No files
          items.length === 0 ||
          // Not a file/directory (check first item only)
          items[0].kind !== 'file' ||
          // Too many files
          (!this.multiple && items.length > 1) ||
          // Non-directory mode and no accepted file types (note: directories appear as a file!)
          (!this.directory &&
            !items
              .filter(i => i.kind === 'file')
              .map(i => i.getAsFile())
              .some(this.fileValid))
          // Checking files in directory mode is too much code, so we just
          // rely on the directory processing during the drop to filter
          // out non accepted files
        ) {
          // Show deny feedback
          dt.dropEffect = 'none'
          // Reset "drop here" propmt
          this.dragging = false
          return
        }
        dt.dropEffect = 'copy'
      }
      */
    },
    onDragover(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      // Note this event fires repeatedly while the mouse is over the dropzone
      evtStopPrevent(evt)
      const dt = evt.dataTransfer
      this.dragging = true
      if (dt && dt.items) {
        // Can't check dt.files, as it is empty at this point
        const items = arrayFrom(dt.items).filter(Boolean)
        if (
          // No files
          items.length === 0 ||
          // Not a file/directory (check first item only)
          items[0].kind !== 'file' ||
          // Too many files
          (!this.multiple && items.length > 1)
        ) {
          // Show deny feedback
          dt.dropEffect = 'none'
          // Reset "drop here" propmt
          this.dragging = false
          return
        }
      }
      evt.dataTransfer.dropEffect = 'copy'
    },
    onDragleave(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      evtStopPrevent(evt)
      this.dragging = false
    },
    onDrop(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      // Triggered by a file drop onto drop target
      evtStopPrevent(evt)
      this.dragging = false
      if (this.noDrop || this.disabled /* || evt.dataTransfer.dropEffect === 'none' */) {
        return
      }
      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.processFilesEvt(evt)
      }
    },
    onChange(evt) {
      // Triggered by the input's change event
      this.processFilesEvt(evt)
    },
    processFilesEvt(evt) {
      const target = evt.target
      const dataTransfer = evt.dataTransfer
      // Always emit original event
      this.$emit('change', evt)
      /* istanbul ignore if: not supported in JSDOM */
      if (
        dataTransfer &&
        dataTransfer.items &&
        dataTransfer.items[0] &&
        isFunction(dataTransfer.items[0].webkitGetAsEntry)
      ) {
        // Special `items` prop is available on `drop` event (except IE)
        const items = dataTransfer.items
        const queue = []
        for (let i = 0; i < items.length; i++) {
          const item = items[i].webkitGetAsEntry()
          if (item) {
            queue.push(this.traverseFileTree(item))
          }
        }
        Promise.all(queue).then(filesArr => {
          // Remove empty arrays and files that don't match accept
          filesArr = filesArr.filter(this.fileArrayFilter)
          this.setFiles(filesArr)
          // Try an set the file input's files array so that `required`
          // constraint works for dropped files (will fail in IE11 though)
          this.setInputFiles(filesArr)
        })
      } else if (target.webkitEntries && target.webkitEntries.length > 0) {
        // Change event on modern browsers (ones that usually support directory mode)
        // When dropping files (or dirs) directly on the native input (plain mode)
        // Supported by Chrome, Firefox, Edge, and maybe Safari
        /* istanbul ignore next: can't test in JSDOM */
        Promise.all(target.webkitEntries.map(this.traverseFileTree)).then(filesArr => {
          // Remove empty arrays and files that don't match accept, update local model
          this.setFiles(filesArr.filter(this.fileArrayFilter))
          // We don't need to set input.files, as this is done natively
        })
      } else {
        // Standard file input handling (native file input change event), or
        // fallback drop mode (IE 11 / Opera)
        let files = arrayFrom(target.files || (dataTransfer || { files: [] }).files)
        files.forEach(f => (f.$path = ''))
        /* istanbul ignore if: dropmode not easily tested in JSDOM */
        if (evt.type === 'drop') {
          files = files.filter(this.fileValid)
          // Set the v-model
          this.setFiles(files)
          // Ensure the input's files array is updated
          this.setInputFiles(files)
        } else {
          this.setFiles(files)
        }
      }
    },
    traverseFileTree(item, path = '') /* istanbul ignore next: not supported in JSDOM */ {
      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(resolve => {
        if (item.isFile) {
          // Get file
          item.file(file => {
            file.$path = path // Inject $path to file obj
            resolve(file)
          })
        } else if (item.isDirectory && this.directory) {
          // Get folder contents
          item.createReader().readEntries(entries => {
            const queue = []
            for (let i = 0; i < entries.length; i++) {
              queue.push(this.traverseFileTree(entries[i], `${path}${item.name}/`))
            }
            Promise.all(queue).then(filesArr => {
              // Remove empty arrays and files that don't match accept
              resolve(filesArr.filter(this.fileArrayFilter))
            })
          })
        }
      })
    },
    setFiles(files = []) {
      this.selectedFiles = this.multiple ? files || [] : [flattenDeep(files)[0]].filter(Boolean)
    },
    setInputFiles(files = []) /* istanbul ignore next: used by Drag/Drop */ {
      // Try an set the file input files array so that `required`
      // constraint works for dropped files (will fail in IE11 though).
      // To be used only when dropping files
      try {
        // First we need to convert the array of files
        const filesArr = flattenDeep(files)
        // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()
        // Add flattened files to temp dataTransfer object to get a true `FileList` array
        filesArr.forEach(file => dataTransfer.items.add(file))
        this.$refs.input.files = dataTransfer.files
      } catch (e) {}
    },
    onReset() {
      // Triggered when the parent form (if any) is reset
      this.selectedFiles = []
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
          focus: this.custom && this.hasFocus,
          // Needed for IE to prevent the input from blocking dropped files
          'd-none': this.custom && this.dragging
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
        capture: this.computedCapture,
        accept: this.accept || null,
        multiple: this.multiple,
        webkitdirectory: this.directory,
        directory: this.directory,
        // directory: this.directory,
        // allowdirs: this.directory,
        'aria-required': this.required ? 'true' : null
      },
      on: {
        change: this.onChange,
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
        staticClass: 'custom-file-label',
        // We add overflow-hidden to prevent filenames from breaking out of the input
        class: [this.dragging ? 'dragging' : null, 'overflow-hidden'],
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
        class: this.stateClass,
        attrs: { id: this.safeId('_BV_file_outer_') },
        on: {
          dragover: this.onDragover,
          dragenter: this.onDragenter,
          dragleave: this.onDragleave,
          drop: this.onDrop
        }
      },
      [input, label]
    )
  }
})

export default BFormFile
