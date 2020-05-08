import { mount } from '@vue/test-utils'
import { BRow } from './row'

describe('layout > row', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BRow)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        tag: 'p'
      }
    })

    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BRow, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('has class no-gutters when prop no-gutters is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        noGutters: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('no-gutters')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has vertical align class when prop align-v is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        alignV: 'baseline'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('align-items-baseline')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has horizontal align class when prop align-h is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        alignH: 'center'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has content align class when prop align-content is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        alignContent: 'stretch'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('align-content-stretch')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class row-cols-6 when prop cols is set to 6', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        cols: 6
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('row-cols-6')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class row-cols-md-3 when prop cols-md is set to 3', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        colsMd: '3'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('row-cols-md-3')
    expect(wrapper.classes().length).toBe(2)
  })

  it('all cols-* props work', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        cols: 1,
        colsSm: 2,
        colsMd: 3,
        colsLg: 4,
        colsXl: 5
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('row-cols-1')
    expect(wrapper.classes()).toContain('row-cols-sm-2')
    expect(wrapper.classes()).toContain('row-cols-md-3')
    expect(wrapper.classes()).toContain('row-cols-lg-4')
    expect(wrapper.classes()).toContain('row-cols-xl-5')
    expect(wrapper.classes().length).toBe(6)
  })
})
