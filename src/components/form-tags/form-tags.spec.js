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
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    wrapper.setProps({
      addOnChange: true
    })
    $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    wrapper.setProps({
      addOnChange: false
    })

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

  it('adds new tags via separator', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        separator: ' ,;',
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
    $input.element.value = 'pear '
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    $input.element.value = 'peach;  foo,bar apple pie'
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('peach;  foo,bar apple pie')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    $input.element.value = 'peach;  foo,bar apple pie '
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('apple ')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach', 'foo', 'bar', 'pie'])

    wrapper.destroy()
  })

  it('tag validation works', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        separator: ' ',
        tagValidator: tag => tag.length < 5,
        value: ['one', 'two']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    $input.element.value = 'tag'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('tag')

    $input.element.value = 'tag '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    expect(wrapper.vm.newTag).toEqual('')

    $input.element.value = 'three four one four '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three four one four ')

    $input.element.value = ' three '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three ')

    $input.element.value = ' three seven '
    $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three seven ')

    $input.element.value = ' three cat seven '
    $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four', 'cat'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three seven ')

    $input.element.value = '    '
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('    ')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four', 'cat'])

    wrapper.destroy()
  })

  it('tag validation on input event works', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        separator: ' ',
        tagValidator: tag => tag.length < 5,
        validateOnInput: true,
        value: ['one', 'two']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state')).not.toBeDefined()
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)

    const $input = wrapper.find('input')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    $input.element.value = 'tag'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('tag')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state')).toBeDefined()
    expect(wrapper.emitted('tag-state').length).toBe(1)
    // Valid tags
    expect(wrapper.emitted('tag-state')[0][0]).toEqual(['tag'])
    // Invalid tags
    expect(wrapper.emitted('tag-state')[0][1]).toEqual([])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[0][2]).toEqual([])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)

    $input.element.value = 'tag '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state')).toBeDefined()
    // No changes to tagsState data, so no emit
    expect(wrapper.emitted('tag-state').length).toBe(1)
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)

    // Emulate a user typing the word `three` (but not finished)
    $input.element.value = 'thr'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // Invalid tags are left in the input
    expect(wrapper.vm.newTag).toEqual('thr')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state').length).toBe(2)
    // Valid tags
    expect(wrapper.emitted('tag-state')[1][0]).toEqual(['thr'])
    // Invalid tags
    expect(wrapper.emitted('tag-state')[1][1]).toEqual([])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[1][2]).toEqual([])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)
    // Add next character
    $input.element.value = 'thre'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // Invalid tags are left in the input
    expect(wrapper.vm.newTag).toEqual('thre')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state').length).toBe(3)
    // Valid tags
    expect(wrapper.emitted('tag-state')[2][0]).toEqual(['thre'])
    // Invalid tags
    expect(wrapper.emitted('tag-state')[2][1]).toEqual([])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[2][2]).toEqual([])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)
    // Add next character
    $input.element.value = 'three'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual(['three'])
    expect(wrapper.emitted('tag-state').length).toBe(4)
    // Valid tags
    expect(wrapper.emitted('tag-state')[3][0]).toEqual([])
    // Invalid tags
    expect(wrapper.emitted('tag-state')[3][1]).toEqual(['three'])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[3][2]).toEqual([])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true)
    expect(wrapper.find('.form-text').exists()).toBe(false)
    // Add next character
    $input.element.value = 'three '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three ')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual(['three'])
    // State hasn't changed, so event not emitted
    expect(wrapper.emitted('tag-state').length).toBe(4)

    $input.element.value = 'two'
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('two')
    expect(wrapper.vm.duplicateTags).toEqual(['two'])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state').length).toBe(5)
    // Valid tags
    expect(wrapper.emitted('tag-state')[4][0]).toEqual([])
    // Invalid tags
    expect(wrapper.emitted('tag-state')[4][1]).toEqual([])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[4][2]).toEqual(['two'])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(true)

    $input.element.value = ' three two '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three two ')
    expect(wrapper.emitted('tag-state').length).toBe(6)
    // Tags added
    expect(wrapper.emitted('tag-state')[5][0]).toEqual([])
    // Invalid tag
    expect(wrapper.emitted('tag-state')[5][1]).toEqual(['three'])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[5][2]).toEqual(['two'])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true)
    expect(wrapper.find('.form-text').exists()).toBe(true)
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three two ')
    expect(wrapper.emitted('tag-state').length).toBe(6)
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true)
    expect(wrapper.find('.form-text').exists()).toBe(true)

    $input.element.value = '    '
    $input.trigger('input')
    await waitNT(wrapper.vm)
    expect(wrapper.vm.newTag).toEqual('    ')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    expect(wrapper.emitted('tag-state').length).toBe(7)
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    // Tags added
    expect(wrapper.emitted('tag-state')[6][0]).toEqual([])
    // Invalid tag
    expect(wrapper.emitted('tag-state')[6][1]).toEqual([])
    // Duplicate tags
    expect(wrapper.emitted('tag-state')[6][2]).toEqual([])
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
    expect(wrapper.find('.form-text').exists()).toBe(false)

    wrapper.destroy()
  })

  it('adds new tags when add button clicked', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      }
    })
    expect(wrapper.is('div')).toBe(true)

    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    const $button = wrapper.find('button.b-form-tags-button')

    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('invisible')

    $input.element.value = 'pear'
    $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect($button.classes()).not.toContain('invisible')

    $button.trigger('click')

    expect($button.classes()).toContain('invisible')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

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
