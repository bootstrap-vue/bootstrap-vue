import { mount } from '@vue/test-utils'
import { BListGroup } from './list-group'

describe('list-group', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BListGroup)
    expect(wrapper.is('div')).toBe(true)
  })

  it('default should contain only single class of list-group', async () => {
    const wrapper = mount(BListGroup)
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
  })

  it('should have tag ul then prop tag=ul', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: { tag: 'ul' }
      }
    })
    expect(wrapper.is('ul')).toBe(true)
  })

  it('should have class list-group-flush when prop flush=true', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: { flush: true }
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
  })

  it('should have class list-group-horizontal when prop horizontal=true', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: { horizontal: true }
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-horizontal')
  })

  it('should have class list-group-horizontal-md when prop horizontal=md', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: { horizontal: 'md' }
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-horizontal-md')
  })

  it('should not have class list-group-horizontal when prop horizontal=true and flush=true', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: {
          horizontal: true,
          flush: true
        }
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')
  })

  it('should not have class list-group-horizontal-lg when prop horizontal=lg and flush=true', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        props: {
          horizontal: 'lg',
          flush: true
        }
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-horizontal-lg')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')
  })

  it('should accept custom classes', async () => {
    const wrapper = mount(BListGroup, {
      context: {
        class: 'foobar'
      }
    })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('foobar')
  })
})
