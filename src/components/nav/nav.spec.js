import { mount } from '@vue/test-utils'
import { BNav } from './nav'

describe('nav', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNav)

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BNav, {
      props: {
        tag: 'ol'
      }
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNav, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('applies pill style', async () => {
    const wrapper = mount(BNav, {
      props: {
        pills: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-pills')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies tab style', async () => {
    const wrapper = mount(BNav, {
      props: {
        tabs: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-tabs')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies vertical style', async () => {
    const wrapper = mount(BNav, {
      props: {
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies justify style when justified', async () => {
    const wrapper = mount(BNav, {
      props: {
        justified: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-justified')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it("doesn't apply justify style when vertical", async () => {
    const wrapper = mount(BNav, {
      props: {
        justified: true,
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies fill style style when fill set', async () => {
    const wrapper = mount(BNav, {
      props: {
        fill: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-fill')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it("doesn't apply fill style when vertical", async () => {
    const wrapper = mount(BNav, {
      props: {
        fill: true,
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies alignment correctly', async () => {
    const wrapper = mount(BNav, {
      props: {
        align: 'center'
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it("doesn't apply alignment when vertical", async () => {
    const wrapper = mount(BNav, {
      props: {
        align: 'center',
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies small style', async () => {
    const wrapper = mount(BNav, {
      props: {
        small: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies card-header-tabs class when tabs and card-header props set', async () => {
    const wrapper = mount(BNav, {
      props: {
        tabs: true,
        cardHeader: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-tabs')
    expect(wrapper.classes()).toContain('card-header-tabs')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('applies card-header-pills class when pills and card-header props set', async () => {
    const wrapper = mount(BNav, {
      props: {
        pills: true,
        cardHeader: true
      }
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-pills')
    expect(wrapper.classes()).toContain('card-header-pills')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })
})
