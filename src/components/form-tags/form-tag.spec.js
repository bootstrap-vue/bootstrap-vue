import { mount } from '@vue/test-utils'
import { BFormTag } from './form-tag'

describe('form-tag', () => {
  it('has expected structure', async () => {
    const wrapper = mount(BFormTag, {
      propsData: {
        title: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')

    expect(wrapper.classes()).toContain('b-form-tag')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.attributes('title')).toBe('foobar')
    expect(wrapper.text()).toContain('foobar')

    const $btn = wrapper.find('button')
    expect($btn.exists()).toBe(true)
    expect($btn.classes()).toContain('close')
    expect($btn.classes()).toContain('b-form-tag-remove')
    expect($btn.attributes('aria-label')).toBe('Remove tag')

    wrapper.destroy()
  })

  it('renders custom root element', async () => {
    const wrapper = mount(BFormTag, {
      propsData: {
        title: 'foobar',
        tag: 'li'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    expect(wrapper.classes()).toContain('b-form-tag')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.attributes('title')).toBe('foobar')
    expect(wrapper.text()).toContain('foobar')

    const $btn = wrapper.find('button')
    expect($btn.exists()).toBe(true)
    expect($btn.classes()).toContain('close')
    expect($btn.classes()).toContain('b-form-tag-remove')
    expect($btn.attributes('aria-label')).toBe('Remove tag')

    wrapper.destroy()
  })

  it('renders default slot', async () => {
    const wrapper = mount(BFormTag, {
      propsData: {
        title: 'foo'
      },
      slots: {
        default: 'bar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')

    expect(wrapper.classes()).toContain('b-form-tag')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.attributes('title')).toBe('foo')
    expect(wrapper.text()).toContain('bar')
    expect(wrapper.text()).not.toContain('foo')

    const $btn = wrapper.find('button')
    expect($btn.exists()).toBe(true)
    expect($btn.classes()).toContain('close')
    expect($btn.classes()).toContain('b-form-tag-remove')
    expect($btn.attributes('aria-label')).toBe('Remove tag')

    wrapper.destroy()
  })

  it('emits remove event when button clicked', async () => {
    const wrapper = mount(BFormTag, {
      propsData: {
        title: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')

    expect(wrapper.classes()).toContain('b-form-tag')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.attributes('title')).toBe('foobar')
    expect(wrapper.text()).toContain('foobar')

    const $btn = wrapper.find('button')
    expect($btn.exists()).toBe(true)
    expect($btn.classes()).toContain('close')
    expect($btn.classes()).toContain('b-form-tag-remove')
    expect($btn.attributes('aria-label')).toBe('Remove tag')

    expect(wrapper.emitted('remove')).not.toBeDefined()

    await $btn.trigger('click')

    expect(wrapper.emitted('remove')).toBeDefined()
    expect(wrapper.emitted('remove').length).toBe(1)

    wrapper.destroy()
  })
})
