import NavbarToggle from './navbar-toggle'
import { mount } from '@vue/test-utils'

describe('navbar-toggle', () => {
  it('default has tag "button"', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.is('button')).toBe(true)
  })

  it('default has class "navbar-toggler"', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.classes()).toContain('navbar-toggler')
    expect(wrapper.classes().length).toBe(1)
  })

  it('default has default attributes', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-controls')).toBe('target')
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Toggle navigation')
  })

  it('default has inner button-close', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    expect(wrapper.find('span.navbar-toggler-icon')).toBeDefined()
  })

  it('accepts custom label when label prop is set', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target',
        label: 'foobar'
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('foobar')
  })

  it('emits click event', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    let rootClicked = false
    function onRootClick() {
      rootClicked = true
    }
    wrapper.vm.$root.$on('bv::toggle::collapse', onRootClick)

    expect(wrapper.emitted('click')).not.toBeDefined()
    expect(rootClicked).toBe(false)

    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
    expect(rootClicked).toBe(true)

    wrapper.vm.$root.$off('bv::toggle::collapse', onRootClick)
  })

  it('sets areia-expanded when receives root emit for target', async () => {
    const wrapper = mount(NavbarToggle, {
      propsData: {
        target: 'target'
      }
    })
    wrapper.vm.$root.$emit('bv::collapse::state', 'target', true)
    expect(wrapper.attributes('aria-expanded')).toBe('true')
    wrapper.vm.$root.$emit('bv::collapse::state', 'target', false)
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    wrapper.vm.$root.$emit('bv::collapse::state', 'foo', true)
    expect(wrapper.attributes('aria-expanded')).toBe('false')
  })
})
