import Tooltip from './tooltip'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

describe('tooltip', () => {
  const localVue = new CreateLocalVue()

  it('has expected default structure', async () => {
    const App = localVue.extend({
      render(h) {
        'div',
        { attrs: { id: 'wrapper' } },
        [
          h('button', { attrs: { id: 'foo', type: 'button' } }, 'text'),
          h(Tooltip, { attrs: { id: 'bar' }, props: { target: 'foo', trigger: 'click' } }, 'title')
        ]
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')
    
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-oriignal-title')).toEqual('')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    const $tipholder = wrapper.find('div#bar')
    expect($tipholder.exists()).toBe(true)
    expect($tipholder.classes()).toContain('d-none')
    expect($tipholder.attributes('aria-hidden')).toBeDefined()
    expect($tipholder.attributes('aria-hidden')).toEqual('true')
    expect($tipholder.element.style.display).toEqual('none')

    expect($tipholder.findAll('div > div').length).toBe(1)
    expect($tipholder.findAll('div > div').text()).toBe('title')

    wrapper.destroy()
  })
})
