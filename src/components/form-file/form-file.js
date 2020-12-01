import Vue from '../../vue'
import { NAME_FORM_FILE } from '../../constants/components'
import { EVENT_OPTIONS_PASSIVE } from '../../constants/events'
import { RX_EXTENSION, RX_STAR } from '../../constants/regex'
import cloneDeep from '../../utils/clone-deep'
import identity from '../../utils/identity'
import looseEqual from '../../utils/loose-equal'
import { from as arrayFrom, flatten, flattenDeep } from '../../utils/array'
import { makePropsConfigurable } from '../../utils/config'
import { closest } from '../../utils/dom'
import { hasPromiseSupport } from '../../utils/env'
import { eventOn, eventOff, stopEvent } from '../../utils/events'
import { isArray, isFile, isFunction, isNull, isUndefinedOrNull } from '../../utils/inspect'
import { File } from '../../utils/safe-types'
import { escapeRegExp } from '../../utils/string'
import { warn } from '../../utils/warn'
import attrsMixin from '../../mixins/attrs'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formCustomMixin, { props as formCustomProps } from '../../mixins/form-custom'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { props as formSizeProps } from '../../mixins/form-size'

// --- Constants ---

const VALUE_EMPTY_DEPRECATED_MSG =
  'Setting "value"/"v-model" to an empty string for reset is deprecated. Set to "null" instead.'

// --- Helper methods ---

const isValidValue = value => isFile(value) || (isArray(value) && value.every(v => isValidValue(v)))

// Helper method to "safely" get the entry from a data-transfer item
/* istanbul ignore next: not supported in JSDOM */
const getDataTransferItemEntry = item =>
  isFunction(item.getAsEntry)
    ? item.getAsEntry()
    : isFunction(item.webkitGetAsEntry)
      ? item.webkitGetAsEntry()
      : null

// Drop handler function to get all files
/* istanbul ignore next: not supported in JSDOM */
const getAllFileEntries = (dataTransferItemList, traverseDirectories = true) =>
  Promise.all(
    arrayFrom(dataTransferItemList)
      .filter(item => item.kind === 'file')
      .map(item => {
        const entry = getDataTransferItemEntry(item)
        if (entry) {
          if (entry.isDirectory && traverseDirectories) {
            return getAllFileEntriesInDirectory(entry.createReader(), `${entry.name}/`)
          } else if (entry.isFile) {
            return new Promise(resolve => {
              entry.file(file => {
                file.$path = ''
                resolve(file)
              })
            })
          }
        }
        return null
      })
      .filter(identity)
  )

// Get all the file entries (recursive) in a directory
/* istanbul ignore next: not supported in JSDOM */
const getAllFileEntriesInDirectory = (directoryReader, path = '') =>
  new Promise(resolve => {
    const entryPromises = []
    const readDirectoryEntries = () => {
      directoryReader.readEntries(entries => {
        if (entries.length === 0) {
          resolve(Promise.all(entryPromises).then(entries => flatten(entries)))
        } else {
          entryPromises.push(
            Promise.all(
              entries
                .map(entry => {
                  if (entry) {
                    if (entry.isDirectory) {
                      return getAllFileEntriesInDirectory(
                        entry.createReader(),
                        `${path}${entry.name}/`
                      )
                    } else if (entry.isFile) {
                      return new Promise(resolve => {
                        entry.file(file => {
                          file.$path = `${path}${file.name}`
                          resolve(file)
                        })
                      })
                    }
                  }
                  return null
                })
                .filter(identity)
            )
          )

          readDirectoryEntries()
        }
      })
    }

    readDirectoryEntries()
  })

// --- Props ---

