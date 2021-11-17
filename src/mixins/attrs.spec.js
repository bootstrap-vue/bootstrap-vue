import { isVue3 } from '../vue'
import { mount } from '@vue/test-utils'
import { attrsMixin } from './attrs'

// Note: The following tests indirectly test `utils/cache`

describe('mixins > attrs', () => {
  it('works', async () => {
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
    expect($test.vm.bvAttrs.foo).toBeUndefined()
    expect($test.vm.bvAttrs.baz).toBeUndefined()

    // Correctly adds new attrs data
    await wrapper.setProps({
      attrs: { foo: 'bar' }
    })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({ foo: 'bar' })
    expect($test.vm.bvAttrs.foo).toEqual('bar')
    expect($test.vm.bvAttrs.baz).toBeUndefined()

    // Correctly updates attrs data
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
    expect($test.vm.bvAttrs.baz).toBeUndefined()

    // Correctly removes all attrs data
    await wrapper.setProps({ attrs: {} })

    expect($section.attributes()).toEqual({})
    expect($article.attributes()).toEqual({})
    expect($test.vm.bvAttrs.foo).toBeUndefined()
    expect($test.vm.bvAttrs.baz).toBeUndefined()

    wrapper.destroy()
  })

  it('does not re-render parent child components', async () => {
    let input1RenderCount = 0
    let input2RenderCount = 0

    const Input1 = {
      props: ['value'],
      render(h) {
        input1RenderCount++
        return h('input', {
          attrs: { ...this.$attrs, value: this.value },
          domProps: { value: this.value },
          on: { input: e => this.$emit('input', e.target.value) }
        })
      }
    }
    const Input2 = {
      props: ['value'],
      mixins: [attrsMixin],
      render(h) {
        input2RenderCount++
        return h('input', {
          attrs: { ...this.bvAttrs, value: this.value },
          domProps: { value: this.value },
          on: { input: e => this.$emit('input', e.target.value) }
        })
      }
    }

    const App1 = {
      components: { Input1 },
      props: ['value1', 'value2'],
      template: `<div>
        <Input1 v-model="value1" />
        <Input1 v-model="value2" />
      </div>`
    }
    const App2 = {
      components: { Input2 },
      props: ['value1', 'value2'],
      template: `<div>
        <Input2 v-model="value1" />
        <Input2 v-model="value2" />
      </div>`
    }

    const wrapper1 = mount(App1)
    const wrapper2 = mount(App2)

    const $inputs1 = wrapper1.findAllComponents(Input1)
    expect($inputs1.length).toBe(2)
    expect($inputs1.at(0)).toBeDefined()
    expect($inputs1.at(0).vm.value).toBe(undefined)
    expect($inputs1.at(1)).toBeDefined()
    expect($inputs1.at(1).vm.value).toBe(undefined)
    expect(input1RenderCount).toBe(2)

    const $inputs2 = wrapper2.findAllComponents(Input2)
    expect($inputs2.length).toBe(2)
    expect($inputs2.at(0)).toBeDefined()
    expect($inputs2.at(0).vm.value).toBe(undefined)
    expect($inputs2.at(1)).toBeDefined()
    expect($inputs2.at(1).vm.value).toBe(undefined)
    expect(input2RenderCount).toBe(2)

    // Update the value for the first `Input1`
    await wrapper1.setProps({ value1: 'foo' })
    expect($inputs1.at(0).vm.value).toBe('foo')
    expect($inputs1.at(1).vm.value).toBe(undefined)
    if (!isVue3) {
      // Both `Input1`'s are re-rendered (See: https://github.com/vuejs/vue/issues/7257)
      expect(input1RenderCount).toBe(4)
    }

    // Update the value for the second `Input1`
    await wrapper1.setProps({ value2: 'bar' })
    expect($inputs1.at(0).vm.value).toBe('foo')
    expect($inputs1.at(1).vm.value).toBe('bar')
    if (!isVue3) {
      // Both `Input1`'s are re-rendered (See: https://github.com/vuejs/vue/issues/7257)
      expect(input1RenderCount).toBe(6)
    }

    // Update the value for the first `Input2`
    await wrapper2.setProps({ value1: 'foo' })
    expect($inputs2.at(0).vm.value).toBe('foo')
    expect($inputs2.at(1).vm.value).toBe(undefined)
    // With `attrsMixin` only the affected `Input2` is re-rendered
    expect(input2RenderCount).toBe(3)

    // Update the value for the second `Input2`
    await wrapper2.setProps({ value2: 'bar' })
    expect($inputs2.at(0).vm.value).toBe('foo')
    expect($inputs2.at(1).vm.value).toBe('bar')
    // With `attrsMixin` only the affected `Input2` is re-rendered
    expect(input2RenderCount).toBe(4)

    wrapper1.destroy()
    wrapper2.destroy()
  })
})
