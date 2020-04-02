import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { BIconPerson } from '../../icons/icons'
import { BAvatar } from './avatar'

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
        icon: 'person'
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

  it('`size` prop should work as expected', async () => {
    const wrapper1 = mount(BAvatar)
    expect(wrapper1.attributes('style')).toEqual('width: 2.5em; height: 2.5em;')

    const wrapper2 = mount(BAvatar, { propsData: { size: 'sm' } })
    expect(wrapper2.attributes('style')).toEqual('width: 1.5em; height: 1.5em;')

    const wrapper3 = mount(BAvatar, { propsData: { size: 'md' } })
    expect(wrapper3.attributes('style')).toEqual('width: 2.5em; height: 2.5em;')

    const wrapper4 = mount(BAvatar, { propsData: { size: 'lg' } })
    expect(wrapper4.attributes('style')).toEqual('width: 3.5em; height: 3.5em;')

    const wrapper5 = mount(BAvatar, { propsData: { size: 20 } })
    expect(wrapper5.attributes('style')).toEqual('width: 20px; height: 20px;')

    const wrapper6 = mount(BAvatar, { propsData: { size: '24.5' } })
    expect(wrapper6.attributes('style')).toEqual('width: 24.5px; height: 24.5px;')

    const wrapper7 = mount(BAvatar, { propsData: { size: '5em' } })
    expect(wrapper7.attributes('style')).toEqual('width: 5em; height: 5em;')

    const wrapper8 = mount(BAvatar, { propsData: { size: '36px' } })
    expect(wrapper8.attributes('style')).toEqual('width: 36px; height: 36px;')
  })
})
