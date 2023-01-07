import { isVue3 } from '../../vue'
import { mount } from '@vue/test-utils'
import { waitNT, getInstanceFromVNode } from '../../../tests/utils'
import { BVTransporter } from './transporter'

describe('utils/transporter component', () => {
  it('renders in-pace when disabled=true', async () => {
    const App = {
      render(h) {
        return h(BVTransporter, { props: { disabled: true } }, [h('div', 'content')])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.text()).toEqual('content')

    wrapper.destroy()
  })

  it('does not render in-pace when disabled=false', async () => {
    const App = {
      render(h) {
        return h(BVTransporter, { props: { disabled: false } }, [
          h('div', { attrs: { id: 'foobar' } }, 'content')
        ])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)

    const target = document.getElementById('foobar')
    expect(target).toBeDefined()
    expect(target).not.toBe(null)
    expect(getInstanceFromVNode(target)).toBeDefined() // Target
    if (!isVue3) {
      expect(getInstanceFromVNode(target).$options.name).toBe('BVTransporterTarget')
    }
    expect(target.tagName).toEqual('DIV')
    expect(target.parentElement).toBeDefined()
    expect(target.parentElement).toBe(document.body)

    wrapper.destroy()

    await waitNT(wrapper.vm)

    expect(target.parentElement).toEqual(null)
  })

  it('maintains provide-inject relation', async () => {
    const Child = {
      inject: ['foo'],
      render(h) {
        return h('article', this.foo)
      }
    }

    const App = {
      provide() {
        return { foo: 'foo' }
      },
      render(h) {
        return h(BVTransporter, { props: { disabled: false } }, [h(Child)])
      }
    }

    mount(App, {
      attachTo: document.body
    })

    expect(document.querySelector('article').textContent).toBe('foo')
  })
})
