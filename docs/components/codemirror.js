let CodeMirror
if (typeof window !== 'undefined') {
  CodeMirror = require('codemirror')
  require('codemirror/mode/javascript/javascript')
  // require('codemirror/mode/shell/shell')
  require('codemirror/mode/vue/vue')
  require('codemirror/mode/htmlmixed/htmlmixed')
  require('codemirror/addon/edit/closetag')
  require('codemirror/addon/edit/closebrackets')
  require('codemirror/addon/fold/xml-fold')
}

export default {
  name: 'CodeMirror',
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: [String, Object],
      default: ''
    },
    theme: {
      type: String,
      default: 'default'
    },
    tabMode: {
      type: String,
      default: 'indent'
    },
    tabSize: {
      type: [Number, String],
      default: 2
    },
    lineWrapping: {
      type: Boolean,
      default: true
    },
    lineNumbers: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      CM: null
    }
  },
  computed: {
    componentData() {
      return {
        staticClass: 'notranslate m-0 p-0',
        style: { minHeight: '300px' },
        attrs: { translate: 'no' }
      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (!oldVal || oldVal === '') {
        this.CM.setValue(newVal)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.CM = CodeMirror.fromTextarea(this.$refs.input, {
        mode: this.mode,
        theme: this.theme,
        tabMode: this.tabMode,
        tabSize: parseInt(this.tabSize, 10) || 2,
        lineWrapping: this.lineWrapping,
        lineNumbers: this.lineNumbers,
        autoCloseTags: true,
        autoCloseBrackets: true,
        readOnly: this.readOnly
      })

      this.CM.on('change', () => {
        this.$emit('input', this.CM.getValue())
      })

      this.CM.setValue(this.value)
    })
  },
  beforeDestroy() {
    this.CM = null
  },
  render(h) {
    return h('div', this.componentData, [h('textarea', { ref: 'input' })])
  }
}
