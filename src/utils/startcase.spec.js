import startCase from './startcase'

describe('utils/startcase', () => {
  it('works', async () => {
    expect(startCase('foobar')).toBe('Foobar')
    expect(startCase('Foobar')).toBe('Foobar')
    expect(startCase('foo_bar')).toBe('Foo Bar')
    expect(startCase('foo bar')).toBe('Foo Bar')
    expect(startCase('fooBar')).toBe('Foo Bar')
  })
})