const props = makePropsConfigurable(
  {
    ...formControlProps,
    ...formCustomProps,
    ...formStateProps,
    ...formSizeProps,
    value: {
      type: [File, Array],
      default: null,
      validator(value) {
        /* istanbul ignore next */
        if (value === '') {
          warn(VALUE_EMPTY_DEPRECATED_MSG, NAME_FORM_FILE)
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
      default: 'No file chosen'
    },
    browseText: {
      type: String,
      default: 'Browse'
    },
    dropPlaceholder: {
      type: String,
      default: 'Drop files here'
    },
    noDropPlaceholder: {
      type: String,
      default: 'Not allowed'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Boolean,
      default: false
    },
    // TODO:
    //   Should we deprecate this and only support flat file structures?
    //   Nested file structures are only supported when files are dropped
    //   A Chromium "bug" prevents `webkitEntries` from being populated
    //   on the file input's `change` event and is marked as "WontFix"
    //   Mozilla implemented the behavior the same way as Chromium
    //   See: https://bugs.chromium.org/p/chromium/issues/detail?id=138987
    //   See: https://bugzilla.mozilla.org/show_bug.cgi?id=1326031
    noTraverse: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    },
    fileNameFormatter: {
      type: Function
      // default: null
    }
  },
  NAME_FORM_FILE
)

// @vue/component
export const BFormFile = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_FILE,
  mixins: [
    attrsMixin,
    idMixin,
    formControlMixin,
    formStateMixin,
    formCustomMixin,
    normalizeSlotMixin
  ],
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props,
  data() {
    return {
      files: [],
      dragging: false,
      // IE 11 doesn't respect setting `evt.dataTransfer.dropEffect`,
      // so we handle it ourselves as well
      // https://stackoverflow.com/a/46915971/2744776
      dropAllowed: !this.noDrop,
      hasFocus: false
    }
  },
  computed: {
    // Convert `accept` to an array of `[{ RegExpr, isMime }, ...]`
    computedAccept() {
      let { accept } = this
      accept = (accept || '')
        .trim()
        .split(/[,\s]+/)
        .filter(Boolean)

      // Allow any file type/extension
      if (accept.length === 0) {
        return null
      }

      return accept.map(extOrType => {
        let prop = 'name'
        let startMatch = '^'
        let endMatch = '$'
        if (RX_EXTENSION.test(extOrType)) {
          // File extension /\.ext$/
          startMatch = ''
        } else {
          // MIME type /^mime\/.+$/ or /^mime\/type$/
          prop = 'type'
          if (RX_STAR.test(extOrType)) {
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
      const { capture } = this
      return capture === true || capture === '' ? true : capture || null
    },
    computedAttrs() {
      const { name, disabled, required, form, computedCapture, accept, multiple, directory } = this
      return {
        ...this.bvAttrs,
        type: 'file',
        id: this.safeId(),
        name,
        disabled,
        required,
        form: form || null,
        capture: computedCapture,
        accept: accept || null,
        multiple,
        directory,
        webkitdirectory: directory,
        'aria-required': required ? 'true' : null
      }
    },
    computedFileNameFormatter() {
      const { fileNameFormatter } = this
      return fileNameFormatter.name !== props.fileNameFormatter.default.name
        ? fileNameFormatter
        : this.defaultFileNameFormatter
    },
    clonedFiles() {
      return cloneDeep(this.files)
    },
    flattenedFiles() {
      return flattenDeep(this.files)
    },
    fileNames() {
      return this.flattenedFiles.map(file => file.name)
    },
    labelContent() {
      const h = this.$createElement

      // Draging active
      /* istanbul ignore next: used by drag/drop which can't be tested easily */
      if (this.dragging && !this.noDrop) {
        return (
          // TODO: Add additional scope with file count, and other not-allowed reasons
          this.normalizeSlot('drop-placeholder', { allowed: this.dropAllowed }) ||
          (this.dropAllowed
            ? this.dropPlaceholder
            : h('span', { staticClass: 'text-danger' }, this.noDropPlaceholder))
        )
      }

      // No file chosen
      if (this.files.length === 0) {
        return this.normalizeSlot('placeholder') || this.placeholder
      }

      const { flattenedFiles, clonedFiles, fileNames, computedFileNameFormatter } = this

      // There is a slot for formatting the files/names
      if (this.hasNormalizedSlot('file-name')) {
        return this.normalizeSlot('file-name', {
          files: flattenedFiles,
          filesTraversed: clonedFiles,
          names: fileNames
        })
      }

      return computedFileNameFormatter(flattenedFiles, clonedFiles, fileNames)
    }
  },
  watch: {
    value(newValue) {
      if (!newValue || (isArray(newValue) && newValue.length === 0)) {
        this.reset()
      }
    },
    files(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        const { multiple, noTraverse } = this
        const files = !multiple || noTraverse ? flattenDeep(newValue) : newValue
        this.$emit('input', multiple ? files : files[0] || null)
      }
    }
  },
  mounted() {
    // Listen for form reset events, to reset the file input
    const $form = closest('form', this.$el)
    if ($form) {
      eventOn($form, 'reset', this.reset, EVENT_OPTIONS_PASSIVE)
      this.$on('hook:beforeDestroy', () => {
        eventOff($form, 'reset', this.reset, EVENT_OPTIONS_PASSIVE)
      })
    }
  },
  methods: {
    isFileValid(file) {
      if (!file) {
        return false
      }
      const accept = this.computedAccept
      return accept ? accept.some(a => a.rx.test(file[a.prop])) : true
    },
    isFilesArrayValid(files) {
      return isArray(files) ? files.every(file => this.isFileValid(file)) : this.isFileValid(files)
    },
    defaultFileNameFormatter(flattenedFiles, clonedFiles, fileNames) {
      return fileNames.join(', ')
    },
    setFiles(files) {
      // Reset the dragging flags
      this.dropAllowed = !this.noDrop
      this.dragging = false
      // Set the selected files
      this.files = this.multiple
        ? this.directory
          ? files
          : flattenDeep(files)
        : flattenDeep(files).slice(0, 1)
    },
    /* istanbul ignore next: used by Drag/Drop */
    setInputFiles(files) {
      // Try an set the file input files array so that `required`
      // constraint works for dropped files (will fail in IE11 though)
      // To be used only when dropping files
      try {
        // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()
        // Add flattened files to temp `dataTransfer` object to get a true `FileList` array
        flattenDeep(cloneDeep(files)).forEach(file => {
          // Make sure to remove the custom `$path` attribute
          delete file.$path
          dataTransfer.items.add(file)
        })
        this.$refs.input.files = dataTransfer.files
      } catch {}
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
      } catch {}
      this.files = []
    },
    handleFiles(files, isDrop = false) {
      if (isDrop) {
        // When dropped, make sure to filter files with the internal `accept` logic
        const filteredFiles = files.filter(this.isFilesArrayValid)
        // Only update files when we have any after filtering
        if (filteredFiles.length > 0) {
          this.setFiles(filteredFiles)
          // Try an set the file input's files array so that `required`
          // constraint works for dropped files (will fail in IE 11 though)
          this.setInputFiles(filteredFiles)
        }
      } else {
        // We always update the files from the `change` event
        this.setFiles(files)
      }
    },
    focusHandler(evt) {
      // Bootstrap v4 doesn't have focus styling for custom file input
      // Firefox has a `[type=file]:focus ~ sibling` selector issue,
      // so we add a `focus` class to get around these bugs
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true
      }
    },
    onChange(evt) {
      const { type, target, dataTransfer = {} } = evt
      const isDrop = type === 'drop'

      // Always emit original event
      this.$emit('change', evt)

      const items = arrayFrom(dataTransfer.items || [])
      if (hasPromiseSupport && items.length > 0 && !isNull(getDataTransferItemEntry(items[0]))) {
        // Drop handling for modern browsers
        // Supports nested directory structures in `directory` mode
        /* istanbul ignore next: not supported in JSDOM */
        getAllFileEntries(items, this.directory).then(files => this.handleFiles(files, isDrop))
      } else {
        // Standard file input handling (native file input change event),
        // or fallback drop mode (IE 11 / Opera) which don't support `directory` mode
        const files = arrayFrom(target.files || dataTransfer.files || []).map(file => {
          // Add custom `$path` property to each file (to be consistent with drop mode)
          file.$path = file.webkitRelativePath || ''
          return file
        })
        this.handleFiles(files, isDrop)
      }
    },
    onDragenter(evt) {
      stopEvent(evt)
      this.dragging = true
      const { dataTransfer = {} } = evt
      // Early exit when the input or dropping is disabled
      if (this.noDrop || this.disabled || !this.dropAllowed) {
        // Show deny feedback
        /* istanbul ignore next: not supported in JSDOM */
        dataTransfer.dropEffect = 'none'
        this.dropAllowed = false
        return
      }
      /* istanbul ignore next: not supported in JSDOM */
      dataTransfer.dropEffect = 'copy'
    },
    // Note this event fires repeatedly while the mouse is over the dropzone at
    // intervals in the milliseconds, so avoid doing much processing in here
    onDragover(evt) {
      stopEvent(evt)
      this.dragging = true
      const { dataTransfer = {} } = evt
      // Early exit when the input or dropping is disabled
      if (this.noDrop || this.disabled || !this.dropAllowed) {
        // Show deny feedback
        /* istanbul ignore next: not supported in JSDOM */
        dataTransfer.dropEffect = 'none'
        this.dropAllowed = false
        return
      }
      /* istanbul ignore next: not supported in JSDOM */
      dataTransfer.dropEffect = 'copy'
    },
    onDragleave(evt) {
      stopEvent(evt)
      this.$nextTick(() => {
        this.dragging = false
        // Reset `dropAllowed` to default
        this.dropAllowed = !this.noDrop
      })
    },
    // Triggered by a file drop onto drop target
    onDrop(evt) {
      stopEvent(evt)
      this.dragging = false
      // Early exit when the input or dropping is disabled
      if (this.noDrop || this.disabled || !this.dropAllowed) {
        this.$nextTick(() => {
          // Reset `dropAllowed` to default
          this.dropAllowed = !this.noDrop
        })
        return
      }
      this.onChange(evt)
    }
  },
  render(h) {
    const { custom, plain, size, dragging, stateClass } = this

    // Form Input
    const $input = h('input', {
      ref: 'input',
      class: [
        {
          'form-control-file': plain,
          'custom-file-input': custom,
          focus: custom && this.hasFocus
        },
        stateClass
      ],
      // With IE 11, the input gets in the "way" of the drop events,
      // so we move it out of the way by putting it behind the label
      // Bootstrap v4 has it in front
      style: custom ? { zIndex: -5 } : {},
      attrs: this.computedAttrs,
      on: {
        change: this.onChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler,
        reset: this.reset
      }
    })

    if (plain) {
      return $input
    }

    // Overlay label
    const $label = h(
      'label',
      {
        staticClass: 'custom-file-label',
        class: { dragging },
        attrs: {
          for: this.safeId(),
          // This goes away in Bootstrap v5
          'data-browse': this.browseText || null
        }
      },
      [
        h(
          'span',
          {
            staticClass: 'd-block form-file-text',
            // `pointer-events: none` is used to make sure
            // the drag events fire only on the label
            style: { pointerEvents: 'none' }
          },
          [this.labelContent]
        )
      ]
    )

    // Return rendered custom file input
    return h(
      'div',
      {
        staticClass: 'custom-file b-form-file',
        class: [{ [`b-custom-control-${size}`]: size }, stateClass],
        attrs: { id: this.safeId('_BV_file_outer_') },
        on: {
          dragenter: this.onDragenter,
          dragover: this.onDragover,
          dragleave: this.onDragleave,
          drop: this.onDrop
        }
      },
      [$input, $label]
    )
  }
})
