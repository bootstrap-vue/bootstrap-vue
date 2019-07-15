import Vue from '../../utils/vue'
import cloneDeep from '../../utils/clone-deep'
import { from as arrayFrom, flattenDeep, isArray } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { closest, eventOn, eventOff } from '../../utils/dom'
import { isFunction, isString } from '../../utils/inspect'
import { escapeRegExp } from '../../utils/string'
import formCustomMixin from '../../mixins/form-custom'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const NAME = 'BFormFile'

// --- Helper methods ---

/* istanbul ignore next: used by drag/drop which can't be tested easily (yet) */
const evtStopPrevent = evt => {
  evt.preventDefault()
  evt.stopPropagation()
  // evt.stopImmediatePropagation()
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
    noDropPlaceholder: {
      // TODO: add to global config
      type: String,
      default: 'Not allowed'
    },
    multiple: {
      // Note `directory` implies multiple files (where supported)
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
      // IE 11 doesn't respect setting `evt.dataTransfer.dropEffect`, so
      // we handle it ourselves as well
      // https://stackoverflow.com/a/46915971/2744776
      dropAllowed: !this.noDrop,
      hasFocus: false
    }
  },
  computed: {
    computedAccept() {
      // Convert `accept` to an array of [{ RegExpr, isMime }, ...]
      let accept = this.accept
      accept = (isString(accept) ? accept.trim() : '').split(/[,\s]+/).filter(Boolean)
      if (accept.length === 0) {
        // Allow any file type/extension
        return null
      }
      const extRx = /^\..+/
      const starRx = /\/\*$/
      return accept.map(extOrType => {
        let prop = 'name'
        let startMatch = '^'
        let endMatch = '$'
        if (extRx.test(extOrType)) {
          // File extension /\.ext$/
          startMatch = ''
        } else {
          // MIME type /^mime\/.+$/ or /^mime\/type$/
          prop = 'type'
          if (starRx.test(extOrType)) {
            endMatch = '.+$'
            // Remove trailing `*`
            extOrType = extOrType.slice(0, -1)
          }
        }
        // Escape all RegExp special chars
        extOrType = escapeRegExp(extOrType)
        const rx = new RegExp(`${startMatch}${extOrType}${endMatch}`)
        return { rx, prop }
      })
    },
    computedCapture() {
      const capture = this.capture
      return capture === true || capture === '' ? true : capture || null
    },
    filesCloned() {
      return cloneDeep(this.selectedFiles)
    },
    filesFlat() {
      return flattenDeep(this.selectedFiles).filter(Boolean)
    },
    fileNamesFlat() {
      return this.filesFlat.map(file => file.name)
    },
    labelContent() {
      const h = this.$createElement
      // Draging active
      /* istanbul ignore next: used by drag/drop which can't be tested easily */
      if (this.dragging && !this.noDrop) {
        return (
          // TODO: add additional scope with file count, and other not-allowed reasons
          this.normalizeSlot('drop-placeholder', { allowed: this.dropAllowed }) ||
          (this.dropAllowed
            ? this.dropPlaceholder
            : h('span', { staticClass: 'text-danger' }, this.noDropPlaceholder))
        )
      }

      // No file chosen
      if (this.selectedFiles.length === 0) {
        return this.normalizeSlot('placeholder') || this.placeholder
      }

      if (this.hasNormalizedSlot('file-name')) {
        // There is a slot for formatting the files/names
        return [
          this.normalizeSlot('file-name', {
            files: this.filesFlat,
            filesTraversed: this.filesCloned,
            names: this.fileNamesFlat
          })
        ]
      } else {
        // Use the user supplied formatter, or the built in one.
        return isFunction(this.fileNameFormatter)
          ? String(this.fileNameFormatter(this.filesFlat, this.filesCloned))
          : this.fileNamesFlat.join(', ')
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
      const files = this.noTraverse ? flattenDeep(newVal) : newVal
      this.$emit('input', this.multiple ? files : files[0] || null)
    },
    value(newVal, oldVal) {
      // Handle "clearing" the input file(s)
      if ((newVal !== oldVal && !newVal) || (isArray(newVal) && newVal.length === 0)) {
        this.reset()
      }
    }
  },
  mounted() {
    const form = closest('form', this.$el)
    // Listen for form reset events, to reset the file input
    if (form) {
      eventOn(form, 'reset', this.reset, { passive: true })
      this.$on('hook:beforeDestroy', () => {
        eventOff(form, 'reset', this.reset, { passive: true })
      })
    }
  },
  methods: {
    fileValid(file) {
      // Check if a file matches one of the accept types
      const accept = this.computedAccept
      if (!file) {
        return false
      }
      if (!accept || accept.length === 0) {
        return true
      }
      return accept.some(a => a.rx.test(file[a.prop]))
    },
    fileArrayFilter(entry) /* istanbul ignore next: directory mode not supported in JSDOM */ {
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
      this.dragging = true
      // evtStopPrevent(evt)
      const dt = evt.dataTransfer
      if (this.noDrop || this.disabled) {
        dt.dropEffect = 'none'
        this.dropAllowed = false
        // return
      }
      /*
      if (dt && dt.items) {
        // Can't check dt.files, as it is empty at this point for some reason
        const items = arrayFrom(dt.items).filter(Boolean)
        if (
          // No files
          items.length === 0 ||
          // Not a file/directory (check first item only)
          items[0].kind !== 'file' ||
          // Too many files
          (!this.multiple && items.length > 1) ||
          // Non-directory mode and no accepted file types
          // Note: directories appear as a kind=file, with type = ""
          // Should have a way to detect if is a directory
          // `directory` mode on file inputs appears to only allow one directory to
          // be selected (not multiple, regardless of `multiple` attribute, although drag/drop allows it)
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
          this.dropAllowed = false
          return
        }
        dt.dropEffect = 'copy'
        this.dropAllowed = true
      }
      */
    },
    onDragover(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      // Note this event fires repeatedly while the mouse is over the dropzone at
      // intervals in the milliseconds, so avoid doing much processing in this event
      // Unfortunately we can't do this in the initial `dragenter` event (maybe)
      evtStopPrevent(evt)
      this.dragging = true
      const dt = evt.dataTransfer
      if (this.noDrop || this.disabled || !this.dropAllowed) {
        // Early exit
        dt.dropEffect = 'none'
        this.dropAllowed = false
        return
      }
      if (dt && dt.items) {
        // Can't check dt.files, as it is empty at this point for some reason
        // const items = arrayFrom(dt.items).filter(Boolean)
        const items = []
        for (let i = 0; i < dt.items.length; i++) {
          // `DataTransferItemList` is not array-like, so we need to use a loop
          // to convert it into an array
          items.push(dt.items[i])
        }
        if (
          // No files
          items.length === 0 ||
          // No file/directory items
          items.every(i => i.kind !== 'file') ||
          // Too many files
          (!this.multiple && items.length > 1) ||
          // Non-directory mode, and no valid files
          // TODO: check file entry type (isDirectory/isFile using webkitGetEntry)
          // This may need to be moved into it's own if statement for better checking
          (!this.directory &&
            !items
              .filter(i => i.kind === 'file')
              .map(i => i.getAsFile())
              .some(this.fileValid))
        ) {
          // Show deny feedback
          dt.dropEffect = 'none'
          this.dropAllowed = false
          return
        }
      }
      dt.dropEffect = 'copy'
      this.dropAllowed = true
    },
    onDragleave(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      evtStopPrevent(evt)
      this.$nextTick(() => {
        this.dragging = false
        this.dropAllowed = !this.noDrop
      })
    },
    onDrop(evt) /* istanbul ignore next: difficult to test in JSDOM */ {
      // Triggered by a file drop onto drop target
      evtStopPrevent(evt)
      const dt = evt.dataTransfer
      this.dragging = false
      if (this.noDrop || this.disabled || !this.dropAllowed /* || dt.dropEffect === 'none' */) {
        this.$nextTick(() => {
          this.dropAllowed = !this.noDrop
        })
        return
      }
      if ((dt.items && dt.items.length > 0) || (dt.files && dt.files.length > 0)) {
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
        // while `webkitGetAsEntry` is webkit specific, most modern browsers have
        // implemented this. Future proof by checking for `getAsEntry` as well
        isFunction(dataTransfer.items[0].getAsEntry || dataTransfer.items[0].webkitGetAsEntry)
      ) {
        // Special `items` prop is available on `drop` event (except IE)
        // TODO:
        //   Change this from a promise method based on comments in `traverseFileTree`
        //   Can add fallback method if `webkitGetAsEntry` is not available (i.e. no
        //   native directory support)
        const items = dataTransfer.items
        const queue = []
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          item = isFunction(item.getAsEntry)
            ? item.getAsEntry()
            : isFunction(item.webkitGetAsEntry)
              ? item.webkitGetAsEntry()
              : null
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
        // Input `change` event on modern browsers (ones that usually support directory mode)
        // when dropping files (or dirs) directly on the native input (when in plain mode)
        // Supported by Chrome, Firefox, Edge, and maybe Safari
        // Will need to see what the standard property will be
        // TODO: Change this from a promise method based on comments in `traverseFileTree`
        /* istanbul ignore next: can't test in JSDOM */
        Promise.all(target.webkitEntries.map(this.traverseFileTree)).then(filesArr => {
          // Remove empty arrays and files that don't match accept, update local model
          filesArr = filesArr.filter(this.fileArrayFilter)
          this.setFiles(filesArr)
          // We don't need to set `input.files`, as this is done natively, although
          // depending on various combos of multiple and webkitdirectory, `input.files`
          // may be an empty array or `input.webkitEntries` might be an empty array,
          // so we may want to set input.files to equal the flattened files array
          // TODO:
          //  Determine if we should set `input.files` to flattened array from files
          //  specified in `input.webkitEntries`, mainly for `required` constraint
          //  Needs further manual testing/investigation
        })
      } else {
        // Standard file input handling (native file input change event), or
        // fallback drop mode (IE 11 / Opera) which don't support directory mode
        const dt = dataTransfer || { files: [] }
        let files = arrayFrom(target.files || dt.files)
        // Add custom `$path` property to each file (to be consistent with drop mode)
        files.forEach(f => (f.$path = ''))
        /* istanbul ignore if: drop mode not easily tested in JSDOM */
        if (evt.type === 'drop') {
          files = files.filter(this.fileValid)
          // Set the v-model
          this.setFiles(files)
          // Ensure the input's files array is updated (if we can)
          this.setInputFiles(files)
        } else {
          this.setFiles(files)
        }
      }
    },
    traverseFileTree(item, path = '') /* istanbul ignore next: not supported in JSDOM */ {
      // Based on http://stackoverflow.com/questions/3590058
      // TODO:
      //   Change this to be modelled after the code from
      //   https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
      //   And have it return the structured array of Files
      //   So we can use this method in the draging handlers to check validity
      //   of dragged content before it is dropped
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
      // Reset the dragging flags
      this.dropAllowed = !this.noDrop
      this.dragging = false
      // Set teh selected file(s)
      this.selectedFiles = this.multiple
        ? (this.directory ? files : flattenDeep(files)).filter(Boolean)
        : [flattenDeep(files)[0]].filter(Boolean)
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
          // IE 11, the input gets in the "way" of the drop events, so we move it out of the way.
          // Clicking the custom-file-label opens the file dialog, and we don't need
          // the input in-view for drag/drop to work
          'sr-only': this.custom
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
        // Future proof with `directory` prop
        directory: this.directory,
        // This is potentially a future alternative prop to allow directory select
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
          // This goes away in Bootstrap v5
          'data-browse': this.browseText || null
        }
      },
      [h('span', { staticClass: 'd-block form-file-text' }, this.labelContent || [h()])]
      // Future Bootstrap v5: add button
      // h('span', { staticClass: 'form-file-button' }, this.browseContent || 'Browse')
    )

    // Return rendered custom file input
    return h(
      'div',
      {
        staticClass: 'custom-file b-form-file',
        // TODO:
        //   Possibly add state feedback (invalid) if !this.dropAllowed
        //   OR use `text-danger` class on the noDropPlaceholder content
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
