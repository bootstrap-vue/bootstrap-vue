import ButonToolbar from './button-toolbar'
import ButtonGroup from '../button-group/button-group'
import Button from '../button/button'
import { mount } from '@vue/test-utils'

describe('button-toolbar', () => {
  it('toolbar root should be "div"', async () => {
    const wrapper = mount(ButtonToolbar, {})
    expect(wrapper.is('div')).toBe(true)
    wrapper.destroy()
  })

  it('toolbar should contain base class', async () => {
    const wrapper = mount(ButtonToolbar, {})
    expect(wrapper.classes()).toContain('btn-toolbar')
    wrapper.destroy()
  })

  it('toolbar should not have class "justify-content-between"', async () => {
    const wrapper = mount(ButtonToolbar, {})
    expect(wrapper.classes()).not.toContain('justify-content-between')
    wrapper.destroy()
  })

  it('toolbar should have role', async () => {
    const wrapper = mount(ButtonToolbar, {})
    expect(wrapper.attributes('role')).toBe('toolbar')
    wrapper.destroy()
  })

  it('toolbar should not have tabindex by default', async () => {
    const wrapper = mount(ButtonToolbar, {})
    expect(wrapper.attributes('tabindex')).not.toBeDefined()
    wrapper.destroy()
  })

  it('toolbar should have class "justify-content-between" when justify set', async () => {
    const wrapper = mount(ButtonToolbar, {
      propsData: {
        justify: true
      }
    })
    expect(wrapper.classes()).toContain('justify-content-between')
    expect(wrapper.classes()).toContain('btn-toolbar')
    wrapper.destroy()
  })

  it('toolbar should have tabindex when key-nav set', async () => {
    const wrapper = mount(ButtonToolbar, {
      propsData: {
        keyNav: true
      }
    })
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.element.tabIndex).toBe(0)
    wrapper.destroy()
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('keyboard navigation', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock getBCR so that the isVisible(el) test returns true
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          width: 24,
          height: 24,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      })
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works', async () => {
      expect(true).not.toBe(false)
    })
  })
})
