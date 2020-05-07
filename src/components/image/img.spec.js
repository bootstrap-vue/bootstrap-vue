import { mount } from '@vue/test-utils'
import { BImg } from './img'

describe('img', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BImg)

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('width')).not.toBeDefined()
    expect(wrapper.attributes('height')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has src attribute when prop src is set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toEqual('/foo/bar')
    expect(wrapper.attributes('width')).not.toBeDefined()
    expect(wrapper.attributes('height')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should have class "img-fluid" when prop fluid set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        fluid: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('img-fluid')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have class "img-fluid" and "w-100" when prop fluid-grow set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        fluidGrow: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('img-fluid')
    expect(wrapper.classes()).toContain('w-100')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('should have class "img-thumbnail" when prop thumbnail set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        thumbnail: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('img-thumbnail')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have class "rounded" when prop rounded true', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        rounded: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('rounded')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have class "rounded-circle" when prop rounded=circle', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        rounded: 'circle'
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('rounded-circle')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have class "float-left" when prop left set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        left: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('float-left')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have class "float-right" when prop right set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        right: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('float-right')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should have classes "mx-auto" and "d-block" when prop center set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        center: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('mx-auto')
    expect(wrapper.classes()).toContain('d-block')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has data URI when blank is true', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        blank: true
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')
    expect(wrapper.attributes('width')).toBe('1')
    expect(wrapper.attributes('height')).toBe('1')

    wrapper.destroy()
  })

  it('has color when blank is true and blank-color set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        blank: true,
        blankColor: 'blue'
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')
    expect(wrapper.attributes('src')).toContain('blue')

    wrapper.destroy()
  })

  it('has width and height when blank is true and width/height props set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        blank: true,
        width: 300,
        height: 200
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')
    expect(wrapper.attributes('width')).toBe('300')
    expect(wrapper.attributes('height')).toBe('200')

    wrapper.destroy()
  })

  it('has width and height when src set and width/height props set', async () => {
    const wrapper = mount(BImg, {
      propsData: {
        src: '/foo/bar',
        width: 300,
        height: 200
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toEqual('/foo/bar')
    expect(wrapper.attributes('width')).toBe('300')
    expect(wrapper.attributes('height')).toBe('200')

    wrapper.destroy()
  })
})
