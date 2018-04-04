import { loadFixture, testVM } from '../../../tests/utils'

describe('input-group', async () => {
  beforeEach(loadFixture(__dirname, 'input-group'))
  testVM()

  it("should have '.input-group' class on root element", async () => {
    const { app: { $refs } } = window

    const refs = ['basic', 'components']

    refs.forEach(ref => {
      expect($refs[ref]).toHaveClass('input-group')
    })
  })

  it("should have role 'group' on root element", async () => {
    const { app: { $refs } } = window

    const refs = ['basic', 'components']

    refs.forEach(ref => {
      expect($refs[ref].getAttribute('role')).toBe('group')
    })
  })

  it('basic should have `div.input-group-prepend` as first child', async () => {
    const { app: { $refs } } = window

    const left = $refs.basic.children[0]
    expect(left).toBeDefined()
    expect(left).toHaveClass('input-group-prepend')
  })

  it('basic should have content in left `.input-group-prepend`', async () => {
    const { app: { $refs } } = window

    const left = $refs.basic.children[0]
    expect(left).toBeDefined()
    expect(left.textContent).toContain('$')
  })

  it('basic should have right `.input-group-append` as last child', async () => {
    const { app: { $refs } } = window

    const right = $refs.basic.children[2]
    expect(right).toBeDefined()
    expect(right).toHaveClass('input-group-append')
  })

  it('basic should have content in `.input-group-append`', async () => {
    const { app: { $refs } } = window

    const right = $refs.basic.children[2]
    expect(right).toBeDefined()
    expect(right.textContent).toContain('.00')
  })

  it('basic should have input as second child', async () => {
    const { app: { $refs } } = window

    const input = $refs.basic.children[1]
    expect(input).toBeDefined()
    expect(input.tagName).toBe('INPUT')
  })

  it('components should have `.input-group-prepend` as first child', async () => {
    const { app: { $refs } } = window

    const left = $refs.components.children[0]
    expect(left).toBeDefined()
    expect(left).toHaveClass('input-group-prepend')
  })

  it('components should have content in left `.input-group-prepend`', async () => {
    const { app: { $refs } } = window

    const left = $refs.components.children[0]
    expect(left).toBeDefined()
    expect(left.textContent).toContain('$')
  })

  it('components should have right `.input-group-append` as last child', async () => {
    const { app: { $refs } } = window

    const right = $refs.components.children[2]
    expect(right).toBeDefined()
    expect(right).toHaveClass('input-group-append')
  })

  it('components should have button in right `.input-group-append`', async () => {
    const { app: { $refs } } = window

    const right = $refs.components.children[2]
    expect(right).toBeDefined()
    const button = right.children[0]
    expect(button).toBeDefined()
    expect(button.tagName).toBe('BUTTON')
  })

  it('components should have input as second child', async () => {
    const { app: { $refs } } = window

    const input = $refs.components.children[1]
    expect(input).toBeDefined()
    expect(input.tagName).toBe('INPUT')
  })

  it("large should have '.input-group-lg' class on root element", async () => {
    const { app: { $refs } } = window

    expect($refs.large).toHaveClass('input-group-lg')
  })

  it("small should have '.input-group-sm' class on root element", async () => {
    const { app: { $refs } } = window

    expect($refs.small).toHaveClass('input-group-sm')
  })

  it("tags should have root Element type of `fieldset'", async () => {
    const { app: { $refs } } = window

    const tags = $refs.tags
    expect(tags).toBeDefined()
    expect(tags.tagName).toBe('FIELDSET')
  })

  it("tags should have addon Element type of `span'", async () => {
    const { app: { $refs } } = window

    const tags = $refs.tags
    expect(tags).toBeDefined()
    const left = tags.children[0]
    expect(left).toBeDefined()
    expect(left.tagName).toBe('SPAN')
  })
})
