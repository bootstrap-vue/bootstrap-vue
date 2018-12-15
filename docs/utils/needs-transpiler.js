// Determine if the broser needs to use @babel/standalone compiler for v-play and playground

let needsTranspiler = false

// Tests to see if we need to compile ES6 to ES5
// If any test fails, then we need to transpile code with @babel/standalone
const tests = [
  'const test1 = (a) => a',
  'const test2 = { a: 1, b () { return 0 } }',
  'const test3a = { a: 1, b: 2}; const test3b = { c: 3, ...test3a }'
]

// Run tests to see if transpilation is needed
if (typeof window !== 'undefined') {
  for (let i = 0; i < tests.length && !needsTranspiler; i++) {
    try {
      eval(tests[i])
    } catch (e) {
      needsTranspiler = true
    }
  }
}

export default needsTranspiler
