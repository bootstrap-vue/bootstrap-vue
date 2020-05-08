import { mount } from '@vue/test-utils'
import { BEmbed } from './embed'

describe('embed', () => {
  it('default should have expected default structure', async () => {
    const wrapper = mount(BEmbed)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.classes()).toContain('embed-responsive-16by9')
    expect(wrapper.classes().length).toBe(2)

    expect(wrapper.findAll('iframe').length).toBe(1)
    expect(wrapper.find('iframe').classes()).toContain('embed-responsive-item')
    expect(wrapper.find('iframe').classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has custom root element when tag prop set', async () => {
    const wrapper = mount(BEmbed, {
      propsData: {
        tag: 'aside'
      }
    })

    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.classes()).toContain('embed-responsive-16by9')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('iframe').length).toBe(1)

    wrapper.destroy()
  })

  it('it renders specified inner element when type set', async () => {
    const wrapper = mount(BEmbed, {
      propsData: {
        type: 'video'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.classes()).toContain('embed-responsive-16by9')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('video').length).toBe(1)
    expect(wrapper.find('video').classes()).toContain('embed-responsive-item')
    expect(wrapper.find('video').classes().length).toBe(1)

    wrapper.destroy()
  })

  it('renders specified aspect ratio class', async () => {
    const wrapper = mount(BEmbed, {
      propsData: {
        aspect: '4by3'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.classes()).toContain('embed-responsive-4by3')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('non-prop attributes should rendered on on inner element', async () => {
    const wrapper = mount(BEmbed, {
      attrs: {
        src: '/foo/bar',
        baz: 'buz'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.findAll('iframe').length).toBe(1)
    expect(wrapper.find('iframe').classes()).toContain('embed-responsive-item')
    expect(wrapper.find('iframe').attributes('src')).toBeDefined()
    expect(wrapper.find('iframe').attributes('src')).toBe('/foo/bar')
    expect(wrapper.find('iframe').attributes('baz')).toBeDefined()
    expect(wrapper.find('iframe').attributes('baz')).toBe('buz')

    wrapper.destroy()
  })

  it('default slot should be rendered inside inner element', async () => {
    const wrapper = mount(BEmbed, {
      propsData: {
        type: 'video'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('embed-responsive')
    expect(wrapper.classes()).toContain('embed-responsive-16by9')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('video').length).toBe(1)
    expect(wrapper.find('video').classes()).toContain('embed-responsive-item')
    expect(wrapper.find('video').classes().length).toBe(1)
    expect(wrapper.find('video').text()).toBe('foobar')

    wrapper.destroy()
  })
})
