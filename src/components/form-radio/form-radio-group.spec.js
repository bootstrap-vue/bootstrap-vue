import Group from './form-radio-group'
// import Input from './form-radio'
import { mount } from '@vue/test-utils'

describe('form-radio-group', async () => {
  /* Structure, class and attributes tests */

  it('default has structure <div></div>', async () => {
    const wrapper = mount(Group)
    expect(wrapper).toBeDefined()
    expect(wrapper.is('div')).toBe(true)
    const children = wrapper.element.children
    expect(children.length).toEqual(0)
  })

  it('default has no classes on wrapper', async () => {
    const wrapper = mount(Group)
    expect(wrapper.classes().length).toEqual(0)
  })

  it('default has auto ID set', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true
    })
    await wrapper.vm.$nextTick()
    // Auto ID not generated until after mount
    expect(wrapper.attributes('id')).toBeDefined()
  })

  it('default has tabindex set to -1', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })

  it('default does not have aria-required set', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('aria-required')).not.toBeDefined()
  })

  it('default does not have aria-invalid set', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default has attribute role=radiogroup', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })

  it('default has user provided ID', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        id: 'test'
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('test')
  })

  it('default has class was-validated when validated=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        validated: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes()).toContain('was-validated')
  })

  it('default has attribute aria-invalid=true when state=false', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default does not have attribute aria-invalid when state=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default does not have attribute aria-invalid when state=null', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: null
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default has attribute aria-invalid=true when aria-invalid=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default has attribute aria-invalid=true when aria-invalid="true"', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: 'true'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default has attribute aria-invalid=true when aria-invalid=""', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: ''
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  /* button mode structure */

  it('button mode has classes button-group and button-group-toggle', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
  })

  it('button mode has classes button-group-vertical and button-group-toggle when stacked=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        stacked: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
  })

  it('button mode has size class when size prop set', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
  })

  it('button mode has size class when size prop set and stacked', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        stacked: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
  })

  /* functionality testing */

  it('has radios via options array', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: ''
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('')
    expect(radios.is('input[type=radio]')).toBe(true)
  })

  it('emits change event when radio clicked', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: ''
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('')

    radios.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('one')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('one')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('one')

    radios.at(2).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('three')
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toEqual('three')
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toEqual('three')

    radios.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual('one')
    expect(wrapper.emitted('change').length).toBe(3)
    expect(wrapper.emitted('change')[2][0]).toEqual('one')
    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toEqual('one')
  })

  it('radios reflect group checked v-model', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: 'two'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const radios = wrapper.findAll('input')
    expect(radios.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual('two')
    expect(radios.is('input[type=radio]')).toBe(true)
    expect(radios.at(0).element.checked).toBe(false)
    expect(radios.at(1).element.checked).toBe(true)
    expect(radios.at(2).element.checked).toBe(false)

    wrapper.setProps({
      checked: 'one'
    })

    expect(wrapper.vm.localChecked).toEqual('one')
    expect(radios.is('input[type=radio]')).toBe(true)
    expect(radios.at(0).element.checked).toBe(true)
    expect(radios.at(1).element.checked).toBe(false)
    expect(radios.at(2).element.checked).toBe(false)
  })
})
