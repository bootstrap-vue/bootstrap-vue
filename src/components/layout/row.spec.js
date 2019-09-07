import { mount } from '@vue/test-utils'
import { BRow } from './row'

describe('layout > row', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BRow)

    expect(wrapper.is('div')).toBe(true)
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

    expect(wrapper.is('p')).toBe(true)
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

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('has class no-guttens when prop no-gutters is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        noGutters: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('no-gutters')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has vertial align class when prop align-v is set', async () => {
    const wrapper = mount(BRow, {
      propsData: {
        alignV: 'baseline'
      }
    })

    expect(wrapper.is('div')).toBe(true)
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

    expect(wrapper.is('div')).toBe(true)
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

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('align-content-stretch')
    expect(wrapper.classes().length).toBe(2)
  })
})
