import { mount } from '@vue/test-utils'
import attrsMixin from './attrs'

describe('mixins > attrs', () => {
  it('works (indirectly tests utils/cache)', async () => {
    const BTest = {
      name: 'BTest',
      mixins: [attrsMixin],
      inheritAttrs: false,
      render(h) {
        return h('section', [h('article', { attrs: this.bvAttrs })])
      }
    }
    const App = {
      name: 'App',
      props: {
        attrs: {
          type: Object,
          default: () => ({})
        }
      },
      render(h) {
        return h(BTest, { attrs: this.attrs })
      }
    }

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

    expect($test.vm.bvAttrs).toBeDefined()
    expect($test.vm.bvAttrs.foo).not.toBeDefined()
    expect($test.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly adds new attrs data
    await wrapper.setProps({
      attrs: { foo: 'bar' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ foo: 'bar' })
    expect($test.vm.bvAttrs.foo).toEqual('bar')
    expect($test.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly adds new attrs data
    await wrapper.setProps({
      attrs: { foo: 'bar', baz: 'biz' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ foo: 'bar', baz: 'biz' })
    expect($test.vm.bvAttrs.foo).toEqual('bar')
    expect($test.vm.bvAttrs.baz).toEqual('biz')

    // Correctly removes attrs data
    await wrapper.setProps({
      attrs: { foo: 'bar' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ foo: 'bar' })
    expect($test.vm.bvAttrs.foo).toEqual('bar')
    expect($test.vm.bvAttrs.baz).not.toBeDefined()

    // Correctly removes all attrs data
    await wrapper.setProps({ attrs: {} })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({})
    expect($test.vm.bvAttrs.foo).not.toBeDefined()
    expect($test.vm.bvAttrs.baz).not.toBeDefined()

    wrapper.destroy()
  })

  it('does not re-render parent child components', async () => {
    let renderCount = 0

    const BTest = {
      name: 'BTest',
      mixins: [attrsMixin],
      inheritAttrs: false,
      render(h) {
        renderCount++
        return h('section', [h('article', { attrs: this.bvAttrs })])
      }
    }
    const App = {
      name: 'App',
      props: {
        test1Attrs: {
          type: Object,
          default: () => ({})
        },
        test2Attrs: {
          type: Object,
          default: () => ({})
        }
      },
      render(h) {
        return h('div', [
          h(BTest, { attrs: this.test1Attrs }),
          h(BTest, { attrs: this.test2Attrs })
        ])
      }
    }

    const wrapper = mount(App)

    const $tests = wrapper.findAllComponents(BTest)
    expect($tests.length).toBe(2)
    expect($tests.at(0)).toBeDefined()
    expect($tests.at(1)).toBeDefined()
    expect(renderCount).toBe(2)

    const $section1 = $tests.at(0).find('section')
    const $section2 = $tests.at(1).find('section')
    const $article1 = $section1.find('article')
    const $article2 = $section2.find('article')

    await wrapper.setProps({ test1Attrs: { foo: 'bar' } })
    expect($section1.attributes()).toEqual({})
    expect($article1.attributes()).toEqual({ foo: 'bar' })
    expect($section2.attributes()).toEqual({})
    expect($article2.attributes()).toEqual({})
    expect(renderCount).toBe(3)

    await wrapper.setProps({ test2Attrs: { baz: 'biz' } })
    expect($section1.attributes()).toEqual({})
    expect($article1.attributes()).toEqual({ foo: 'bar' })
    expect($section2.attributes()).toEqual({})
    expect($article2.attributes()).toEqual({ baz: 'biz' })
    expect(renderCount).toBe(4)

    wrapper.destroy()
  })
})
