import FormGroup from './form-group'
import { mount } from '@vue/test-utils'

describe('form-group', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(FormGroup)

    expect(wrapper.isVueInstance()).toBe(true)

    // Auto ID is created after mounted
    await wrapper.vm.$nextTick()

    expect(wrapper.is('fieldset')).toBe(true)
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.find('legend').exists()).toBe(false)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').attributes('role')).toBeDefined()
    expect(wrapper.find('div').attributes('role')).toEqual('group')
    expect(wrapper.find('div').attributes('tabindex')).toBeDefined()
    expect(wrapper.find('div').attributes('tabindex')).toEqual('-1')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })
})
