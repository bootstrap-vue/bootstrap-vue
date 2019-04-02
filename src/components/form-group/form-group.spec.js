import asyncFormGroup from './form-group'
import { mount } from '@vue/test-utils'

// Vue test utils doesnt currently support mounting Async Components
// So we have to resolve the component ourselves
// https://github.com/vuejs/vue-test-utils/issues/1012
let FormGroup = asyncFormGroup
if (typeof asyncFormGroup === 'function') {
  asyncFormGroup(cmp => {
    FormGroup = cmp
  })
}

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

  it('renders content from default slot', async () => {
    const wrapper = mount(FormGroup, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // Auto ID is created after mounted
    await wrapper.vm.$nextTick()

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').attributes('role')).toBeDefined()
    expect(wrapper.find('div').attributes('role')).toEqual('group')
    expect(wrapper.find('div[role="group"]').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        label: 'test',
        labelFor: 'input-id',
        id: 'foo'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.find('label').attributes('id')).toEqual('foo__BV_label_')

    wrapper.destroy()
  })

  it('does not render a fieldset if prop label-for set', async () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        label: 'test',
        labelFor: 'input-id'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // Auto ID is created after mounted
    await wrapper.vm.$nextTick()

    expect(wrapper.is('fieldset')).toBe(false)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.find('legend').exists()).toBe(false)
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').classes()).toContain('d-block')
    expect(wrapper.find('label').text()).toEqual('test')
    expect(wrapper.find('label').attributes('for')).toBeDefined()
    expect(wrapper.find('label').attributes('for')).toEqual('input-id')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.find('div > div').classes().length).toBe(0)
    expect(wrapper.find('div > div').attributes('role')).not.toBeDefined()
    expect(wrapper.find('div > div').attributes('tabindex')).not.toBeDefined()
    expect(wrapper.find('div > div > input').exists()).toBe(true)
    expect(wrapper.find('div > div > input').attributes('aria-describedby')).not.toBeDefined()
    expect(wrapper.find('div > div > input').attributes('aria-labelledby')).not.toBeDefined()
    expect(wrapper.find('div > div').text()).toEqual('')
    const formGroupId = wrapper.attributes('id')
    expect(wrapper.find('label').attributes('id')).toBeDefined()
    expect(wrapper.find('label').attributes('id')).toEqual(`${formGroupId}__BV_label_`)

    wrapper.destroy()
  })

  it('horzontal layout with prop label-for set has expected structure', async () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        label: 'test',
        labelFor: 'input-id',
        labelCols: 1,
        labelColsSm: 2,
        labelColsMd: 3,
        labelColsLg: 4,
        labelColsXl: 5
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.is('fieldset')).toBe(false)
    expect(wrapper.find('legend').exists()).toBe(false)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').classes()).toContain('col-form-label')
    expect(wrapper.find('label').classes()).toContain('col-1')
    expect(wrapper.find('label').classes()).toContain('col-sm-2')
    expect(wrapper.find('label').classes()).toContain('col-md-3')
    expect(wrapper.find('label').classes()).toContain('col-lg-4')
    expect(wrapper.find('label').classes()).toContain('col-xl-5')
    expect(wrapper.find('label').classes().length).toBe(6)
    expect(wrapper.find('label').text()).toEqual('test')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.find('div > div').classes()).toContain('col')
    expect(wrapper.find('div > div').classes().length).toBe(1)

    wrapper.destroy()
  })

  it('horzontal layout without prop label-for set has expected structure', async () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        label: 'test',
        labelCols: 1,
        labelColsSm: 2,
        labelColsMd: 3,
        labelColsLg: 4,
        labelColsXl: 5
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // Auto ID is created after mounted
    await wrapper.vm.$nextTick()

    expect(wrapper.is('fieldset')).toBe(true)
    expect(wrapper.is('div')).toBe(false)
    expect(wrapper.find('legend').exists()).toBe(true)
    expect(wrapper.find('fieldset > div > legend').exists()).toBe(true)
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).not.toBeDefined()
    expect(wrapper.attributes('aria-labelledby')).toBeDefined()
    expect(wrapper.find('legend').classes()).toContain('col-form-label')
    expect(wrapper.find('legend').classes()).toContain('col-1')
    expect(wrapper.find('legend').classes()).toContain('col-sm-2')
    expect(wrapper.find('legend').classes()).toContain('col-md-3')
    expect(wrapper.find('legend').classes()).toContain('col-lg-4')
    expect(wrapper.find('legend').classes()).toContain('col-xl-5')
    expect(wrapper.find('legend').classes().length).toBe(6)
    expect(wrapper.find('legend').text()).toEqual('test')
    expect(wrapper.find('fieldset > div > div').exists()).toBe(true)
    expect(wrapper.find('fieldset > div > div').classes()).toContain('col')
    expect(wrapper.find('fieldset > div > div').classes().length).toBe(1)
    expect(wrapper.find('fieldset > div > div').attributes('role')).toEqual('group')
    expect(wrapper.find('fieldset > div > div').attributes('tabindex')).toEqual('-1')

    wrapper.destroy()
  })
})
