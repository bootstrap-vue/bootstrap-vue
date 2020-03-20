import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { BAvatar } from './avatar'
import { BIconPerson } from '../../icons/icons'

describe('avatar', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BAvatar)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
  })

  it('should have expected structure when prop `button` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        button: true
      }
    })
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toEqual('button')
    expect(wrapper.text()).toEqual('')
    expect(wrapper.find('.b-icon').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('should have expected structure when prop `href` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        href: '#foo'
      }
    })
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toEqual('#foo')
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toEqual('button')
    expect(wrapper.text()).toEqual('')
    expect(wrapper.find('.b-icon').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('should have expected structure when prop `text` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        text: 'BV'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.text()).toContain('BV')
    expect(wrapper.find('.b-icon').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('should have expected structure when default slot used', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        text: 'FOO'
      },
      slots: {
        default: 'BAR'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.text()).toContain('BAR')
    expect(wrapper.text()).not.toContain('FOO')
    expect(wrapper.find('.b-icon').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('should have expected structure when prop `src` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        src: '/foo/bar'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
    expect(wrapper.find('.b-icon').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual('/foo/bar')
  })

  it('should have expected structure when prop `src` set', async () => {
    const localVue = new CreateLocalVue()
    localVue.component('BIconPerson', BIconPerson)
    const wrapper = mount(BAvatar, {
      localVue,
      propsData: {
        iconName: 'person'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
    const $icon = wrapper.find('.b-icon')
    expect($icon.exists()).toBe(true)
    expect($icon.classes()).toContain('bi-person')
  })
})
