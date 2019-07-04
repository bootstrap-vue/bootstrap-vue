import hljs from 'highlight.js/lib/highlight.js'

// import only the languages we need for hljs
import hljsJS from 'highlight.js/lib/languages/javascript'
import hljsTS from 'highlight.js/lib/languages/typescript'
import hljsJSON from 'highlight.js/lib/languages/json'
import hljsXML from 'highlight.js/lib/languages/xml'
import hljsCSS from 'highlight.js/lib/languages/css'
import hljsSCSS from 'highlight.js/lib/languages/scss'
import hljsBash from 'highlight.js/lib/languages/bash'
import hljsShell from 'highlight.js/lib/languages/shell'
import hljsPlaintext from 'highlight.js/lib/languages/plaintext'

// Register languages
hljs.registerLanguage('javascript', hljsJS)
hljs.registerLanguage('typescript', hljsTS)
hljs.registerLanguage('json', hljsJSON)
hljs.registerLanguage('xml', hljsXML) // includes HTML
hljs.registerLanguage('css', hljsCSS)
hljs.registerLanguage('scss', hljsSCSS)
hljs.registerLanguage('bash', hljsBash) // includes sh
hljs.registerLanguage('shell', hljsShell)
hljs.registerLanguage('plaintext', hljsPlaintext)

export default hljs
