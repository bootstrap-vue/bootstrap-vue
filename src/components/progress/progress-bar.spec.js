import { mount } from '@vue/test-utils'
import { BProgressBar } from './progress-bar'

describe('progress-bar', () => {
  it('has correct base class and structure', async () => {
    const wrapper = mount(BProgressBar)

    expect(wrapper.element.tagName).toBe('DIV')
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

    wrapper.unmount()
  })

  it('has class bg-primary when variant=primary', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has class bg-info when parent variant=info', async () => {
    const wrapper = mount(BProgressBar, {
      provide: {
        bvProgress: {
          variant: 'info'
        }
      }
    })

    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has class bg-primary when prop variant=primary and parent variant=info', async () => {
    const wrapper = mount(BProgressBar, {
      provide: {
        bvProgress: {
          variant: 'info'
        }
      },
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })
  it('has class progress-bar-striped when prop striped set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        striped: true
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has class progress-bar-striped when parent prop striped set', async () => {
    const wrapper = mount(BProgressBar, {
      provide: {
        bvProgress: {
          striped: true
        }
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has class progress-bar-animated and progress-bar-striped when prop animated set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        animated: true
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-animated')
    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has class progress-bar-animated and progress-bar-striped when parent prop animated set', async () => {
    const wrapper = mount(BProgressBar, {
      provide: {
        bvProgress: {
          animated: true
        }
      }
    })

    expect(wrapper.classes()).toContain('progress-bar-animated')
    expect(wrapper.classes()).toContain('progress-bar-striped')
    expect(wrapper.classes()).toContain('progress-bar')

    wrapper.unmount()
  })

  it('has style width set when value set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 50
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('50')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')

    wrapper.unmount()
  })

  it('has max set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 25,
        max: 50
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('25')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('50')

    wrapper.unmount()
  })

  it('has max set when parent max set', async () => {
    const wrapper = mount(BProgressBar, {
      provide: {
        bvProgress: {
          max: 50
        }
      },
      props: {
        value: 25
      }
    })

    expect(wrapper.attributes('style')).toContain('width: 50%;')
    expect(wrapper.attributes('aria-valuenow')).toBe('25')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('50')

    wrapper.unmount()
  })

  it('has label when prop label set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        label: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has label when prop labelHtml set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        labelHtml: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has label from default slot', async () => {
    const wrapper = mount(BProgressBar, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has label when show-value set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 50,
        showValue: true
      }
    })

    expect(wrapper.text()).toBe('50')

    wrapper.unmount()
  })

  it('has label with precision when show-value and precision set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 50,
        showValue: true,
        precision: 2
      }
    })

    expect(wrapper.text()).toBe('50.00')

    wrapper.unmount()
  })

  it('has label when show-progress set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 25,
        showProgress: true,
        max: 50
      }
    })

    expect(wrapper.text()).toBe('50')

    wrapper.unmount()
  })

  it('has label when show-progress and precision set', async () => {
    const wrapper = mount(BProgressBar, {
      props: {
        value: 25,
        showProgress: true,
        max: 50,
        precision: 2
      }
    })

    expect(wrapper.text()).toBe('50.00')

    wrapper.unmount()
  })
})
