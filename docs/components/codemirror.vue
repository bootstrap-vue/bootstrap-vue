<template>
  <textarea
    ref="textArea"
    :value="value"
  />
</template>

<script>
let CodeMirror

if (typeof window !== 'undefined') {
  CodeMirror = require('codemirror')

  /* eslint-disable import/no-unassigned-import */
  require('codemirror/mode/javascript/javascript')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/mode/shell/shell')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/mode/vue/vue')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/mode/htmlmixed/htmlmixed')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/addon/edit/closetag')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/addon/edit/closebrackets')
  /* eslint-disable import/no-unassigned-import */
  require('codemirror/addon/fold/xml-fold')
}

export default {
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
    this.CM = CodeMirror.fromTextArea(this.$refs.textArea, {
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
  }
}
</script>
