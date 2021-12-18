import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTags } from './form-tags'

describe('form-tags', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormTags)

    expect(wrapper.element.tagName).toBe('DIV')
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

    expect(wrapper.element.tagName).toBe('DIV')

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

    expect(wrapper.element.tagName).toBe('DIV')

    await wrapper.setProps({ value: ['pear'] })
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

    wrapper.destroy()
  })

  it('has hidden inputs when name is set', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: [],
        name: 'foo',
        required: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    let $hidden = wrapper.find('input.sr-only')
    expect($hidden.attributes('value')).toEqual('')
    expect($hidden.attributes('name')).toEqual('foo')
    expect($hidden.attributes('required')).toBeDefined()

    await wrapper.setProps({ value: ['apple', 'orange'] })
    $hidden = wrapper.findAll('input[type=hidden]')
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

    wrapper.destroy()
  })

  it('applies "input-id" to the input', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
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

    wrapper.destroy()
  })

  it('has tags without remove button when `no-tag-remove` prop set', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        noTagRemove: true,
        value: ['apple', 'orange']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    const $tags = wrapper.findAll('.b-form-tag')
    expect($tags.length).toBe(2)

    const $tag0 = $tags.at(0)
    expect($tag0.find('button').exists()).toBe(false)

    const $tag1 = $tags.at(1)
    expect($tag1.find('button').exists()).toBe(false)

    wrapper.destroy()
  })

  it('removes tags when user clicks remove on tag', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange', 'pear', 'peach']
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['apple', 'orange', 'pear', 'peach'])
    expect(wrapper.vm.newTag).toEqual('')

    let $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(4)
    expect($tags.at(1).attributes('title')).toEqual('orange')

    const $btn = $tags.at(1).find('button')
    expect($btn.exists()).toBe(true)

    await $btn.trigger('click')
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

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.duplicateTags).toEqual([])
    expect(wrapper.vm.invalidTags).toEqual([])
    expect(wrapper.emitted('tag-state')).toBeUndefined()
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
    expect(wrapper.find('.invalid-feedback').attributes('aria-live')).toEqual('assertive')
    expect(wrapper.find('.invalid-feedback').attributes('aria-atomic')).toEqual('true')
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
    await wrapper.setProps({ feedbackAriaLive: 'polite' })
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
    expect(wrapper.find('.invalid-feedback').attributes('aria-live')).toEqual('polite')
    expect(wrapper.find('.invalid-feedback').attributes('aria-atomic')).toEqual('true')
    expect(wrapper.find('.form-text').exists()).toBe(true)
    await $input.trigger('input')
    await wrapper.setProps({ feedbackAriaLive: null })
    expect(wrapper.vm.tags).toEqual(['one', 'two', 'tag'])
    // No tags(s) were accepted so the input is left as is
    expect(wrapper.vm.newTag).toEqual(' three two ')
    expect(wrapper.emitted('tag-state').length).toBe(6)
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true)
    expect(wrapper.find('.invalid-feedback').attributes('aria-live')).toBeUndefined()
    expect(wrapper.find('.invalid-feedback').attributes('aria-atomic')).toBeUndefined()
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

    wrapper.destroy()
  })

  it('adds new tags when add button clicked', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
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

    wrapper.destroy()
  })

  it('reset() method works', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['one', 'two'],
        addOnChange: true,
        tagValidator: tag => tag.length < 4
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($input.element.type).toBe('text')

    $input.element.value = 'three'
    await $input.trigger('input')
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('three')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.tagsState.invalid).toContain('three')

    const $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(2)
    await $tags
      .at(1)
      .find('button')
      .trigger('click')
    expect(wrapper.vm.tags).toEqual(['one'])
    expect(wrapper.vm.removedTags).toContain('two')

    wrapper.vm.reset()
    await waitNT(wrapper.vm)

    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual([])
    expect(wrapper.vm.removedTags).toEqual([])
    expect(wrapper.vm.tagsState.invalid).toEqual([])

    wrapper.destroy()
  })

  it('native reset event works', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['one', 'two'],
        addOnChange: true,
        tagValidator: tag => tag.length < 4
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.newTag).toEqual('')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($input.element.type).toBe('text')

    $input.element.value = 'three'
    await $input.trigger('input')
    await $input.trigger('change')
    expect(wrapper.vm.newTag).toEqual('three')
    expect(wrapper.vm.tags).toEqual(['one', 'two'])
    expect(wrapper.vm.tagsState.invalid).toContain('three')

    const $tags = wrapper.findAll('.badge')
    expect($tags.length).toBe(2)
    await $tags
      .at(1)
      .find('button')
      .trigger('click')
    expect(wrapper.vm.tags).toEqual(['one'])
    expect(wrapper.vm.removedTags).toContain('two')

    await $input.trigger('reset')
    await waitNT(wrapper.vm)

    expect(wrapper.vm.newTag).toEqual('')
    expect(wrapper.vm.tags).toEqual([])
    expect(wrapper.vm.removedTags).toEqual([])
    expect(wrapper.vm.tagsState.invalid).toEqual([])

    wrapper.destroy()
  })

  it('form native reset event triggers reset', async () => {
    const App = {
      render(h) {
        return h('form', [
          h(BFormTags, {
            props: {
              value: ['one', 'two'],
              addOnChange: true,
              tagValidator: tag => tag.length < 4
            }
          })
        ])
      }
    }
    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.element.tagName).toBe('FORM')

    const formTags = wrapper.findComponent(BFormTags)
    expect(formTags.exists()).toBe(true)
    expect(formTags.element.tagName).toBe('DIV')
    expect(formTags.vm.tags).toEqual(['one', 'two'])
    expect(formTags.vm.newTag).toEqual('')

    const $input = formTags.find('input')
    expect($input.exists()).toBe(true)
    expect($input.element.value).toBe('')
    expect($input.element.type).toBe('text')

    $input.element.value = 'three'
    await $input.trigger('input')
    await $input.trigger('change')
    expect(formTags.vm.newTag).toEqual('three')
    expect(formTags.vm.tags).toEqual(['one', 'two'])
    expect(formTags.vm.tagsState.invalid).toContain('three')

    const $tags = formTags.findAll('.badge')
    expect($tags.length).toBe(2)
    await $tags
      .at(1)
      .find('button')
      .trigger('click')
    expect(formTags.vm.tags).toEqual(['one'])
    expect(formTags.vm.removedTags).toContain('two')

    // Trigger form's native reset event
    wrapper.find('form').trigger('reset')
    await waitNT(formTags.vm)

    expect(formTags.vm.newTag).toEqual('')
    expect(formTags.vm.tags).toEqual([])
    expect(formTags.vm.removedTags).toEqual([])
    expect(formTags.vm.tagsState.invalid).toEqual([])

    wrapper.destroy()
  })

  it('focuses input when wrapper div clicked', async () => {
    const wrapper = mount(BFormTags, {
      attachTo: document.body,
      propsData: {
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

    wrapper.destroy()
  })

  it('autofocus works', async () => {
    const wrapper = mount(BFormTags, {
      attachTo: document.body,
      propsData: {
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

    wrapper.destroy()
  })

  it('`limit` prop works', async () => {
    const wrapper = mount(BFormTags, {
      propsData: {
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

    wrapper.destroy()
  })

  it('emits focus and blur events when wrapper gains/loses focus', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const wrapper = mount(BFormTags, {
      attachTo: document.body,
      propsData: {
        value: ['apple', 'orange']
      },
      listeners: {
        focus: onFocus,
        blur: onBlur
      }
    })

    expect(onFocus).not.toHaveBeenCalled()
    expect(onBlur).not.toHaveBeenCalled()

    const $input = wrapper.find('input')
    expect(typeof wrapper.vm.$listeners.focus).toBe('function')

    $input.trigger('focus')
    $input.trigger('focusin')

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(onFocus).toHaveBeenCalled()
    expect(onBlur).not.toHaveBeenCalled()

    $input.trigger('blur')
    $input.trigger('focusout')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(onBlur).toHaveBeenCalled()

    wrapper.destroy()
  })

  it('emits focusin and focusout when internal focus changes', async () => {
    const onFocusIn = jest.fn()
    const onFocusOut = jest.fn()
    const wrapper = mount(BFormTags, {
      propsData: {
        value: ['apple', 'orange']
      },
      listeners: {
        focusin: onFocusIn,
        focusout: onFocusOut
      }
    })

    expect(onFocusIn).not.toHaveBeenCalled()
    expect(onFocusOut).not.toHaveBeenCalled()

    const $input = wrapper.find('input')
    const $tag = wrapper.find('.b-form-tag')

    $input.trigger('focusin')

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(onFocusIn).toHaveBeenCalledTimes(1)
    expect(onFocusOut).not.toHaveBeenCalled()

    $tag.trigger('focusin')
    $input.trigger('focusout')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(onFocusIn).toHaveBeenCalledTimes(2)
    expect(onFocusOut).toHaveBeenCalledTimes(1)
  })
})
