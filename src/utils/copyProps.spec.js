import copyProps from './copyProps'

describe('utils/copyProps', () => {
  it('works with array props', async () => {
    const props = ['a', 'b', 'c']

    expect(copyProps(props)).toEqual(props)
    // Should be a new array reference
    expect(copyProps(props)).not.toBe(props)
  })

  it('works with object props', async () => {
    const props = {
      a: { type: String, default: 'foobar' },
      b: { type: [Object, Array], default: null },
      c: 'c'
    }

    expect(copyProps(props)).toEqual(props)
    // Should be a new object reference
    expect(copyProps(props)).not.toBe(props)
    // Properties should be new object references
    expect(copyProps(props).a === props.a).toBe(false)
    expect(copyProps(props).b === props.b).toBe(false)
    // Except for primatives
    expect(copyProps(props).c === props.c).toBe(true)
  })
})
