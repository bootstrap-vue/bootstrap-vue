import upperFirst from './upper-first'

describe('utils/upperFirst', () => {
  it('works', async () => {
    expect(upperFirst('lower')).toBe('Lower')
    expect(upperFirst(' lower ')).toBe('Lower')
    expect(upperFirst('lower case')).toBe('Lower case')
    expect(upperFirst(null)).toBe('Null')
    expect(upperFirst(undefined)).toBe('Undefined')
    expect(upperFirst({})).toBe('[object Object]')
    expect(upperFirst([])).toBe('')
    expect(upperFirst(['foo', 'bar'])).toBe('Foo,bar')
  })
})
