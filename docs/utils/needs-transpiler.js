// Determine if the broser needs to use @babel/standalone compiler for v-play and playground

let needsTranspiler = false

// Tests to see if we need to compile ES6 to ES5.  Tests for commonly used ES6 features.
// If any test fails, then we need to transpile code with @babel/standalone.
const tests = [
  // Arrow functions
  'const test1 = (a) => a',
  // Object function shortcut
  'const test2 = { a: 1, b() { return 0 } }',
  // Object shortcut
  'const test3a = { a: 1 }; const test3b = { test3a, b: 2 }',
  // Object spread
  'const test4a = { a: 1, b: 2 }; const test4b = { c: 3, ...test4a }',
  // Array spread
  'const test5a = [1, 2]; const test5b = [...test5a, 3, 4]',
  // String interpolation
  /* eslint-disable no-template-curly-in-string */
  'const test6a = "bar"; const test6b = `foo${test6a}`'
  /* eslint-enable no-template-curly-in-string */
]

// Run tests to see if transpilation is needed. Returns after first test that fails
if (typeof window !== 'undefined') {
  /* eslint-disable no-eval */
  for (let i = 0; i < tests.length && !needsTranspiler; i++) {
    try {
      eval(tests[i])
    } catch (e) {
      needsTranspiler = true
    }
  }
  /* eslint-enable no-eval */
}

export default needsTranspiler
