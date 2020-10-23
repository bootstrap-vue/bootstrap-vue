import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BFormTags } from './form-tags'

describe('form-tags', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormTags)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-form-tags')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('tabindex')).toBe('-1')

    wrapper.unmount()
  })

  it('has tags when value is set', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    const $tags = wrapper.findAll('.b-form-tag')
    expect($tags.length).toBe(2)

    const $tag0 = $tags[0]
    expect($tag0.attributes('title')).toEqual('apple')
    expect($tag0.classes()).toContain('badge')
    expect($tag0.classes()).toContain('badge-secondary')
    expect($tag0.text()).toContain('apple')
    expect($tag0.find('button.close').exists()).toBe(true)

    const $tag1 = $tags[1]
    expect($tag1.attributes('title')).toEqual('orange')
    expect($tag1.classes()).toContain('badge')
    expect($tag1.classes()).toContain('badge-secondary')
    expect($tag1.text()).toContain('orange')
    expect($tag1.find('button.close').exists()).toBe(true)

    wrapper.unmount()
  })

  it('responds to changes in value prop', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    await wrapper.setProps({ value: ['pear'] })
    expect(wrapper.vm.tags).toEqual(['pear'])

    wrapper.unmount()
  })

  it('default slot has expected scope', async () => {
    let scope
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange']
      },
      slots: {
        default(props) {
          scope = props
        }
      }
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

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

    wrapper.unmount()
  })

  it('has hidden inputs when name is set', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange'],
        name: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    const $hidden = wrapper.findAll('input[type=hidden]')
    expect($hidden.length).toBe(2)
    expect($hidden[0].attributes('value')).toEqual('apple')
    expect($hidden[0].attributes('name')).toEqual('foo')
    expect($hidden[1].attributes('value')).toEqual('orange')
    expect($hidden[1].attributes('name')).toEqual('foo')

    wrapper.unmount()
  })

  it('adds new tags from user input', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($input.element.type).toBe('text')

    $input.element.value = 'pear'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    await wrapper.setProps({ addOnChange: true })
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    await wrapper.setProps({ addOnChange: false })

    $input.element.value = 'peach'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('peach')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    await $input.trigger('keydown.enter')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach'])

    wrapper.unmount()
  })

  it('applies "input-id" to the input', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        inputId: '1-tag-input',
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($input.element.type).toBe('text')
    expect($input.element.id).toEqual('1-tag-input')

    $input.element.value = 'pear'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    await wrapper.setProps({ addOnChange: true })
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    await wrapper.setProps({ addOnChange: false })

    wrapper.unmount()
  })

  it('removes tags when user clicks remove on tag', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange', 'pear', 'peach']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach'])
    expect(wrapper.vm.newTag).toEqual('')

    let $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(4)
    expect($tags[1].attributes('title')).toEqual('orange')

    const $btn = $tags[1].find('button')
    expect($btn.exists()).toBe(true)

    await $btn.trigger('click')
    expect(wrapper.vm.tags).toEqual(['apple', 'pear', 'peach'])

    $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(3)
    expect($tags[1].attributes('title')).toEqual('pear')

    wrapper.unmount()
  })

  it('adds new tags via separator', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        separator: ' ,;',
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    $input.element.value = 'pear'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    $input.element.value = 'pear '
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    $input.element.value = 'peach;  foo,bar apple pie'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('peach;  foo,bar apple pie')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    $input.element.value = 'peach;  foo,bar apple pie '
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('apple ')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach', 'foo', 'bar', 'pie'])

    wrapper.unmount()
  })

  it('tag validation works', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        separator: ' ',
        tagValidator: tag => tag.length < 5,
        value: ['one', 'two']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    $input.element.value = 'tag'
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('tag')

    $input.element.value = 'tag '
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    expect(wrapper.vm.newTag).toEqual('')

    $input.element.value = 'three four one four '
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three four one four ')

    $input.element.value = ' three '
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three ')

    $input.element.value = ' three seven '
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three seven ')

    $input.element.value = ' three cat seven '
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four', 'cat'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three seven ')

    $input.element.value = '    '
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('    ')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag', 'four', 'cat'])

    wrapper.unmount()
  })

  it('tag validation on input event works', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        separator: ' ',
        tagValidator: tag => tag.length < 5,
        validateOnInput: true,
        value: ['one', 'two']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual('three ')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual(['three'])
    // State hasn't changed, so event not emitted
    expect(wrapper.emitted('tag-state').length).toBe(4)

    $input.element.value = 'two'
    await $input.trigger('input')
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
    await $input.trigger('input')
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
    await $input.trigger('input')
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three two ')
    expect(wrapper.emitted('tag-state').length).toBe(6)
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true)
    expect(wrapper.find('.form-text').exists()).toBe(true)

    $input.element.value = '    '
    await $input.trigger('input')
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

    wrapper.unmount()
  })

  it('adds new tags when add button clicked', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    const $button = wrapper.find('button.b-form-tags-button')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('invisible')

    $input.element.value = 'pear'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect($button.classes()).not.toContain('invisible')

    await $button.trigger('click')
    expect($button.classes()).toContain('invisible')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    wrapper.unmount()
  })

  it('focuses input when wrapper div clicked', async () => {
    const wrapper = mount(BFormTags, {
      attachTo: createContainer(),
      props: {
        value: ['apple', 'orange']
      }
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.classes()).not.toContain('focus')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect(document.activeElement).not.toBe($input.element)

    await wrapper.trigger('click')
    expect(document.activeElement).toBe($input.element)
    await $input.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')

    $input.element.blur()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).not.toBe($input.element)
    await $input.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($input.element)
    await $input.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).not.toBe($input.element)
    await $input.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')

    wrapper.unmount()
  })

  it('autofocus works', async () => {
    const wrapper = mount(BFormTags, {
      attachTo: createContainer(),
      props: {
        autofocus: true,
        value: ['apple', 'orange']
      }
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.classes()).toContain('focus')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect(document.activeElement).toBe($input.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($input.element)

    wrapper.unmount()
  })

  it('`limit` prop works', async () => {
    const wrapper = mount(BFormTags, {
      props: {
        value: ['apple', 'orange'],
        limit: 3
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')

    const $button = wrapper.find('button.b-form-tags-button')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('invisible')

    expect(wrapper.find('small.form-text').exists()).toBe(false)

    // Add new tag
    $input.element.value = 'pear'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('pear')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange'])
    expect($button.classes()).not.toContain('invisible')

    await $button.trigger('click')
    expect($button.classes()).toContain('invisible')
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])

    const $feedback = wrapper.find('small.form-text')
    expect($feedback.exists()).toBe(true)
    expect($feedback.text()).toContain('Tag limit reached')

    // Attempt to add new tag
    $input.element.value = 'lemon'
    await $input.trigger('input')
    expect(wrapper.vm.newTag).toEqual('lemon')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    expect($button.classes()).not.toContain('invisible')

    await $button.trigger('click')
    expect($button.classes()).not.toContain('invisible')
    expect(wrapper.vm.newTag).toEqual('lemon')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear'])
    expect($feedback.exists()).toBe(true)
    expect($feedback.text()).toContain('Tag limit reached')

    wrapper.unmount()
  })
})
