import { loadFixture, testVM } from '../../../tests/utils'

describe('img', () => {
  beforeEach(loadFixture(__dirname, 'image'))
  testVM()

  it("all should be rendered with an 'img' tag", async () => {
    const {
      app: { $refs }
    } = window
    ;[
      'default',
      'fluid',
      'thumbnail',
      'rounded',
      'roundedTop',
      'left',
      'right',
      'center',
      'blank',
      'blankSize',
      'blankSrc'
    ].forEach(ref => {
      const img = $refs[ref]
      expect(img).toBeDefined()
      expect(img).toBeElement('img')
    })
  })

  it("all but blanks should  have 'src' starting with 'https://picsum.photos'", async () => {
    const {
      app: { $refs }
    } = window
    ;['default', 'fluid', 'thumbnail', 'rounded', 'roundedTop', 'left', 'right', 'center'].forEach(
      ref => {
        const img = $refs[ref]
        expect(img).toBeDefined()
        expect(img.getAttribute('src')).toContain('https://picsum.photos')
      }
    )
    ;['blank', 'blankSize', 'blankSrc'].forEach(ref => {
      const img = $refs[ref]
      expect(img).toBeDefined()
      expect(img.getAttribute('src')).not.toContain('https://picsum.photos')
    })
  })

  it('default should not have any classes', async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.default
    expect(img).toBeDefined()
    expect(img.className).toBe('')
  })

  it("fluid should have class 'img-fluid'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.fluid
    expect(img).toBeDefined()
    expect(img).toHaveClass('img-fluid')
  })

  it("thumbnail should have class 'img-thumbnail'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.thumbnail
    expect(img).toBeDefined()
    expect(img).toHaveClass('img-thumbnail')
  })

  it("left should have class 'float-left'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.left
    expect(img).toBeDefined()
    expect(img).toHaveClass('float-left')
  })

  it("right should have class 'float-right'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.right
    expect(img).toBeDefined()
    expect(img).toHaveClass('float-right')
  })

  it("center should have classes 'mx-auto' and 'd-block'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.center
    expect(img).toBeDefined()
    expect(img).toHaveClass('mx-auto')
    expect(img).toHaveClass('d-block')
  })

  it('blank should have data URI as SRC', async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blank
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('data:image/svg+xml;charset=UTF-8,')
  })

  it("blank should have width and height set to '1'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blank
    expect(img).toBeDefined()
    expect(img.getAttribute('width')).toBe('1')
    expect(img.getAttribute('height')).toBe('1')
  })

  it('blankSize should have data URI as SRC', async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blankSize
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('data:image/svg+xml;charset=UTF-8,')
  })

  it("blankSize should have color 'blue'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blankSize
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('blue')
  })

  it("blankSize should have width set to '200' and height set to '250'", async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blankSize
    expect(img).toBeDefined()
    expect(img.getAttribute('width')).toBe('200')
    expect(img.getAttribute('height')).toBe('250')
  })

  it('blankSrc should have data URI as SRC', async () => {
    const {
      app: { $refs }
    } = window
    const img = $refs.blankSrc
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toContain('data:image/svg+xml;charset=UTF-8,')
  })
})
