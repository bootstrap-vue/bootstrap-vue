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

export default CodeMirror
