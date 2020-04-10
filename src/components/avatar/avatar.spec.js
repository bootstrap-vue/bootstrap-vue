import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { BIconPerson } from '../../icons/icons'
import { BAvatar } from './avatar'
import { waitNT } from '../../../tests/utils'

describe('avatar', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BAvatar)
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    wrapper.destroy()
  })

  it('should have expected structure when prop `button` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        button: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
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

    expect(wrapper.emitted('click')).toBeUndefined()

    wrapper.trigger('click')
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('click')).not.toBeUndefined()
    expect(wrapper.emitted('click').length).toBe(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)

    wrapper.destroy()
  })

  it('should have expected structure when prop `href` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        href: '#foo'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
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

    expect(wrapper.emitted('click')).toBeUndefined()

    wrapper.trigger('click')
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('click')).not.toBeUndefined()
    expect(wrapper.emitted('click').length).toBe(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)

    wrapper.destroy()
  })

  it('should have expected structure when prop `text` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        text: 'BV'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.text()).toContain('BV')
    expect(wrapper.find('.b-icon').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
    wrapper.destroy()
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
    expect(wrapper.isVueInstance()).toBe(true)
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
    wrapper.destroy()
  })

  it('should have expected structure when prop `src` set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        src: '/foo/bar',
        text: 'BV'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
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
    expect(wrapper.text()).not.toContain('BV')

    wrapper.setProps({
      src: '/foo/baz'
    })
    await waitNT(wrapper.vm)

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual('/foo/baz')
    expect(wrapper.text()).not.toContain('BV')
    expect(wrapper.emitted('img-error')).not.toBeDefined()
    expect(wrapper.text()).not.toContain('BV')

    // Fake an image error
    wrapper.find('img').trigger('error')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('img-error')).toBeDefined()
    expect(wrapper.emitted('img-error').length).toBe(1)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('BV')

    wrapper.destroy()
  })

  it('should have expected structure when prop `icon` set', async () => {
    const localVue = new CreateLocalVue()
    localVue.component('BIconPerson', BIconPerson)
    const wrapper = mount(BAvatar, {
      localVue,
      propsData: {
        icon: 'person'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
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
    wrapper.destroy()
  })

  it('`size` prop should work as expected', async () => {
    const wrapper1 = mount(BAvatar)
    expect(wrapper1.attributes('style')).toEqual('width: 2.5em; height: 2.5em;')
    wrapper1.destroy()

    const wrapper2 = mount(BAvatar, { propsData: { size: 'sm' } })
    expect(wrapper2.attributes('style')).toEqual('width: 1.5em; height: 1.5em;')
    wrapper2.destroy()

    const wrapper3 = mount(BAvatar, { propsData: { size: 'md' } })
    expect(wrapper3.attributes('style')).toEqual('width: 2.5em; height: 2.5em;')
    wrapper3.destroy()

    const wrapper4 = mount(BAvatar, { propsData: { size: 'lg' } })
    expect(wrapper4.attributes('style')).toEqual('width: 3.5em; height: 3.5em;')
    wrapper4.destroy()

    const wrapper5 = mount(BAvatar, { propsData: { size: 20 } })
    expect(wrapper5.attributes('style')).toEqual('width: 20px; height: 20px;')
    wrapper5.destroy()

    const wrapper6 = mount(BAvatar, { propsData: { size: '24.5' } })
    expect(wrapper6.attributes('style')).toEqual('width: 24.5px; height: 24.5px;')
    wrapper6.destroy()

    const wrapper7 = mount(BAvatar, { propsData: { size: '5em' } })
    expect(wrapper7.attributes('style')).toEqual('width: 5em; height: 5em;')
    wrapper7.destroy()

    const wrapper8 = mount(BAvatar, { propsData: { size: '36px' } })
    expect(wrapper8.attributes('style')).toEqual('width: 36px; height: 36px;')
    wrapper8.destroy()
  })

  it('should have expected structure when prop badge is set', async () => {
    const wrapper = mount(BAvatar, {
      propsData: {
        badge: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()

    const $badge = wrapper.find('.b-avatar-badge')
    expect($badge.exists()).toBe(true)
    expect($badge.classes()).toContain('badge-primary')
    expect($badge.text()).toEqual('')

    wrapper.setProps({
      badge: 'FOO'
    })
    await waitNT(wrapper.vm)
    expect($badge.classes()).toContain('badge-primary')
    expect($badge.text()).toEqual('FOO')

    wrapper.setProps({
      badgeVariant: 'info'
    })
    await waitNT(wrapper.vm)
    expect($badge.classes()).not.toContain('badge-primary')
    expect($badge.classes()).toContain('badge-info')
    expect($badge.text()).toEqual('FOO')

    wrapper.destroy()
  })
})
