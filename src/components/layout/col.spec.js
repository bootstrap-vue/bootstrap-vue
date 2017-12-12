import { loadFixture, testVM } from '../../../tests/utils'

// TODO: Export function from col.js
function computeBkPtClass (type, breakpoint, val) {
  let className = type
  if (val === false || val === null || val === undefined) {
    return undefined
  }
  if (breakpoint) {
    className += `-${breakpoint}`
  }
  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase()
  }
  // .order-md-6
  className += `-${val}`
  return className.toLowerCase()
}

describe('col', async () => {
  beforeEach(loadFixture(__dirname, 'col'))
  testVM()

  it("should apply '.col' when no props passed", async () => {
    const { $refs } = window.app
    expect($refs.basic).toHaveClass('col')
  })

  it("should apply '.col-*' class with 'cols' prop", async () => {
    const { $refs } = window.app
    $refs.cols.forEach((vnode, i) => {
      const size = i + 1
      expect(vnode).toHaveClass(`col-${size}`)
      expect(vnode).not.toHaveClass('col')
    })
  })

  it("should apply '.offset-*' class with 'offset' prop", async () => {
    const { $refs } = window.app
    $refs.offset.forEach((vnode, i) => {
      const size = i + 1
      expect(vnode).toHaveClass(`offset-${size}`)
    })
  })

  it("should apply '.order-*' class with 'order' prop", async () => {
    const { $refs } = window.app
    $refs.order.forEach((vnode, i) => {
      const size = i + 1
      expect(vnode).toHaveClass(`order-${size}`)
    })
  })

  it("should apply breakpoint classes for 'col', 'offset', 'order' props", async () => {
    const { $refs } = window.app
    for (const bkpt of ['sm', 'md', 'lg', 'xl']) {
      $refs[`multi-${bkpt}`].forEach((vnode, i) => {
        const size = i + 1
        expect(vnode).toHaveAllClasses([
          `col-${bkpt}-${size}`,
          `offset-${bkpt}-${size}`,
          `order-${bkpt}-${size}`
        ])
        expect(vnode).not.toHaveClass('col')
      })
    }
  })

  it('computeBkPtClass helper should compute boolean classes', async () => {
    expect(computeBkPtClass('col', 'sm', true)).toBe('col-sm')
    expect(computeBkPtClass('col', 'md', true)).toBe('col-md')
    expect(computeBkPtClass('col', 'lg', true)).toBe('col-lg')
    expect(computeBkPtClass('col', 'xl', true)).toBe('col-xl')
  })

  it('computeBkPtClass helper should compute boolean classes when given empty string', async () => {
    expect(computeBkPtClass('col', 'sm', '')).toBe('col-sm')
    expect(computeBkPtClass('col', 'md', '')).toBe('col-md')
    expect(computeBkPtClass('col', 'lg', '')).toBe('col-lg')
    expect(computeBkPtClass('col', 'xl', '')).toBe('col-xl')
  })

  it("computeBkPtClass helper should NOT compute boolean classes when value 'false' (return 'undefined')", async () => {
    expect(computeBkPtClass('col', 'sm', false)).toBe(undefined)
    expect(computeBkPtClass('col', 'md', false)).toBe(undefined)
    expect(computeBkPtClass('col', 'lg', false)).toBe(undefined)
    expect(computeBkPtClass('col', 'xl', false)).toBe(undefined)
  })

  it("should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop", async () => {
    const { $refs } = window.app;
    ['sm', 'md', 'lg', 'xl'].forEach((bkpt, idx) => {
      // Shorthand binding <b-col sm />
      expect($refs[bkpt]).toHaveClass(`col-${bkpt}`)
      // Dynamically bound using object literals { sm: true }
      expect($refs[`boolean-breakpoints`][idx]).toHaveClass(`col-${bkpt}`)
      expect($refs[`boolean-breakpoints`][idx]).not.toHaveClass('col')
    })
  })

  it("should apply 'tag'", async () => {
    const { $refs } = window.app
    expect($refs.tag).toBeElement('section')
  })

  it("should apply '.align-self-*' class with 'align-self' prop", async () => {
    const { $refs } = window.app
    expect($refs.alignSelf).toHaveClass('align-self-center')
  })
})
