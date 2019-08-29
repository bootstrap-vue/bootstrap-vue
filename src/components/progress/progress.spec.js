import { mount } from '@vue/test-utils'
import { BProgress } from './progress'

describe('progress', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BProgress)

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('progress')
    expect(wrapper.text()).toEqual('')
    expect(wrapper.findAll('.progress-bar').length).toBe(1)
    const $bar = wrapper.find('.progress-bar')
    expect($bar.is('div')).toBe(true)
    expect($bar.attributes('role')).toBe('progressbar')
    expect($bar.attributes('aria-valuemin')).toBe('0')
    expect($bar.attributes('aria-valuemax')).toBe('100')
    expect($bar.attributes('aria-valuenow')).toBe('0')
    expect($bar.attributes('style')).toBe('width: 0%;')

    wrapper.destroy()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BProgress, {
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('progress')
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.findAll('.progress-bar').length).toBe(0)
  })

  it('has progress-bar child with expected parameters', async () => {
    const wrapper = mount(BProgress, {
      propsData: {
        value: 25,
        max: 50,
        variant: 'success',
        striped: true,
        animated: true,
        showValue: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('progress')
    expect(wrapper.findAll('.progress-bar').length).toBe(1)

    const $bar = wrapper.find('.progress-bar')
    expect($bar.is('div')).toBe(true)
    expect($bar.attributes('role')).toBe('progressbar')
    expect($bar.attributes('aria-valuemin')).toBe('0')
    expect($bar.attributes('aria-valuemax')).toBe('50')
    expect($bar.attributes('aria-valuenow')).toBe('25')
    expect($bar.attributes('style')).toBe('width: 50%;')
    expect($bar.classes()).toContain('bg-success')
    expect($bar.classes()).toContain('progress-bar')
    expect($bar.classes()).toContain('progress-bar-striped')
    expect($bar.classes()).toContain('progress-bar-animated')
    expect($bar.classes().length).toBe(4)
    expect($bar.text()).toEqual('25')

    wrapper.destroy()
  })
})
