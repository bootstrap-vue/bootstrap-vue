import { loadFixture, testVM } from '../../../tests/utils'

describe('embed', async () => {
  beforeEach(loadFixture(__dirname, 'embed'))
  testVM()

  it("default should be rendered with outer tag 'div'", async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it("tag should be rendered with outer tag 'aside'", async () => {
    const { app: { $refs } } = window
    expect($refs.tag).toBeElement('aside')
  })

  it("default should be rendered with inner tag 'iframe'", async () => {
    const { app: { $refs } } = window
    expect($refs.default.children[0]).toBeElement('iframe')
  })

  it("type should be rendered with inner tag 'video'", async () => {
    const { app: { $refs } } = window
    expect($refs.type.children[0]).toBeElement('video')
  })

  it("all should be rendered with default outer class 'embed-responsive'", async () => {
    const { app: { $refs } } = window;
    ['default', 'tag', 'type', 'aspect', 'attributes', 'children'].forEach(ref => {
      expect($refs[ref]).toHaveClass('embed-responsive')
    })
  })

  it("all should be rendered with default inner class 'embed-responsive-item'", async () => {
    const { app: { $refs } } = window;
    ['default', 'tag', 'type', 'aspect', 'attributes', 'children'].forEach(ref => {
      expect($refs[ref].children[0]).toHaveClass('embed-responsive-item')
    })
  })

  it("default should be rendered with outer class 'embed-responsive-16by9'", async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('embed-responsive-16by9')
  })

  it("aspect should be rendered with outer class 'embed-responsive-4by3'", async () => {
    const { app: { $refs } } = window
    expect($refs.aspect).toHaveClass('embed-responsive-4by3')
  })

  it("attributes should have attribute 'foo=bar' on inner tag", async () => {
    const { app: { $refs } } = window
    expect($refs.attributes.children[0].hasAttribute('foo')).toBe(true)
    expect($refs.attributes.children[0].getAttribute('foo')).toBe('bar')
  })

  it("attributes should have attribute 'baz' on inner tag", async () => {
    const { app: { $refs } } = window
    expect($refs.attributes.children[0].hasAttribute('baz')).toBe(true)
  })

  it('children should be rendered inside inner element', async () => {
    const { app: { $refs } } = window
    expect($refs.children.children[0].children[0]).toBeElement('source')
  })
})
