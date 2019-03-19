import ProgressBar from './progress-bar'
import { mount } from '@vue/test-utils'

describe('progress-bar', () => {
  it('has correct base class and structure', async () => {
    const wrapper = mount(ProgressBar)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('progress-bar')
    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
    expect(wrapper.attributes('aria-valuenow')).toBe('0')
    expect(wrapper.attributes('style')).toContain('width: 0%;')

    expect(wrapper.classes()).not.toContain('progress-bar-striped')
    expect(wrapper.classes()).not.toContain('progress-bar-animated')

    // Should not have a label
    expect(wrapper.text()).toBe('')

    wrapper.destroy()
  })

  it('has class bg-primary when variant=primary', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.destroy()
  })

  it('has class progress-bar-striped when prop striped set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        striped: true
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.destroy()
  })

  it('has class progress-bar-striped when prop striped set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        striped: true
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.destroy()
  })

  it('has class progress-bar-animated and progress-bar-striped when prop animated set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        animated: true
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-animated')
    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.destroy()
  })

  it('has style width set when value set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 50
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('50')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')

    wrapper.destroy()
  })

  it('has max set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 25,
        max: 50
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('25')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('50')

    wrapper.destroy()
  })

  it('has min set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 75,
        min: 50
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('75')
    expect(wrapper.attributes('aria-valuemin')).toBe('50')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')

    wrapper.destroy()
  })

  it('has label when prop label set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        label: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has label when prop labelHtml set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        labelHtml: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has label from default slot', async () => {
    const wrapper = mount(ProgressBar, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has label when show-value set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 50
      }
    })

    expect(wrapper.text()).toBe('50')

    wrapper.destroy()
  })

  it('has label with precision when show-value and precision set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 50,
        precision: 2
      }
    })

    expect(wrapper.text()).toBe('50.00')

    wrapper.destroy()
  })

  it('has label when show-progress set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 25,
        max: 50
      }
    })

    expect(wrapper.text()).toBe('50')

    wrapper.destroy()
  })

  it('has label when show-progress and precision set', async () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        value: 25,
        max: 50,
        precision: 2
      }
    })

    expect(wrapper.text()).toBe('50.00')

    wrapper.destroy()
  })
})
