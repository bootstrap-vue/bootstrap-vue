// Utility for transpiling ES6 code into ES5 for playground and `v-play`
// Imported only on demand when needed
import { transform, disableScriptTags } from '@babel/standalone'

// Babel broke the standalone version via PR https://github.com/babel/babel/pull/10420
// Which assumes the browser supports String.prototype.trimLeft/Right
// IE 11 does not support either, and polyfill.io does not polyfill them
// So we do it here (as this file is only loaded if we need transpilation):
if (typeof window !== 'undefined') {
  const Proto = window.String.prototype

  // Ensure we have a `trimStart` method
  ;((obj, prop) => {
    if (!(prop in obj && obj[prop])) {
      const rx = /^\s+/
      obj[prop] =
        obj.trimLeft ||
        function() {
          return this.replace(rx, '')
        }
    }
  })(Proto, 'trimStart')

  // Ensure we have a `trimLeft` method
  ;((obj, prop) => {
    if (!(prop in obj && obj[prop])) {
      obj[prop] = obj.trimStart
    }
  })(Proto, 'trimLeft')

  // Ensure we have a `trimEnd` method
  ;((obj, prop) => {
    if (!(prop in obj && obj[prop])) {
      const rx = /\s+$/
      obj[prop] =
        obj.trimRight ||
        function() {
          return this.replace(rx, '')
        }
    }
  })(Proto, 'trimEnd')

  // Ensure we have a `trimRight` method
  ;((obj, prop) => {
    if (!(prop in obj && obj[prop])) {
      obj[prop] = obj.trimEnd
    }
  })(Proto, 'trimRight')
}

// Prevent Babel/Standalone from processing <script> tag insertions
if (typeof window !== 'undefined' && window && window.removeEventListener) {
  disableScriptTags()
}

// Our babel transform options
const transformOptions = {
  sourceType: 'script',
  presets: ['es2015', 'es2016', 'es2017'],
  plugins: [
    // Not used as we need to import the helpers into the transpiled code
    // 'transform-runtime',
    'proposal-object-rest-spread'
  ]
}

// Our transpilation compiler method
export default function compileJs(code) {
  if (!code) {
    return ''
  }
  return transform(code, transformOptions).code || ''
}
