import { mount } from '@vue/test-utils'
import { createContainer, waitNT } from '../../../tests/utils'
import { h } from '../../vue'
import { BFormGroup } from './form-group'

describe('form-group', () => {
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
    // Needed for input focusing
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Reset overrides
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('has expected default structure', async () => {
    const wrapper = mount(BFormGroup)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    expect(wrapper.find('label').exists()).toBe(false)

    expect(wrapper.find('legend').exists()).toBe(false)

    const $content = wrapper.find('div')
    expect($content.exists()).toBe(true)
    expect($content.attributes('role')).toEqual('group')
    expect($content.attributes('tabindex')).toEqual('-1')
    expect($content.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BFormGroup, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $content = wrapper.find('div')
    expect($content.exists()).toBe(true)
    expect($content.attributes('role')).toEqual('group')
    expect($content.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        label: 'test',
        labelFor: 'input-id',
        id: 'foo'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    expect(wrapper.find('label').attributes('id')).toEqual('foo__BV_label_')

    wrapper.unmount()
  })

  it('does not render a fieldset if prop label-for set', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        label: 'test',
        labelFor: 'input-id'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    const formGroupId = wrapper.attributes('id')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    expect(wrapper.find('legend').exists()).toBe(false)

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.classes()).toContain('d-block')
    expect($label.text()).toEqual('test')
    expect($label.attributes('for')).toEqual('input-id')
    expect($label.attributes('id')).toEqual(`${formGroupId}__BV_label_`)

    const $content = wrapper.find('div').find('div')
    expect($content.exists()).toBe(true)
    expect($content.classes()).toContain('bv-no-focus-ring')
    expect($content.classes().length).toBe(1)
    expect($content.attributes('role')).toBeUndefined()
    expect($content.attributes('tabindex')).toBeUndefined()
    expect($content.attributes('aria-labelledby')).toBeUndefined()
    expect($content.text()).toEqual('')

    const $input = $content.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('aria-describedby')).toBeUndefined()
    expect($input.attributes('aria-labelledby')).toBeUndefined()

    wrapper.unmount()
  })

  it('horizontal layout with prop label-for set has expected structure', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        label: 'test',
        labelFor: 'input-id',
        labelCols: 1,
        labelColsSm: 2,
        labelColsMd: 3,
        labelColsLg: 4,
        labelColsXl: 5
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    expect(wrapper.find('legend').exists()).toBe(false)

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.classes()).toContain('col-form-label')
    expect($label.classes()).toContain('col-1')
    expect($label.classes()).toContain('col-sm-2')
    expect($label.classes()).toContain('col-md-3')
    expect($label.classes()).toContain('col-lg-4')
    expect($label.classes()).toContain('col-xl-5')
    expect($label.classes().length).toBe(6)
    expect($label.text()).toEqual('test')

    const $content = wrapper.find('div').find('div')
    expect($content.exists()).toBe(true)
    expect($content.classes()).toContain('col')
    expect($content.classes()).toContain('bv-no-focus-ring')
    expect($content.classes().length).toBe(2)
    expect($content.attributes('role')).toBeUndefined()
    expect($content.attributes('tabindex')).toBeUndefined()
    expect($content.attributes('aria-labelledby')).toBeUndefined()

    wrapper.unmount()
  })

  it('sets "aria-describedby" even when special characters are used in IDs', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        id: '/group-id',
        label: 'test',
        labelFor: '/input-id',
        description: 'foo' // Description is needed to set "aria-describedby"
      },
      slots: {
        default: h('input', { attrs: { id: '/input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('aria-describedby')).toEqual('/group-id__BV_description_')

    wrapper.unmount()
  })

  it('horizontal layout without prop label-for set has expected structure', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        label: 'test',
        labelCols: 1,
        labelColsSm: 2,
        labelColsMd: 3,
        labelColsLg: 4,
        labelColsXl: 5
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-labelledby')).toBeDefined()

    const $legend = wrapper.find('legend')
    expect($legend.classes()).toContain('col-form-label')
    expect($legend.classes()).toContain('col-1')
    expect($legend.classes()).toContain('col-sm-2')
    expect($legend.classes()).toContain('col-md-3')
    expect($legend.classes()).toContain('col-lg-4')
    expect($legend.classes()).toContain('col-xl-5')
    expect($legend.classes()).toContain('bv-no-focus-ring')
    expect($legend.classes().length).toBe(7)
    expect($legend.text()).toEqual('test')

    const $content = wrapper.find('div').find('div')
    expect($content.exists()).toBe(true)
    expect($content.classes()).toContain('col')
    expect($content.classes()).toContain('bv-no-focus-ring')
    expect($content.classes().length).toBe(2)
    expect($content.attributes('role')).toEqual('group')
    expect($content.attributes('tabindex')).toEqual('-1')
    expect($content.attributes('aria-labelledby')).toBeDefined()

    wrapper.unmount()
  })

  it('horizontal layout without label content has expected structure', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        labelCols: 1
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    const $legend = wrapper.find('legend')
    expect($legend.classes()).toContain('col-form-label')
    expect($legend.classes()).toContain('col-1')
    expect($legend.classes()).toContain('bv-no-focus-ring')
    expect($legend.text()).toEqual('')

    const $content = wrapper.find('div').find('div')
    expect($content.exists()).toBe(true)
    expect($content.classes()).toContain('col')
    expect($content.classes()).toContain('bv-no-focus-ring')
    expect($content.classes().length).toBe(2)
    expect($content.attributes('role')).toEqual('group')
    expect($content.attributes('tabindex')).toEqual('-1')

    wrapper.unmount()
  })

  it('validation and help text works', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        description: 'foo',
        invalidFeedback: 'bar',
        validFeedback: 'baz'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('is-invalid')
    expect(wrapper.classes()).not.toContain('is-valid')

    // With state = null (default), all helpers are rendered
    const $invalidFeedback = wrapper.find('.invalid-feedback')
    expect($invalidFeedback.exists()).toBe(true)
    expect($invalidFeedback.text()).toEqual('bar')
    expect($invalidFeedback.attributes('role')).toEqual('alert')
    expect($invalidFeedback.attributes('aria-live')).toEqual('assertive')
    expect($invalidFeedback.attributes('aria-atomic')).toEqual('true')

    const $validFeedback = wrapper.find('.valid-feedback')
    expect($validFeedback.exists()).toBe(true)
    expect($validFeedback.text()).toEqual('baz')
    expect($validFeedback.attributes('role')).toEqual('alert')
    expect($validFeedback.attributes('aria-live')).toEqual('assertive')
    expect($validFeedback.attributes('aria-atomic')).toEqual('true')

    const $formText = wrapper.find('.form-text')
    expect($formText.exists()).toBe(true)
    expect($formText.text()).toEqual('foo')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('aria-describedby')).toEqual('group-id__BV_description_')

    // With state = true, description and valid are visible
    await wrapper.setProps({ state: true })
    await waitNT(wrapper.vm)

    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('is-invalid')
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.find('input').attributes('aria-describedby')).toEqual(
      'group-id__BV_description_ group-id__BV_feedback_valid_'
    )

    // With state = false, description and invalid are visible
    await wrapper.setProps({ state: false })
    await waitNT(wrapper.vm)

    expect(wrapper.attributes('aria-invalid')).toEqual('true')
    expect(wrapper.classes()).not.toContain('is-valid')
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.find('input').attributes('aria-describedby')).toEqual(
      'group-id__BV_description_ group-id__BV_feedback_invalid_'
    )

    wrapper.unmount()
  })

  it('validation elements respect feedback-aria-live attribute', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        invalidFeedback: 'bar',
        validFeedback: 'baz',
        feedbackAriaLive: 'polite'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    let $invalidFeedback = wrapper.find('.invalid-feedback')
    expect($invalidFeedback.exists()).toBe(true)
    expect($invalidFeedback.text()).toEqual('bar')
    expect($invalidFeedback.attributes('role')).toEqual('alert')
    expect($invalidFeedback.attributes('aria-live')).toEqual('polite')
    expect($invalidFeedback.attributes('aria-atomic')).toEqual('true')

    let $validFeedback = wrapper.find('.valid-feedback')
    expect($validFeedback.exists()).toBe(true)
    expect($validFeedback.text()).toEqual('baz')
    expect($validFeedback.attributes('role')).toEqual('alert')
    expect($validFeedback.attributes('aria-live')).toEqual('polite')
    expect($validFeedback.attributes('aria-atomic')).toEqual('true')

    // With feedback-aria-live set to null
    await wrapper.setProps({ feedbackAriaLive: null })
    await waitNT(wrapper.vm)

    $invalidFeedback = wrapper.find('.invalid-feedback')
    expect($invalidFeedback.exists()).toBe(true)
    expect($invalidFeedback.text()).toEqual('bar')
    expect($invalidFeedback.attributes('role')).toBeUndefined()
    expect($invalidFeedback.attributes('aria-live')).toBeUndefined()
    expect($invalidFeedback.attributes('aria-atomic')).toBeUndefined()

    $validFeedback = wrapper.find('.valid-feedback')
    expect($validFeedback.exists()).toBe(true)
    expect($validFeedback.text()).toEqual('baz')
    expect($validFeedback.attributes('role')).toBeUndefined()
    expect($validFeedback.attributes('aria-live')).toBeUndefined()
    expect($validFeedback.attributes('aria-atomic')).toBeUndefined()
  })

  it('Label alignment works', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        labelAlign: 'left',
        labelAlignMd: 'center',
        labelAlignXl: 'right'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.classes()).toContain('text-left')
    expect($label.classes()).toContain('text-md-center')
    expect($label.classes()).toContain('text-xl-right')

    wrapper.unmount()
  })

  it('label sr-only works', async () => {
    const wrapper = mount(BFormGroup, {
      props: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        labelSrOnly: true
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.classes()).toContain('sr-only')
    expect($label.text()).toEqual('test')
  })

  it('clicking legend focuses input', async () => {
    const wrapper = mount(BFormGroup, {
      attachTo: createContainer(),
      props: {
        id: 'group-id',
        label: 'test'
      },
      slots: {
        default: h('input', { attrs: { id: 'input-id', type: 'text' } })
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $legend = wrapper.find('legend')
    const $input = wrapper.find('input')
    expect($legend.exists()).toBe(true)
    expect($input.exists()).toBe(true)

    expect(document.activeElement).not.toBe($input.element)
    expect(document.activeElement).not.toBe($legend.element)

    await $legend.trigger('click')
    expect(document.activeElement).toBe($input.element)

    wrapper.unmount()
  })
})
