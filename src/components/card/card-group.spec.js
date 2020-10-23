import { mount } from '@vue/test-utils'
import { BCardGroup } from './card-group'

describe('card-group', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardGroup)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  it('has class card-group', async () => {
    const wrapper = mount(BCardGroup)

    expect(wrapper.classes()).toContain('card-group')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has custom root element when prop tag is set', async () => {
    const wrapper = mount(BCardGroup, {
      props: { tag: 'article' }
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('card-group')

    wrapper.unmount()
  })

  it('has class card-deck when prop deck=true', async () => {
    const wrapper = mount(BCardGroup, {
      props: { deck: true }
    })

    expect(wrapper.classes()).toContain('card-deck')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class card-columns when prop columns=true', async () => {
    const wrapper = mount(BCardGroup, {
      props: { columns: true }
    })

    expect(wrapper.classes()).toContain('card-columns')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardGroup, {
      attrs: {
        class: 'foobar'
      }
    })

    expect(wrapper.classes()).toContain('card-group')
    expect(wrapper.classes()).toContain('foobar')

    wrapper.unmount()
  })
})
