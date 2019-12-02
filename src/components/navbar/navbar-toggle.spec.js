import { mount } from '@vue/test-utils'
import { BNavbarToggle } from './navbar-toggle'

describe('navbar-toggle', () => {
  it('default has tag "button"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.is('button')).toBe(true)

    wrapper.destroy()
  })

  it('default has class "navbar-toggler"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.classes()).toContain('navbar-toggler')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('default has default attributes', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-controls')).toBe('target')
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Toggle navigation')

    wrapper.destroy()
  })

  it('default has inner button-close', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.find('span.navbar-toggler-icon')).toBeDefined()

    wrapper.destroy()
  })

  it('accepts custom label when label prop is set', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target',
        label: 'foobar'
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('foobar')

    wrapper.destroy()
  })

  it('emits click event', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    let rootClicked = false
    const onRootClick = () => {
      rootClicked = true
    }
    wrapper.vm.$root.$on('bv::toggle::collapse', onRootClick)

    expect(wrapper.emitted('click')).not.toBeDefined()
    expect(rootClicked).toBe(false)

    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
    expect(rootClicked).toBe(true)

    wrapper.vm.$root.$off('bv::toggle::collapse', onRootClick)

    wrapper.destroy()
  })

  it('sets aria-expanded when receives root emit for target', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target'
      }
    })

    // Private state event
    wrapper.vm.$root.$emit('bv::collapse::state', 'target', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('true')

    wrapper.vm.$root.$emit('bv::collapse::state', 'target', false)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.vm.$root.$emit('bv::collapse::state', 'foo', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    // Private sync event
    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('true')

    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target', false)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'foo', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.destroy()
  })
})
