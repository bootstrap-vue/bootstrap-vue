// @vue/component
export default {
  name: 'BVCodeMirror',
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
    import('../utils/code-mirror' /* webpackChunkName: "code-mirror" */).then(module => {
      const CodeMirror = module.default || module

      this.CM = CodeMirror.fromTextArea(this.$refs.input, {
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

      // this.CM.on('change', () => {
      this.CM.on('changes', () => {
        this.$emit('input', this.CM.getValue())
      })

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.CM.setValue(this.value)
        })
      })
    })
  },
  beforeDestroy() {
    if (this.CM) {
      this.CM.toTextArea()
    }
    this.CM = null
  },
  render(h) {
    return h('div', this.componentData, [
      h('textarea', {
        ref: 'input',
        staticClass: 'w-100 border-0',
        style: { minWidth: '100px' },
        props: { value: this.value }
      })
    ])
  }
}
