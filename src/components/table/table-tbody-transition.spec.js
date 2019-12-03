import { mount } from '@vue/test-utils'
import { BTable } from './table'

// Transition stub element from vue-test-utils-beta.29 (removed in beta 30)
const FakeTransitionGroup = {
  name: 'FakeTransitinGroup',
  render(h) {
    const tag = this.tag || this.$vnode.data.tag || 'span'
    const children = this.$slots.default || []
    return h(tag, null, children)
  }
}

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > tbody transition', () => {
  it('tbody should not be a transition-group component by default', async () => {
    const wrapper = mount(BTable, {
      attachToDocument: true,
      propsData: {
        fields: testFields,
        items: testItems
      },
      stubs: {
        'transition-group': FakeTransitionGroup
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').is('tbody')).toBe(true)
    expect(wrapper.find(FakeTransitionGroup).exists()).toBe(false)

    wrapper.destroy()
  })

  it('tbody should be a transition-group component when tbody-transition-props set', async () => {
    const wrapper = mount(BTable, {
      attachToDocument: true,
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionProps: {
          name: 'fade'
        }
      },
      stubs: {
        'transition-group': FakeTransitionGroup
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find(FakeTransitionGroup).exists()).toBe(true)
    expect(wrapper.find(FakeTransitionGroup).is('tbody')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)

    wrapper.destroy()
  })

  it('tbody should be a transition-group component when tbody-transition-handlers set', async () => {
    const wrapper = mount(BTable, {
      attachToDocument: true,
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionHandlers: {
          onBeforeEnter: el => {},
          onAfterEnter: el => {},
          onBeforeLeave: el => {},
          onAfterLeave: el => {}
        }
      },
      stubs: {
        'transition-group': FakeTransitionGroup
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find(FakeTransitionGroup).exists()).toBe(true)
    expect(wrapper.find(FakeTransitionGroup).is('tbody')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)

    wrapper.destroy()
  })
})
