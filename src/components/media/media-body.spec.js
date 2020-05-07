import { mount } from '@vue/test-utils'
import { BMediaBody } from './media-body'

describe('media-body', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BMediaBody)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-body')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('custom root element when prop tag is set', async () => {
    const wrapper = mount(BMediaBody, {
      propsData: {
        tag: 'article'
      }
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('media-body')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BMediaBody, {
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-body')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('b').length).toBe(1)
    expect(wrapper.find('b').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
