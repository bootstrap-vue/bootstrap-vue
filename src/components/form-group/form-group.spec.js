import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BCol } from '../layout/col'
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
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BFormGroup, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('default slot is optionally scoped', async () => {
    const label = 'my-label'
    const description = 'my-description'
    let slotScope

    const wrapper = mount(BFormGroup, {
      propsData: {
        label,
        description
      },
      scopedSlots: {
        default(scope) {
          slotScope = scope
          return 'foobar'
        }
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(slotScope).toBeDefined()
    expect(typeof slotScope.ariaDescribedby).toBe('string')
    expect(typeof slotScope.descriptionId).toBe('string')
    expect(typeof slotScope.id).toBe('string')
    expect(typeof slotScope.labelId).toBe('string')

    expect(wrapper.text()).toContain(label)
    expect(wrapper.text()).toContain(description)

    wrapper.destroy()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        label: 'test',
        labelFor: 'input-id',
        id: 'foo'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()
    expect(wrapper.find('label').attributes('id')).toEqual('foo__BV_label_')

    wrapper.destroy()
  })

  it('sets `aria-describedby` even when special characters are used in IDs', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        id: '/group-id',
        label: 'test',
        labelFor: '/input-id',
        // Description is needed to set `aria-describedby`
        description: 'foo'
      },
      slots: {
        default: '<input id="/input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('aria-describedby')).toEqual('/group-id__BV_description_')

    wrapper.destroy()
  })

  it('does not render a FIELDSET if prop `label-for` set', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        label: 'test',
        labelFor: 'input-id'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const formGroupId = wrapper.attributes('id')

    expect(wrapper.element.tagName).toBe('DIV')
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
    expect($label.attributes('id')).toEqual(`${formGroupId}__BV_label_`)
    expect($label.attributes('for')).toEqual('input-id')
    expect($label.attributes('aria-describedby')).toBeUndefined()
    expect($label.attributes('aria-labelledby')).toBeUndefined()

    wrapper.destroy()
  })

  it('has expected structure for horizontal layout with prop `label-for` set', async () => {
    const wrapper = mount(BFormGroup, {
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

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('aria-labelledby')).toBeUndefined()

    const $cols = wrapper.findAllComponents(BCol)
    expect($cols.length).toBe(2)

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

    expect(wrapper.find('legend').exists()).toBe(false)

    wrapper.destroy()
  })

  it('has expected structure for horizontal layout without prop `label-for` set', async () => {
    const wrapper = mount(BFormGroup, {
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

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.classes()).toContain('form-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-labelledby')).toBeDefined()

    const $legend = wrapper.find('legend')
    expect($legend.exists()).toBe(true)
    expect($legend.classes()).toContain('col-form-label')
    expect($legend.classes()).toContain('col-1')
    expect($legend.classes()).toContain('col-sm-2')
    expect($legend.classes()).toContain('col-md-3')
    expect($legend.classes()).toContain('col-lg-4')
    expect($legend.classes()).toContain('col-xl-5')
    expect($legend.classes()).toContain('bv-no-focus-ring')
    expect($legend.classes().length).toBe(7)
    expect($legend.text()).toEqual('test')

    expect(wrapper.find('label').exists()).toBe(false)

    wrapper.destroy()
  })

  it('has expected structure for horizontal layout without label content', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        labelCols: 1
      },
      slots: {
        default: '<input id="input-id" type="text">'
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

    expect(wrapper.find('label').exists()).toBe(false)

    wrapper.destroy()
  })

  it('validation and help text works', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        description: 'foo',
        invalidFeedback: 'bar',
        validFeedback: 'baz'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    // When `state` is `null` (default), all helpers are rendered
    expect(wrapper.find('.form-text').exists()).toBe(true)
    expect(wrapper.find('.form-text').text()).toEqual('foo')
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('is-invalid')
    expect(wrapper.classes()).not.toContain('is-valid')

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('aria-describedby')).toEqual('group-id__BV_description_')

    const $invalidFeedback = wrapper.find('.invalid-feedback')
    expect($invalidFeedback.exists()).toBe(true)
    expect($invalidFeedback.text()).toEqual('bar')
    expect($invalidFeedback.attributes('aria-live')).toEqual('assertive')
    expect($invalidFeedback.attributes('aria-atomic')).toEqual('true')

    const $validFeedback = wrapper.find('.valid-feedback')
    expect($validFeedback.exists()).toBe(true)
    expect($validFeedback.text()).toEqual('baz')
    expect($validFeedback.attributes('aria-live')).toEqual('assertive')
    expect($validFeedback.attributes('aria-atomic')).toEqual('true')

    // When `state` is `true`, description and valid are visible
    await wrapper.setProps({ state: true })
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('is-invalid')
    expect(wrapper.classes()).toContain('is-valid')
    expect($input.attributes('aria-describedby')).toBeDefined()
    expect($input.attributes('aria-describedby')).toEqual(
      'group-id__BV_description_ group-id__BV_feedback_valid_'
    )

    // When `state` is `false`, description and valid are visible
    await wrapper.setProps({ state: false })
    expect(wrapper.attributes('aria-invalid')).toEqual('true')
    expect(wrapper.classes()).not.toContain('is-valid')
    expect(wrapper.classes()).toContain('is-invalid')
    expect($input.attributes('aria-describedby')).toEqual(
      'group-id__BV_description_ group-id__BV_feedback_invalid_'
    )
  })

  it('has validation elements that respect `feedback-aria-live` prop', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        invalidFeedback: 'bar',
        validFeedback: 'baz',
        feedbackAriaLive: 'polite'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    let $invalidFeedback = wrapper.find('.invalid-feedback')
    expect($invalidFeedback.exists()).toBe(true)
    expect($invalidFeedback.text()).toEqual('bar')
    expect($invalidFeedback.attributes('aria-live')).toEqual('polite')
    expect($invalidFeedback.attributes('aria-atomic')).toEqual('true')

    let $validFeedback = wrapper.find('.valid-feedback')
    expect($validFeedback.exists()).toBe(true)
    expect($validFeedback.text()).toEqual('baz')
    expect($validFeedback.attributes('aria-live')).toEqual('polite')
    expect($validFeedback.attributes('aria-atomic')).toEqual('true')

    await wrapper.setProps({ feedbackAriaLive: null })

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

  it('aligns the LABEL based on `label-align` props', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        labelAlign: 'left',
        labelAlignMd: 'center',
        labelAlignXl: 'right'
      },
      slots: {
        default: '<input id="input-id" type="text">'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.classes()).toContain('text-left')
    expect($label.classes()).toContain('text-md-center')
    expect($label.classes()).toContain('text-xl-right')

    wrapper.destroy()
  })

  it('Label sr-only works', async () => {
    const wrapper = mount(BFormGroup, {
      propsData: {
        id: 'group-id',
        label: 'test',
        labelFor: 'input-id',
        labelSrOnly: true
      },
      slots: {
        default: '<input id="input-id" type="text">'
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
      attachTo: document.body,
      propsData: {
        id: 'group-id',
        label: 'test'
      },
      slots: {
        default: '<input id="input-id" type="text">'
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

    wrapper.destroy()
  })
})
