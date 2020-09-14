import {
  escapeRegExp,
  kebabCase,
  lowerFirst,
  pascalCase,
  startCase,
  toString,
  upperFirst
} from './string'

describe('utils/string', () => {
  it('kebabCase() works', async () => {
    expect(kebabCase('foo')).toBe('foo')
    expect(kebabCase('Foo')).toBe('foo')
    expect(kebabCase('fooBar')).toBe('foo-bar')
    expect(kebabCase('FooBar')).toBe('foo-bar')
    expect(kebabCase('XFooBar')).toBe('x-foo-bar')
  })

  it('pascalCase() works', async () => {
    expect(pascalCase('foo')).toBe('Foo')
    expect(pascalCase('Foo')).toBe('Foo')
    expect(pascalCase('fooBar')).toBe('FooBar')
    expect(pascalCase('FooBar')).toBe('FooBar')
    expect(pascalCase('foo-bar')).toBe('FooBar')
    expect(pascalCase('x-foo-bar')).toBe('XFooBar')
    expect(pascalCase('xFooBar')).toBe('XFooBar')
  })

  it('startCase() works', async () => {
    expect(startCase('foobar')).toBe('Foobar')
    expect(startCase('Foobar')).toBe('Foobar')
    expect(startCase('foo_bar')).toBe('Foo Bar')
    expect(startCase('foo bar')).toBe('Foo Bar')
    expect(startCase('fooBar')).toBe('Foo Bar')
  })

  it('lowerFirst() works', async () => {
    expect(lowerFirst('Upper')).toBe('upper')
    expect(lowerFirst(' Upper ')).toBe('upper')
    expect(lowerFirst('Upper case')).toBe('upper case')
    expect(lowerFirst(null)).toBe('null')
    expect(lowerFirst(undefined)).toBe('undefined')
    expect(lowerFirst({})).toBe('[object Object]')
    expect(lowerFirst([])).toBe('')
    expect(lowerFirst(['Foo', 'bar'])).toBe('foo,bar')
  })

  it('upperFirst() works', async () => {
    expect(upperFirst('lower')).toBe('Lower')
    expect(upperFirst(' lower ')).toBe('Lower')
    expect(upperFirst('lower case')).toBe('Lower case')
    expect(upperFirst(null)).toBe('Null')
    expect(upperFirst(undefined)).toBe('Undefined')
    expect(upperFirst({})).toBe('[object Object]')
    expect(upperFirst([])).toBe('')
    expect(upperFirst(['foo', 'bar'])).toBe('Foo,bar')
  })

  it('escapeRegExp() works', async () => {
    expect(escapeRegExp('Hello?')).toBe('Hello\\?')
    expect(escapeRegExp('$100')).toBe('\\$100')
    expect(escapeRegExp('10 * 5')).toBe('10 \\* 5')
    expect(escapeRegExp('[-/\\^$*+?.()|[\\]{}]')).toBe(
      '\\[\\-\\/\\\\\\^\\$\\*\\+\\?\\.\\(\\)\\|\\[\\\\\\]\\{\\}\\]'
    )
  })

  it('toString() works', async () => {
    expect(toString(null)).toBe('')
    expect(toString(undefined)).toBe('')
    expect(toString(true)).toBe('true')
    expect(toString(false)).toBe('false')
    expect(toString({ a: 1, b: 2, c: { d: 'foo' } })).toBe(`{
  "a": 1,
  "b": 2,
  "c": {
    "d": "foo"
  }
}`)
    expect(toString({ a: 1, b: 2, c: { d: 'foo' } }, 4)).toBe(`{
    "a": 1,
    "b": 2,
    "c": {
        "d": "foo"
    }
}`)
    expect(toString([])).toBe('[]')
    expect(toString(['foo', 'bar'])).toBe(`[
  "foo",
  "bar"
]`)
  })
})
