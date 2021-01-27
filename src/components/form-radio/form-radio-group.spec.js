import { mount } from '@vue/test-utils'
import { createContainer, waitNT } from '../../../tests/utils'
import { BFormRadioGroup } from './form-radio-group'
import { BFormRadio } from './form-radio'

describe('form-radio-group', () => {
  // --- Structure, class and attributes tests ---

  it('default has structure <div></div>', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    const children = wrapper.element.children
    expect(children.length).toEqual(0)

    wrapper.destroy()
  })

  it('default has no classes on wrapper other than focus ring', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper.classes().length).toEqual(1)
    expect(wrapper.classes()).toContain('bv-no-focus-ring')

    wrapper.destroy()
  })

  it('default has auto ID set', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer()
    })
    await waitNT(wrapper.vm)
    // Auto ID not generated until after mount
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('default has tabindex set to -1', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('-1')

    wrapper.destroy()
  })

  it('default does not have aria-required set', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper.attributes('aria-required')).toBeUndefined()

    wrapper.destroy()
  })

  it('default does not have aria-invalid set', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()

    wrapper.destroy()
  })

  it('default has attribute role=radiogroup', async () => {
    const wrapper = mount(BFormRadioGroup)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('radiogroup')

    wrapper.destroy()
  })

  it('default has user provided ID', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        id: 'test'
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('test')

    wrapper.destroy()
  })

  it('default has class was-validated when validated=true', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        validated: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes()).toContain('was-validated')

    wrapper.destroy()
  })

  it('default has attribute aria-invalid=true when state=false', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('default does not have attribute aria-invalid when state=true', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()

    wrapper.destroy()
  })

  it('default does not have attribute aria-invalid when state=null', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        state: null
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()

    wrapper.destroy()
  })

  it('default has input validation class is-invalid when state=false', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: '',
        state: false
      }
    })

    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(radios.wrappers.every(c => c.classes().includes('is-invalid'))).toBe(true)

    expect(radios.wrappers[0].classes()).toContain('is-invalid')
    expect(radios.wrappers[0].classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  it('default has input validation class is-valid when state=true', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: '',
        state: true
      }
    })

    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(radios.wrappers.every(c => c.classes().includes('is-valid'))).toBe(true)

    expect(radios.wrappers[0].classes()).toContain('is-valid')
    expect(radios.wrappers[0].classes()).not.toContain('is-invalid')

    wrapper.destroy()
  })

  it('default does not have validation class when state=null', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: '',
        state: null
      }
    })

    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(radios.wrappers.every(c => c.classes().includes('is-valid'))).toBe(false)

    expect(radios.wrappers[0].classes()).not.toContain('is-valid')
    expect(radios.wrappers[0].classes()).not.toContain('is-invalid')

    wrapper.destroy()
  })

  it('default has attribute aria-invalid=true when aria-invalid=true', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('default has attribute aria-invalid=true when aria-invalid="true"', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        ariaInvalid: 'true'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('default has attribute aria-invalid=true when aria-invalid=""', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        ariaInvalid: ''
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  // --- Button mode structure ---

  it('button mode has classes button-group and button-group-toggle', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        buttons: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('bv-no-focus-ring')

    wrapper.destroy()
  })

  it('button mode has classes button-group-vertical and button-group-toggle when stacked=true', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        buttons: true,
        stacked: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('bv-no-focus-ring')

    wrapper.destroy()
  })

  it('button mode has size class when size prop set', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        buttons: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
    expect(wrapper.classes()).toContain('bv-no-focus-ring')

    wrapper.destroy()
  })

  it('button mode has size class when size prop set and stacked', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        buttons: true,
        stacked: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
    expect(wrapper.classes()).toContain('bv-no-focus-ring')

    wrapper.destroy()
  })

  it('button mode button-variant works', async () => {
    const App = {
      render(h) {
        return h(
          BFormRadioGroup,
          {
            props: {
              checked: '',
              buttons: true,
              buttonVariant: 'primary'
            }
          },
          [
            h(BFormRadio, { props: { value: 'one' } }, 'button 1'),
            h(BFormRadio, { props: { value: 'two' } }, 'button 2'),
            h(BFormRadio, { props: { value: 'three', buttonVariant: 'danger' } }, 'button 3')
          ]
        )
      }
    }

    const wrapper = mount(App, {
      attachTo: createContainer()
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    // Find all the labels with .btn class
    const btns = wrapper.findAll('label.btn')
    expect(btns).toBeDefined()
    expect(btns.length).toBe(3)
    // Expect them to have the correct variant classes
    expect(btns.at(0).classes()).toContain('btn-primary')
    expect(btns.at(1).classes()).toContain('btn-primary')
    expect(btns.at(2).classes()).toContain('btn-danger')

    wrapper.destroy()
  })

  // --- Functionality testing ---

  it('has radios via options array', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: ''
      }
    })

    expect(wrapper.vm.isRadioGroup).toEqual(true)
    expect(wrapper.vm.localChecked).toEqual('')

    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(radios.wrappers.every(c => c.find('input[type=radio]').exists())).toBe(true)

    wrapper.destroy()
  })

  it('has radios via options array which respect disabled', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: [{ text: 'one' }, { text: 'two' }, { text: 'three', disabled: true }],
        checked: ''
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('')
    expect(radios.wrappers.every(c => c.find('input[type=radio]').exists())).toBe(true)
    expect(radios.at(0).attributes('disabled')).toBeUndefined()
    expect(radios.at(1).attributes('disabled')).toBeUndefined()
    expect(radios.at(2).attributes('disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('has radios with attribute required when prop required set', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: '',
        required: true
      }
    })

    // We need `$nextTick()` here since auto generated name is
    // computed in a `$nextTick()` on mount
    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('')
    expect(radios.wrappers.every(c => c.find('input[type=radio]'))).toBe(true)
    expect(radios.wrappers.every(c => c.find('input[required]'))).toBe(true)
    expect(radios.wrappers.every(c => c.find('input[aria-required="true"]'))).toBe(true)

    wrapper.destroy()
  })

  it('emits change event when radio clicked', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: ''
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('')

    await radios.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('one')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('one')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('one')

    await radios.at(2).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('three')
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toEqual('three')
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toEqual('three')

    await radios.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('one')
    expect(wrapper.emitted('change').length).toBe(3)
    expect(wrapper.emitted('change')[2][0]).toEqual('one')
    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toEqual('one')

    wrapper.destroy()
  })

  it('radios reflect group checked v-model', async () => {
    const wrapper = mount(BFormRadioGroup, {
      attachTo: createContainer(),
      propsData: {
        options: ['one', 'two', 'three'],
        checked: 'two'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('two')
    expect(radios.wrappers.every(w => w.attributes('type') === 'radio')).toBe(true)
    expect(radios.at(0).element.checked).toBe(false)
    expect(radios.at(1).element.checked).toBe(true)
    expect(radios.at(2).element.checked).toBe(false)

    await wrapper.setProps({ checked: 'three' })
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(wrapper.vm.localChecked).toEqual('three')
    expect(radios.wrappers.every(w => w.attributes('type') === 'radio')).toBe(true)
    expect(radios.at(0).element.checked).toBe(false)
    expect(radios.at(1).element.checked).toBe(false)
    expect(radios.at(2).element.checked).toBe(true)

    wrapper.destroy()
  })
})
