import Modal from './modal'
import { mount } from '@vue/test-utils'

describe('modal > default button content, classes and attributes', () => {
  it('footer ok and cancel buttons', async () => {
    const wrapper = mount(Modal)
    expect(wrapper).toBeDefined()

    const $buttons = wrapper.findAll('footer button')
    expect($buttons.length).toBe(2)

    // Cancel button (left-most button)
    const $cancel = $buttons.at(0)
    expect($cancel.attributes('type')).toBe('button')
    expect($cancel.classes()).toContain('btn')
    expect($cancel.classes()).toContain('btn-secondary')
    expect($cancel.text()).toContain('Cancel')

    // OK button (right-most button)
    const $ok = $buttons.at(1)
    expect($ok.attributes('type')).toBe('button')
    expect($ok.classes()).toContain('btn')
    expect($ok.classes()).toContain('btn-primary')
    expect($ok.text()).toContain('OK')

    wrapper.destroy()
  })

  it('header close button', async () => {
    const wrapper = mount(Modal)
    expect(wrapper).toBeDefined()

    const $buttons = wrapper.findAll('header button')
    expect($buttons.length).toBe(1)

    // Close button
    const $close = $buttons.at(0)
    expect($close.attributes('type')).toBe('button')
    expect($close.attributes('aria-label')).toBe('Close')
    expect($close.classes()).toContain('close')
  })
})
