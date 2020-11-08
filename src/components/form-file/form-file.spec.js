import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { EVENT_NAME_MODEL_VALUE } from '../../constants/events'
import { PROP_NAME_MODEL_VALUE } from '../../constants/props'
import { BFormFile } from './form-file'

describe('form-file', () => {
  it('default has expected structure, classes and attributes', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('custom-file')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foo__BV_file_outer_')

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).toContain('custom-file-input')
    expect($input.attributes('type')).toBeDefined()
    expect($input.attributes('type')).toBe('file')
    expect($input.attributes('id')).toBeDefined()
    expect($input.attributes('id')).toBe('foo')
    expect($input.attributes('multiple')).not.toBeDefined()
    expect($input.attributes('disabled')).not.toBeDefined()
    expect($input.attributes('required')).not.toBeDefined()
    expect($input.attributes('aria-required')).not.toBeDefined()
    expect($input.attributes('capture')).not.toBeDefined()
    expect($input.attributes('accept')).not.toBeDefined()
    expect($input.attributes('name')).not.toBeDefined()

    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes()).toContain('custom-file-label')
    expect(label.attributes('for')).toBeDefined()
    expect(label.attributes('for')).toBe('foo')

    wrapper.unmount()
  })

  it('default has input attribute multiple when multiple=true', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        multiple: true
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('multiple')).toBeDefined()

    wrapper.unmount()
  })

  it('default has input attribute required when required=true', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        required: true
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('required')).toBeDefined()
    expect($input.attributes('aria-required')).toBeDefined()
    expect($input.attributes('aria-required')).toBe('true')

    wrapper.unmount()
  })

  it('default has input attribute disabled when disabled=true', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        disabled: true
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  it('default has input attribute capture when capture=true', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        capture: true
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('capture')).toBeDefined()

    wrapper.unmount()
  })

  it('default has input attribute accept when accept is set', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        accept: 'image/*'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('accept')).toBeDefined()
    expect($input.attributes('accept')).toBe('image/*')

    wrapper.unmount()
  })

  it('default has input attribute name when name is set', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        name: 'bar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('name')).toBeDefined()
    expect($input.attributes('name')).toBe('bar')

    wrapper.unmount()
  })

  it('default has input attribute form when form is set', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        form: 'bar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('form')).toBeDefined()
    expect($input.attributes('form')).toBe('bar')

    wrapper.unmount()
  })

  it('default has custom attributes transferred input element', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        foo: 'bar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('foo')).toBeDefined()
    expect($input.attributes('foo')).toEqual('bar')

    wrapper.unmount()
  })

  it('default has class focus when input focused', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).not.toContain('focus')

    await $input.trigger('focusin')
    expect($input.classes()).toContain('focus')

    await $input.trigger('focusout')
    expect($input.classes()).not.toContain('focus')

    wrapper.unmount()
  })

  it('has no wrapper div or label when plain=true', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        plain: true
      }
    })

    expect(wrapper.element.tagName).toBe('INPUT')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('file')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foo')
    expect(wrapper.attributes('multiple')).not.toBeDefined()

    wrapper.unmount()
  })

  it('emits input event when file changed', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo'
      }
    })

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file)

    // Setting to same array of files should not emit event
    wrapper.vm.setFiles([file])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    wrapper.unmount()
  })

  it('emits input event when files changed in multiple mode', async () => {
    const wrapper = mount(BFormFile, {
      props: {
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
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(files)

    // Setting to same array of files should not emit event
    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    // Setting to new array of same files should not emit event
    wrapper.vm.setFiles([file1, file2])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    // Setting to array of new files should emit event
    wrapper.vm.setFiles(files.slice().reverse())
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(files.slice().reverse())

    wrapper.unmount()
  })

  it('emits input event when files changed in directory mode', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        multiple: true,
        directory: true
      }
    })

    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const file2 = new File(['bar'], 'bar.txt', {
      type: 'text/plain',
      lastModified: Date.now() - 1000
    })
    const file3 = new File(['baz'], 'baz.txt', {
      type: 'text/plain',
      lastModified: Date.now() - 2000
    })
    const files = [[file1, file2], file3]

    // Emulate the files array
    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(files)

    // Setting to same array of files should not emit event
    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    // Setting to new array of same files should not emit event
    wrapper.vm.setFiles([[file1, file2], file3])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    // Setting to array of new files should emit event
    wrapper.vm.setFiles(files.slice().reverse())
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(files.slice().reverse())

    wrapper.unmount()
  })

  it('emits flat files array when `no-traverse` prop set', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        multiple: true,
        directory: true,
        noTraverse: true
      }
    })

    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })
    const file2 = new File(['bar'], 'bar.txt', {
      type: 'text/plain',
      lastModified: Date.now() - 1000
    })
    const file3 = new File(['baz'], 'baz.txt', {
      type: 'text/plain',
      lastModified: Date.now() - 2000
    })
    const files = [[file1, file2], file3]

    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual([file1, file2, file3])

    wrapper.unmount()
  })

  it('native change event works', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo'
      }
    })

    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file1)

    const $input = wrapper.find('input')
    $input.element.value = ''
    await $input.trigger('change')
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(null)

    wrapper.unmount()
  })

  it('reset() method works in single mode', async () => {
    const wrapper = mount(BFormFile, {
      props: {
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
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file1)

    wrapper.vm.reset()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(null)

    wrapper.unmount()
  })

  it('reset() method works in multiple mode', async () => {
    const wrapper = mount(BFormFile, {
      props: {
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
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(files)

    wrapper.vm.reset()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual([])

    wrapper.unmount()
  })

  it('reset works in single mode by setting value', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        [PROP_NAME_MODEL_VALUE]: null
      }
    })

    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file1)

    await wrapper.setProps({ [PROP_NAME_MODEL_VALUE]: null })
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)

    wrapper.unmount()
  })

  it('reset works in multiple mode by setting value', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        [PROP_NAME_MODEL_VALUE]: [],
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
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(files)

    await wrapper.setProps({ [PROP_NAME_MODEL_VALUE]: null })
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual([])

    wrapper.vm.setFiles(files)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(3)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[2][0]).toEqual(files)

    await wrapper.setProps({ [PROP_NAME_MODEL_VALUE]: [] })
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(4)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[3][0]).toEqual([])

    wrapper.unmount()
  })

  it('native reset event works', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        [PROP_NAME_MODEL_VALUE]: null
      }
    })

    const file1 = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file1])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file1)

    await wrapper.find('input').trigger('reset')
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(null)

    wrapper.unmount()
  })

  it('form native reset event triggers BFormFile reset', async () => {
    const App = {
      render() {
        return h('form', {}, [h(BFormFile, { id: 'foo' })])
      }
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    expect(wrapper.element.tagName).toBe('FORM')
    const formFile = wrapper.findComponent(BFormFile)
    expect(formFile.exists()).toBe(true)

    // Emulate the files array
    formFile.vm.setFiles([file])
    await waitNT(wrapper.vm)
    expect(formFile.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(formFile.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(formFile.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file)

    // Trigger form's native reset event
    wrapper.find('form').trigger('reset')
    await waitNT(wrapper.vm)
    expect(formFile.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(2)
    expect(formFile.emitted(EVENT_NAME_MODEL_VALUE)[1][0]).toEqual(null)

    wrapper.unmount()
  })

  it('file-name-formatter works', async () => {
    let called = false
    let filesArray = null
    let filesTraversedArray = null
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        fileNameFormatter: (files, filesTraversed) => {
          called = true
          filesArray = files
          filesTraversedArray = filesTraversed
          return 'some files'
        }
      }
    })
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    // Emulate the files array
    wrapper.vm.setFiles([file])
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file)

    // Formatter should have been called, and passed two arrays
    expect(called).toBe(true)
    expect(Array.isArray(filesArray)).toBe(true)
    expect(filesArray).toEqual([file])
    expect(Array.isArray(filesTraversedArray)).toBe(true)
    expect(filesTraversedArray).toEqual([file])
    // Should have our custom formatted "filename"
    expect(wrapper.find('label').text()).toContain('some files')

    wrapper.unmount()
  })

  it('file-name slot works', async () => {
    let slotScope = null
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo'
      },
      slots: {
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
    await waitNT(wrapper.vm)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)).toBeDefined()
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE).length).toEqual(1)
    expect(wrapper.emitted(EVENT_NAME_MODEL_VALUE)[0][0]).toEqual(file)

    // Scoped slot should have been called, with expected scope
    expect(slotScope).toEqual({ files: [file], filesTraversed: [file], names: [file.name] })
    // Should have our custom formatted "filename"
    expect(wrapper.find('label').text()).toContain('foobar')

    wrapper.unmount()
  })

  it('drag placeholder and drop works', async () => {
    const wrapper = mount(BFormFile, {
      props: {
        id: 'foo',
        placeholder: 'PLACEHOLDER',
        dropPlaceholder: 'DROP_HERE',
        noDropPlaceholder: 'NO_DROP_HERE',
        noDrop: true
      }
    })

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    expect(wrapper.vm).toBeDefined()
    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')

    await wrapper.trigger('dragenter')
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')

    await wrapper.trigger('dragover')
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')

    await wrapper.trigger('drop', {
      dataTransfer: {
        files: [file]
      }
    })
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')
    expect($label.text()).not.toContain(file.name)

    await wrapper.setProps({ noDrop: false })
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')

    await wrapper.trigger('dragenter')
    expect($label.text()).not.toContain('PLACEHOLDER')
    expect($label.text()).toContain('NO_DROP_HERE')

    await wrapper.trigger('dragover')
    expect($label.text()).not.toContain('PLACEHOLDER')
    expect($label.text()).toContain('NO_DROP_HERE')

    await wrapper.trigger('dragleave')
    expect($label.text()).toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')

    await wrapper.trigger('dragover')
    expect($label.text()).not.toContain('PLACEHOLDER')
    expect($label.text()).toContain('DROP_HERE')

    await wrapper.trigger('drop', {
      dataTransfer: {
        files: [file]
      }
    })
    await waitNT(wrapper.vm)
    expect($label.text()).not.toContain('PLACEHOLDER')
    expect($label.text()).not.toContain('DROP_HERE')
    expect($label.text()).toContain(file.name)

    wrapper.unmount()
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
      const wrapper = mount(BFormFile, {
        attachTo: createContainer(),
        props: {
          autofocus: true
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $input = wrapper.find('input')
      expect($input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe($input.element)

      wrapper.unmount()
    })
  })

  describe('accept methods', () => {
    // Faked files (needs name and type properties only)
    const fileText = { name: 'file.txt', type: 'text/plain' }
    const fileHtml = { name: 'file.html', type: 'text/html' }
    const fileJson = { name: 'file.json', type: 'application/json' }
    const filePng = { name: 'file.png', type: 'image/png' }

    it('isFileValid() works with accept not set', async () => {
      const wrapper = mount(BFormFile)

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(true)
      expect(vm.isFileValid(fileJson)).toBe(true)
      expect(vm.isFileValid(filePng)).toBe(true)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to single extension', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: '.txt'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(false)
      expect(vm.isFileValid(fileJson)).toBe(false)
      expect(vm.isFileValid(filePng)).toBe(false)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to multiple extensions', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: '.txt,.html, .png'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(true)
      expect(vm.isFileValid(fileJson)).toBe(false)
      expect(vm.isFileValid(filePng)).toBe(true)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to single mime type', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: 'text/plain'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(false)
      expect(vm.isFileValid(fileJson)).toBe(false)
      expect(vm.isFileValid(filePng)).toBe(false)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to single wildcard mime type', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: 'text/*'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(true)
      expect(vm.isFileValid(fileJson)).toBe(false)
      expect(vm.isFileValid(filePng)).toBe(false)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to multiple mime types', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: 'text/*, application/json'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(true)
      expect(vm.isFileValid(fileHtml)).toBe(true)
      expect(vm.isFileValid(fileJson)).toBe(true)
      expect(vm.isFileValid(filePng)).toBe(false)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })

    it('isFileValid() works with accept set to mime and extension', async () => {
      const wrapper = mount(BFormFile, {
        props: {
          accept: '.png, application/json'
        }
      })

      const vm = wrapper.vm
      expect(vm.isFileValid(fileText)).toBe(false)
      expect(vm.isFileValid(fileHtml)).toBe(false)
      expect(vm.isFileValid(fileJson)).toBe(true)
      expect(vm.isFileValid(filePng)).toBe(true)
      expect(vm.isFileValid()).toBe(false)

      wrapper.unmount()
    })
  })
})
