import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTags } from './form-tags'

describe('form-tags', () => {
  it('has div as root element', async () => {
    const wrapper = mount(BFormTags)
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.classes()).toContain('b-form-tags')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('tabindex')).toBe('-1')

    wrapper.destroy()
  })

  it('has tags when value is set', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    const $tags = wrapper.findAll('.b-form-tag')
    expect($tags.length).toBe(2)

    const $tag0 = $tags.at(0)
    expect($tag0.attributes('title')).toEqual('apple')
    expect($tag0.classes()).toContain('badge')
    expect($tag0.classes()).toContain('badge-secondary')
    expect($tag0.text()).toContain('apple')
    expect($tag0.find('button.close').exists()).toBe(true)

    const $tag1 = $tags.at(1)
    expect($tag1.attributes('title')).toEqual('orange')
    expect($tag1.classes()).toContain('badge')
    expect($tag1.classes()).toContain('badge-secondary')
    expect($tag1.text()).toContain('orange')
    expect($tag1.find('button.close').exists()).toBe(true)

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

    expect(wrapper.vm.tags).toEqual(['pear'])

    wrapper.destroy()
  })

  it('default slot has expected scope', async () => {
    let scope
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      },
      scopedSlots: {
        default(props) {
          scope = props
        }
      }
    })
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(scope).toBeDefined()
    expect(typeof scope).toBe('object')

    expect(Array.isArray(scope.tags)).toBe(true)
    expect(scope.tags).toEqual(['apple', 'orange'])
    expect(typeof scope.addTag).toBe('function')
    expect(typeof scope.removeTag).toBe('function')
    expect(typeof scope.disabled).toBe('boolean')
    expect(scope.state).toEqual(null)
    expect(typeof scope.tagRemoveLabel).toBe('string')
    expect(scope.tagRemoveLabel).toBe('Remove tag')
    expect(typeof scope.placeholder).toBe('string')
    expect(scope.placeholder).toBe('Add tag...')
    expect(typeof scope.tagVariant).toBe('string')
    expect(scope.tagVariant).toBe('secondary')
    expect(scope.inputAttrs).toEqual(wrapper.vm.computedInputAttrs)
    expect(scope.inputHandlers).toEqual(wrapper.vm.computedInputHandlers)

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

  it('removes tags when user clicks remove on tag', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange', 'pear', 'peach']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach'])
    expect(wrapper.vm.newTag).toEqual('')

    let $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(4)

    expect($tags.at(1).attributes('title')).toEqual('orange')

    const $btn = $tags.at(1).find('button')
    expect($btn.exists()).toBe(true)

    $btn.trigger('click')
    expect(wrapper.vm.tags).toEqual(['apple', 'pear', 'peach'])

    $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(3)
    expect($tags.at(1).attributes('title')).toEqual('pear')

    wrapper.destroy()
  })

  it('focuses input when wrapper div clicked', async () => {
    const wrapper = mount(BFormTags, {
      attachToDocument: true,
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    expect(wrapper.classes()).not.toContain('focus')

    const $input = wrapper.find('input')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    expect(document.activeElement).not.toBe($input.element)

    wrapper.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($input.element)
    $input.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')

    $input.element.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).not.toBe($input.element)
    $input.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($input.element)
    $input.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).not.toBe($input.element)
    $input.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')

    wrapper.destroy()
  })

  it('autofocus works', async () => {
    const wrapper = mount(BFormTags, {
      attachToDocument: true,
      propsData: {
        autofocus: true,
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    expect(wrapper.classes()).not.toContain('focus')

    const $input = wrapper.find('input')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    expect(document.activeElement).toBe($input.element)

    wrapper.destroy()
  })
})
