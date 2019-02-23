import Input from './form-file'
import { mount } from '@vue/test-utils'

describe('form-file', async () => {
  it('default has expected structure, classes and attributes', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('custom-file')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foo__BV_file_outer_')

    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).toContain('custom-file-input')
    expect(input.attributes('type')).toBeDefined()
    expect(input.attributes('type')).toBe('file')
    expect(input.attributes('id')).toBeDefined()
    expect(input.attributes('id')).toBe('foo')
    expect(input.attributes('multiple')).not.toBeDefined()

    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes()).toContain('custom-file-label')
    expect(label.attributes('for')).toBeDefined()
    expect(label.attributes('for')).toBe('foo')
  })

  it('default has input attribute multiple when multiple=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('multiple')).toBeDefined()
  })

  it('default has class focus when input focused', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo'
      }
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()

    expect(input.classes()).not.toContain('focus')

    input.trigger('focusin')
    await wrapper.vm.$nextTick()
    expect(input.classes()).toContain('focus')

    input.trigger('focusout')
    await wrapper.vm.$nextTick()
    expect(input.classes()).not.toContain('focus')
  })

  it('has no wrapper div or label when plain=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        plain: true
      }
    })
    expect(wrapper.is('input')).toBe(true)
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('file')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foo')
    expect(wrapper.attributes('multiple')).not.toBeDefined()
  })

  it('emits input event when file changed', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo'
      }
    })
    const file = new File(['foo'], 'foo.txt')

    // Emulate the files array
    wrapper.vm.setFiles([file])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file)
  })

  it('emits input event when files changed in multiple mode', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt')
    const file2 = new File(['bar'], 'bar.txt')
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    // Setting to array of same files should not emit event
    wrapper.vm.setFiles([file1, file2])
    expect(wrapper.emitted('input').length).toEqual(1)

    // Setting to array of new files should emit event
    wrapper.vm.setFiles(files.slice().reverse())
    expect(wrapper.emitted('input').length).toEqual(2)
  })

  it('reset() method works', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt')
    const file2 = new File(['bar'], 'bar.txt')
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    wrapper.vm.reset()
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual([])
  })

  it('reset works in single mode by setting value', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        value: ''
      }
    })
    const file1 = new File(['foo'], 'foo.txt')

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    wrapper.setProps({ value: null })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)
  })

  it('reset works in multiple mode by setting value', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo',
        value: '',
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt')
    const file2 = new File(['bar'], 'bar.txt')
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    wrapper.setProps({ value: null })
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual([])

    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input').length).toEqual(3)
    expect(wrapper.emitted('input')[2][0]).toEqual(files)

    wrapper.setProps({ value: [] })
    expect(wrapper.emitted('input').length).toEqual(4)
    expect(wrapper.emitted('input')[3][0]).toEqual([])
  })

  it('native reset event works', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foo'
      }
    })
    const file1 = new File(['foo'], 'foo.txt')

    // Emulate the files array
    wrapper.vm.setFiles(file1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    wrapper.find('input').trigger('reset')
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)
  })
})
