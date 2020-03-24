import { mount } from '@vue/test-utils'
import { BNavbarToggle } from './navbar-toggle'

describe('navbar-toggle', () => {
  it('default has tag "button"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-1'
      }
    })
    expect(wrapper.is('button')).toBe(true)
  })

  it('default has class "navbar-toggler"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-2'
      }
    })
    expect(wrapper.classes()).toContain('navbar-toggler')
    expect(wrapper.classes().length).toBe(1)
  })

  it('default has default attributes', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-3'
      }
    })
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-controls')).toBe('target-3')
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Toggle navigation')
  })

  it('default has inner button-close', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-4'
      }
    })
    expect(wrapper.find('span.navbar-toggler-icon')).toBeDefined()
  })

  it('accepts custom label when label prop is set', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-5',
        label: 'foobar'
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('foobar')
  })

  it('default slot scope works', async () => {
    let scope = null
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-6'
      },
      scopedSlots: {
        default(ctx) {
          scope = ctx
          return this.$createElement('div', 'foobar')
        }
      }
    })

    expect(scope).not.toBe(null)
    expect(scope.expanded).toBe(false)

    wrapper.vm.$root.$emit('bv::collapse::state', 'target-6', true)

    expect(scope).not.toBe(null)
    expect(scope.expanded).toBe(true)

    wrapper.vm.$root.$emit('bv::collapse::state', 'target-6', false)

    expect(scope).not.toBe(null)
    expect(scope.expanded).toBe(false)
  })

  it('emits click event', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-7'
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
  })

  it('sets aria-expanded when receives root emit for target', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-8'
      }
    })

    // Private state event
    wrapper.vm.$root.$emit('bv::collapse::state', 'target-8', true)
    expect(wrapper.attributes('aria-expanded')).toBe('true')
    wrapper.vm.$root.$emit('bv::collapse::state', 'target-8', false)
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    wrapper.vm.$root.$emit('bv::collapse::state', 'foo', true)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    // Private sync event
    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target-8', true)
    expect(wrapper.attributes('aria-expanded')).toBe('true')
    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target-8', false)
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'foo', true)
    expect(wrapper.attributes('aria-expanded')).toBe('false')
  })
})
