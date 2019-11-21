import { mount } from '@vue/test-utils'
// import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTags } from './form-tags'

describe('form-tags', () => {
  it('has div as root element', async () => {
    const wrapper = mount(BFormTags)
    expect(wrapper.is('div')).toBe(true)

    wrapper.destroy()
  })

  it('has tags when value is set', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    wrapper.destroy()
  })

  it('responds to changes in value prop', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    wrapper.setProps({
      value: ['pear']
    })

    wrapper.destroy()
  })

  it('has hidden inputs when name is set', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange'],
        name: 'foo'
      }
    })
    expect(wrapper.is('div')).toBe(true)

    const $hidden = wrapper.findAll('input[type=hidden]')
    expect($hidden.length).toBe(2)

    expect($hidden.at(0).attributes('value')).toEqual('apple')
    expect($hidden.at(0).attributes('name')).toEqual('foo')
    expect($hidden.at(1).attributes('value')).toEqual('orange')
    expect($hidden.at(1).attributes('name')).toEqual('foo')

    wrapper.destroy()
  })

  it('adds new tags from user input', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    $input.element.value = 'pear'
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    $input.element.value = 'peach'
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('peach')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    $input.trigger('keydown.enter')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach'])

    wrapper.destroy()
  })
})
