import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import BFormFile from './form-file'

describe('form-file', () => {
  it('default has expected structure, classes and attributes', async () => {
    const wrapper = mount(BFormFile, {
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
    expect(input.attributes('disabled')).not.toBeDefined()
    expect(input.attributes('required')).not.toBeDefined()
    expect(input.attributes('aria-required')).not.toBeDefined()
    expect(input.attributes('capture')).not.toBeDefined()
    expect(input.attributes('accept')).not.toBeDefined()
    expect(input.attributes('name')).not.toBeDefined()

    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes()).toContain('custom-file-label')
    expect(label.attributes('for')).toBeDefined()
    expect(label.attributes('for')).toBe('foo')

    wrapper.destroy()
  })

  it('default has input attribute multiple when multiple=true', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('multiple')).toBeDefined()

    wrapper.destroy()
  })

  it('default has input attribute required when required=true', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        required: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('aria-required')).toBeDefined()
    expect(input.attributes('aria-required')).toBe('true')

    wrapper.destroy()
  })

  it('default has input attribute disabled when disabled=true', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        disabled: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('default has input attribute capture when capture=true', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        capture: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('capture')).toBeDefined()

    wrapper.destroy()
  })

  it('default has input attribute accept when accept is set', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        accept: 'image/*'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('accept')).toBeDefined()
    expect(input.attributes('accept')).toBe('image/*')

    wrapper.destroy()
  })

  it('default has input attribute name when name is set', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        name: 'bar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBeDefined()
    expect(input.attributes('name')).toBe('bar')

    wrapper.destroy()
  })

  it('default has input attribute form when form is set', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        form: 'bar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).toBeDefined()
    expect(input.attributes('form')).toBe('bar')

    wrapper.destroy()
  })

  it('default has class focus when input focused', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo'
      }
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()

    expect(input.classes()).not.toContain('focus')

    input.trigger('focusin')
    await waitNT(wrapper.vm)
    expect(input.classes()).toContain('focus')

    input.trigger('focusout')
    await waitNT(wrapper.vm)
    expect(input.classes()).not.toContain('focus')

    wrapper.destroy()
  })

  it('has no wrapper div or label when plain=true', async () => {
    const wrapper = mount(BFormFile, {
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

    wrapper.destroy()
  })

  it('emits input event when file changed', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo'
      }
    })
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file)

    // Setting to same array of files should not emit event
    wrapper.vm.setFiles([file])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)

    wrapper.destroy()
  })

  it('emits input event when files changed in multiple mode', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const file2 = new File(['foobar'], 'foobar.txt', {
      type: 'text/plain',
      lastModified: Date.now() - 1000
    })
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    // Setting to same array of files should not emit event
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)

    // Setting to new array of same files should not emit event
    wrapper.vm.setFiles([file1, file2])
    expect(wrapper.emitted('input').length).toEqual(1)

    // Setting to array of new files should emit event
    wrapper.vm.setFiles(files.slice().reverse())
    expect(wrapper.emitted('input').length).toEqual(2)

    wrapper.destroy()
  })

  it('native change event works', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo'
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    const input = wrapper.find('input')
    input.element.value = ''
    input.trigger('change')
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)

    wrapper.destroy()
  })

  it('reset() method works in single mode', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        multiple: false
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const files = [file1]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    wrapper.vm.reset()
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)

    wrapper.destroy()
  })

  it('reset() method works in multiple mode', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const file2 = new File(['<html><body></body></html>'], 'bar.html', {
      type: 'text/html',
      lastModified: Date.now() - 500
    })
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    wrapper.vm.reset()
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual([])

    wrapper.destroy()
  })

  it('reset works in single mode by setting value', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        value: ''
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    wrapper.setProps({ value: null })
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)

    wrapper.destroy()
  })

  it('reset works in multiple mode by setting value', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        value: [],
        multiple: true
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const file2 = new File(['foo bar'], 'foobar.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const files = [file1, file2]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(files)

    wrapper.setProps({ value: null })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual([])

    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input').length).toEqual(3)
    expect(wrapper.emitted('input')[2][0]).toEqual(files)

    wrapper.setProps({ value: [] })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input').length).toEqual(4)
    expect(wrapper.emitted('input')[3][0]).toEqual([])

    wrapper.destroy()
  })

  it('native reset event works', async () => {
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        value: null
      }
    })
    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file1)

    wrapper.find('input').trigger('reset')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(null)

    wrapper.destroy()
  })

  it('file-name-formatter works', async () => {
    let called = false
    let filesIsArray = false
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo',
        fileNameFormatter: files => {
          called = true
          filesIsArray = Array.isArray(files)
          return 'foobar'
        }
      }
    })
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file)

    // Formatter should have been called, and passed an array
    expect(called).toBe(true)
    expect(filesIsArray).toBe(true)
    // Should have our custom formatted "filename"
    expect(wrapper.find('label').text()).toContain('foobar')

    wrapper.destroy()
  })

  it('file-name slot works', async () => {
    let slotScope = null
    const wrapper = mount(BFormFile, {
      propsData: {
        id: 'foo'
      },
      scopedSlots: {
        'file-name': scope => {
          slotScope = scope
          return 'foobar'
        }
      }
    })
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(file)

    // Scoped slot should have been called, with expected scope
    expect(slotScope).toEqual({ files: [file], names: [file.name] })
    // Should have our custom formatted "filename"
    expect(wrapper.find('label').text()).toContain('foobar')

    wrapper.destroy()
  })
})
