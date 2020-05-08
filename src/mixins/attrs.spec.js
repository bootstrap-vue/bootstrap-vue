import { mount } from '@vue/test-utils'
import attrsMixin from './attrs'

const BTest = {
  name 'BTest',
  mixins: [attrsMixin],
  inheritAttrs: false,
  render(h) {
    return h('section', [h('article', { attrs: this.bvAttrs })])
  }
}

const App = {
  name 'App',
  props: {
    attrs: {
      type: Object,
      default: {}
    }
  },
  render(h) {
    return h(BTest, { attrs: this.attrs })
  }
}

describe('mixins > attrs', () => {
  it('works (indirectly tests utils/cache)', async () => {
    const wrapper = mount(App)

    expect(wrapper).toBeDefined()
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SECTION')

    const $test = wrapper.findComponent(BTest)

    expect($test.exists()).toBe(true)
    expect($test.vm).toBeDefined()

    const $section = $test.find('section')
    expect($section.exists()).toBe(true)

    const $article = $test.find('article')
    expect($article.exists()).toBe(true)

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({})

    expect(BTest.vm.bvAttrs).toBeDefined()
    expect(BTest.vm.bvAttrs.foo).not.toBeDefined()
    expect(BTest.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly adds new attrs data
    await wrapper.setProps({
      attrs: { 'foo': 'bar' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ 'foo': 'bar' })
    expect(BTest.vm.bvAttrs.foo).toEqual('bar')
    expect(BTest.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly adds new attrs data
    await wrapper.setProps({
      attrs: { 'foo': 'bar', 'baz': 'biz' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ 'foo': 'bar', 'baz': 'biz' })
    expect(BTest.vm.bvAttrs.foo).toEqual('bar')
    expect(BTest.vm.bvAttrs.baz).toEqual('biz')

    // Correctly removes attrs data
    await wrapper.setProps({
      attrs: { 'foo': 'bar' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ 'foo': 'bar' })
    expect(BTest.vm.bvAttrs.foo).toEqual('bar')
    expect(BTest.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly removes all attrs data
    await wrapper.setProps({ attrs: {} })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({})
    expect(BTest.vm.bvAttrs.foo).not.toBeDefined()
    expect(BTest.vm.bvAttrs.baz).not.toBeDefined()

    wrapper.destroy()
  })
})
