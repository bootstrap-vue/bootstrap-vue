import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BNavbarToggle } from './navbar-toggle'

describe('navbar-toggle', () => {
  it('default has tag "button"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-1'
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')

    wrapper.destroy()
  })

  it('default has class "navbar-toggler"', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-2'
      }
    })

    expect(wrapper.classes()).toContain('navbar-toggler')
    // Class added by v-b-toggle
    expect(wrapper.classes()).toContain('collapsed')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('default has inner button-close', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-4'
      }
    })

    expect(wrapper.find('span.navbar-toggler-icon')).toBeDefined()

    wrapper.destroy()
  })

  it('accepts custom label when label prop is set', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-5',
        label: 'foobar'
      }
    })

    expect(wrapper.attributes('aria-label')).toBe('foobar')

    wrapper.destroy()
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
    await waitNT(wrapper.vm)
    expect(scope).not.toBe(null)
    expect(scope.expanded).toBe(true)

    wrapper.vm.$root.$emit('bv::collapse::state', 'target-6', false)
    await waitNT(wrapper.vm)
    expect(scope).not.toBe(null)
    expect(scope.expanded).toBe(false)

    wrapper.destroy()
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

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
    expect(rootClicked).toBe(true)

    wrapper.vm.$root.$off('bv::toggle::collapse', onRootClick)

    wrapper.destroy()
  })

  it('sets aria-expanded when receives root emit for target', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-8'
      }
    })

    // Private state event
    wrapper.vm.$root.$emit('bv::collapse::state', 'target-8', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('true')

    wrapper.vm.$root.$emit('bv::collapse::state', 'target-8', false)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.vm.$root.$emit('bv::collapse::state', 'foo', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    // Private sync event
    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target-8', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('true')

    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'target-8', false)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.vm.$root.$emit('bv::collapse::sync::state', 'foo', true)
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-expanded')).toBe('false')

    wrapper.destroy()
  })

  it('disabled prop works', async () => {
    const wrapper = mount(BNavbarToggle, {
      propsData: {
        target: 'target-9',
        disabled: true
      }
    })

    expect(wrapper.emitted('click')).not.toBeDefined()
    expect(wrapper.element.hasAttribute('disabled')).toBe(true)
    expect(wrapper.classes()).toContain('disabled')

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).not.toBeDefined()

    wrapper.destroy()
  })
})
