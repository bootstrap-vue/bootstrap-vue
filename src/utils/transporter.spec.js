import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import { BTransporterSingle } from './transporter'

describe('utils/transporter component', () => {
  const localVue = new CreateLocalVue()

  it('renders in-pace when disabled=true', async () => {
    const App = localVue.extend({
      render(h) {
        return h(BTransporterSingle, { props: { disabled: true } }, [h('div', {}, 'content')])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toEqual('content')

    wrapper.destroy()
  })

  it('does not render in-pace when disabled=false', async () => {
    const App = localVue.extend({
      render(h) {
        return h(BTransporterSingle, { props: { disabled: false } }, [
          h('div', { attrs: { id: 'foobar' } }, 'content')
        ])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)

    const target = document.getElementById('foobar')
    expect(target).toBeDefined()
    expect(target).not.toBe(null)
    expect(target.__vue__).toBeDefined() // Target
    expect(target.__vue__.$options.name).toBe('BTransporterTargetSingle')
    expect(target.tagName).toEqual('DIV')
    expect(target.parentElement).toBeDefined()
    expect(target.parentElement).toBe(document.body)

    wrapper.destroy()
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(target.parentElement).toEqual(null)
  })
})
