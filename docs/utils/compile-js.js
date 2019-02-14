// Utility for tranpiling ES6 code into ES5 for playground and v-play
import { transform, disableScriptTags } from '@babel/standalone'

if (typeof window !== 'undefined' && window && window.removeEventListener) {
  // Prevent Babel/Standalone from processing <script> tag insertions
  disableScriptTags()
}

const transformOptions = {
  presets: ['es2015', 'es2016', 'es2017'],
  plugins: [
    // Not used as we need to import the helpers into the transpiled code
    // 'transform-runtime',
    'proposal-object-rest-spread'
  ]
}

export default function compileJs(code) {
  if (!code) {
    return ''
  }
  return transform(code, transformOptions).code || ''
}
