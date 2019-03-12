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
      a: { type: String, default: '' },
      b: { type: [Object, Array], default: null },
      c: 'c'
    ]
    expect(copyProps(props)).toEqual(props)
    // Should be a new object reference
    expect(copyProps(props)).not.toBe(props)
    // Prop values should be a new object reference
    expect(copyProps(props).a).not.toBe(props.a)
    expect(copyProps(props).b).not.toBe(props.b)
    // Except for primatives
    expect(copyProps(props).c).toBe(props.c)
  })
})
