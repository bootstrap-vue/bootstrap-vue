import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BFormSelect } from './form-select'

describe('form-select', () => {
  afterAll(() => {
    console.warn.mockClear()
  })

  it('has select as root element', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.element.tagName).toBe('SELECT')

    wrapper.destroy()
  })

  it('has class custom-select', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('does not have attr multiple by default', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.attributes('multiple')).toBeUndefined()

    wrapper.destroy()
  })

  it('does not have attr required by default', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.attributes('required')).toBeUndefined()

    wrapper.destroy()
  })

  it('has attr required when required=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        required: true
      }
    })
    expect(wrapper.attributes('required')).toBeDefined()

    wrapper.destroy()
  })

  it('does not have attr form by default', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.attributes('form')).toBeUndefined()

    wrapper.destroy()
  })

  it('has attr form when form is set', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        form: 'foobar'
      }
    })
    expect(wrapper.attributes('form')).toBeDefined()
    expect(wrapper.attributes('form')).toBe('foobar')

    wrapper.destroy()
  })

  it('has attr multiple when multiple=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        multiple: true,
        value: []
      }
    })
    expect(wrapper.attributes('multiple')).toBeDefined()

    wrapper.destroy()
  })

  it('has attr size when select-size is set', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        selectSize: 4
      }
    })
    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('4')
    expect(wrapper.attributes('multiple')).toBeUndefined()

    wrapper.destroy()
  })

  it('has auto ID attr by default', async () => {
    const wrapper = mount(BFormSelect)
    await waitNT(wrapper.vm) // Auto-ID assigned after mount
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('has user supplied ID attr when id is set', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        id: 'foobar'
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.destroy()
  })

  it('does not have attr size by default', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.attributes('size')).toBeUndefined()

    wrapper.destroy()
  })

  it('does have attr size when plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        plain: true
      }
    })
    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('0')

    wrapper.destroy()
  })

  it('has class custom-select-sm when size=sm and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-sm')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class custom-select-lg when size=lg and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-lg')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class custom-select-foo when size=foo and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'foo'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-foo')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-invalid and attr aria-invalid="true" when state=false', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-valid when state=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has attr aria-invalid="true" when aria-invalid="true"', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        ariaInvalid: 'true'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has attr aria-invalid="true" when aria-invalid=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has class form-control when plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.element.tagName).toBe('SELECT')

    wrapper.destroy()
  })

  it('has class form-control-lg when size=lg and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'lg',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-lg')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class form-control-sm when size=sm and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'sm',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-sm')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class form-control-foo when size=foo and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        size: 'foo',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-foo')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(BFormSelect, {
      attachTo: createContainer()
    })

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(document.activeElement).toBe(wrapper.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.destroy()
  })

  it('has option elements from simple options array', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: ['one', 'two', 'three']
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('two')
    expect($options.at(2).attributes('value')).toBe('three')
    expect($options.wrappers.every(o => o.find('[disabled]').exists())).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: [
          { text: 'one', value: 1 },
          { text: 'two', value: 2, disabled: true },
          { text: 'three', value: 3 }
        ]
      }
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')
    expect(
      $options
        .at(0)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(1)
        .find('[disabled]')
        .exists()
    ).toBe(true)
    expect(
      $options
        .at(2)
        .find('[disabled]')
        .exists()
    ).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from options array of objects with custom field names', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: [
          { price: 1.5, display: { text: '1,50 €' } },
          {
            price: 5,
            display: { text: '5,00 €', html: '<span class="lowest-price">5,00 €</span>' }
          },
          { price: 50.75, display: { text: '50,75 €' }, notAvailable: true }
        ],
        valueField: 'price',
        textField: 'display.text',
        htmlField: 'display.html',
        disabledField: 'notAvailable'
      }
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('1,50 €')
    expect($options.at(1).text()).toBe('5,00 €')
    expect($options.at(2).text()).toBe('50,75 €')
    expect(
      $options
        .at(0)
        .find('span')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(1)
        .find('span')
        .exists()
    ).toBe(true)
    expect(
      $options
        .at(2)
        .find('span')
        .exists()
    ).toBe(false)
    expect($options.at(0).attributes('value')).toBe('1.5')
    expect($options.at(1).attributes('value')).toBe('5')
    expect($options.at(2).attributes('value')).toBe('50.75')
    expect(
      $options
        .at(0)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(1)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(2)
        .find('[disabled]')
        .exists()
    ).toBe(true)

    wrapper.destroy()
  })

  it('has option group elements with options from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: [
          {
            label: 'group one',
            options: [{ text: 'one', value: 1 }, { text: 'two', value: 2 }]
          },
          {
            label: 'group two',
            options: [{ text: 'three', value: 3 }, { text: 'four', value: 4, disabled: true }]
          }
        ]
      }
    })

    const $groups = wrapper.findAll('optgroup')
    expect($groups.length).toBe(2)
    expect($groups.at(0).attributes('label')).toBe('group one')
    expect($groups.at(1).attributes('label')).toBe('group two')
    expect($groups.at(0).findAll('option').length).toBe(2)
    expect($groups.at(1).findAll('option').length).toBe(2)

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(4)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(3).text()).toBe('four')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')
    expect($options.at(3).attributes('value')).toBe('4')
    expect(
      $options
        .at(0)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(1)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(2)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(3)
        .find('[disabled]')
        .exists()
    ).toBe(true)

    wrapper.destroy()
  })

  it('has option group and option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: [
          { text: 'one', value: 1 },
          {
            label: 'group',
            options: [{ text: 'two', value: 2 }, { text: 'three', value: 3 }]
          },
          { text: 'four', value: 4, disabled: true }
        ]
      }
    })

    const $groups = wrapper.findAll('optgroup')
    expect($groups.length).toBe(1)
    expect($groups.at(0).attributes('label')).toBe('group')
    expect($groups.at(0).findAll('option').length).toBe(2)

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(4)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(3).text()).toBe('four')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')
    expect($options.at(3).attributes('value')).toBe('4')
    expect(
      $options
        .at(0)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(1)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(2)
        .find('[disabled]')
        .exists()
    ).toBe(false)
    expect(
      $options
        .at(3)
        .find('[disabled]')
        .exists()
    ).toBe(true)

    wrapper.destroy()
  })

  it('has option elements from options legacy object format', async () => {
    const spyWarn = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: { one: 1, two: { value: 2, text: 'Two' }, three: 'three' }
      }
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('1')
    expect($options.at(1).text()).toBe('Two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('three')

    expect(spyWarn).toHaveBeenLastCalledWith(
      '[BootstrapVue warn]: BFormSelect - Setting prop "options" to an object is deprecated. Use the array format instead.'
    )

    wrapper.destroy()
  })

  it('has option elements from default slot', async () => {
    const wrapper = mount(BFormSelect, {
      slots: {
        default: [
          '<option value="1">one</option>',
          '<option value="2">two</option>',
          '<option value="3">three</option>'
        ]
      }
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')

    wrapper.destroy()
  })

  it('updates v-model when option selected in single mode', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: ['one', 'two', 'three']
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // select 3rd option
    $options.at(2).setSelected()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toBe('three')
    expect(wrapper.emitted('change')[0][0]).toBe('three')

    wrapper.destroy()
  })

  it('updating v-model (value) when selects correct option', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: ['one', 'two', { text: 'three', value: { three: 3 } }],
        value: 'one'
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect($options.at(0).element.selected).toBe(true)

    // Select 2nd option
    await wrapper.setProps({
      value: 'two'
    })

    expect($options.at(1).element.selected).toBe(true)

    // Select 3rd option
    await wrapper.setProps({
      value: { three: 3 }
    })

    expect($options.at(2).element.selected).toBe(true)

    wrapper.destroy()
  })

  it('updates v-model when option selected in single mode with complex values', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        options: [
          { text: 'one', value: { a: 1 } },
          { text: 'two', value: { b: 2 } },
          { text: 'three', value: { c: 3 } }
        ]
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 3rd option
    $options.at(2).setSelected()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toEqual({ c: 3 })
    expect(wrapper.emitted('change')[0][0]).toEqual({ c: 3 })

    wrapper.destroy()
  })

  it('updates v-model when option selected in multiple mode', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        multiple: true,
        selectSize: 3,
        options: ['one', 'two', 'three'],
        value: []
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 2nd and 3rd option
    $options.at(1).element.selected = true
    $options.at(2).element.selected = true
    await wrapper.trigger('change')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toEqual(['two', 'three'])
    expect(wrapper.emitted('change')[0][0]).toEqual(['two', 'three'])

    wrapper.destroy()
  })

  it('updates v-model when option selected in multiple mode with complex values', async () => {
    const wrapper = mount(BFormSelect, {
      propsData: {
        multiple: true,
        selectSize: 3,
        value: [],
        options: [
          { text: 'one', value: { a: 1 } },
          { text: 'two', value: { b: 2 } },
          { text: 'three', value: { c: 3 } }
        ]
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 2nd and 3rd option
    $options.at(1).element.selected = true
    $options.at(2).element.selected = true
    await wrapper.trigger('change')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toEqual([{ b: 2 }, { c: 3 }])
    expect(wrapper.emitted('change')[0][0]).toEqual([{ b: 2 }, { c: 3 }])

    wrapper.destroy()
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('prop `autofocus`', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
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
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works when true', async () => {
      const wrapper = mount(BFormSelect, {
        attachTo: createContainer(),
        propsData: {
          autofocus: true,
          options: ['a', 'b', 'c']
        }
      })
      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('select')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe(input.element)

      wrapper.destroy()
    })

    it('does not autofocus when false', async () => {
      const wrapper = mount(BFormSelect, {
        attachTo: createContainer(),
        propsData: {
          autofocus: false,
          options: ['a', 'b', 'c']
        }
      })
      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('select')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).not.toBe(input.element)

      wrapper.destroy()
    })
  })
})
