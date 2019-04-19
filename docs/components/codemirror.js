let CodeMirror
if (typeof window !== 'undefined') {
  CodeMirror = require('codemirror')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/shell/shell')
  require('codemirror/mode/vue/vue')
  require('codemirror/mode/htmlmixed/htmlmixed')
  require('codemirror/addon/edit/closetag')
  require('codemirror/addon/edit/closebrackets')
  require('codemirror/addon/fold/xml-fold')
}

export default {
  name: 'BDVCodemirror',
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
  watch: {
    value(newVal, oldVal) {
      if (!oldVal || oldVal === '') {
        this.CM.setValue(newVal)
      }
    }
  },
  mounted() {
    this.CM = CodeMirror.fromTextArea(this.$refs.textarea, {
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
  },
  beforeDestroy() {
    if (this.CM) {
      this.CM.toTextArea()
    }
  },
  render(h) {
    return h('textarea', {
      props: { value: this.value },
      ref: 'textarea'
    })
  }
}
