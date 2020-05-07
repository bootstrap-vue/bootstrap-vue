import { mount } from '@vue/test-utils'
import { createContainer } from '../../../tests/utils'
import { TransitionGroupStub } from '../../../tests/components'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > tbody transition', () => {
  it('tbody should not be a transition-group component by default', async () => {
    const wrapper = mount(BTable, {
      attachTo: createContainer(),
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').element.tagName).toBe('TBODY')
    expect(wrapper.findComponent(TransitionGroupStub).exists()).toBe(false)

    wrapper.destroy()
  })

  it('tbody should be a transition-group component when tbody-transition-props set', async () => {
    const wrapper = mount(BTable, {
      attachTo: createContainer(),
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionProps: {
          name: 'fade'
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findComponent(TransitionGroupStub).exists()).toBe(true)
    // Transition-group stub doesn't render itself with the specified tag
    expect(wrapper.find('tbody').exists()).toBe(false)

    wrapper.destroy()
  })

  it('tbody should be a transition-group component when tbody-transition-handlers set', async () => {
    const wrapper = mount(BTable, {
      attachTo: createContainer(),
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionHandlers: {
          onBeforeEnter: () => {},
          onAfterEnter: () => {},
          onBeforeLeave: () => {},
          onAfterLeave: () => {}
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findComponent(TransitionGroupStub).exists()).toBe(true)
    // Transition-group stub doesn't render itself with the specified tag
    expect(wrapper.find('tbody').exists()).toBe(false)

    wrapper.destroy()
  })
})
