import { mount } from '@vue/test-utils'
import { BJumbotron } from './jumbotron'

describe('jumbotron', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BJumbotron)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders with custom root element when props tag is set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        tag: 'article'
      }
    })

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('has border when prop border-variant is set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        borderVariant: 'danger'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-danger')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has background variant when prop bg-variant is set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        bgVariant: 'info'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has text variant when prop text-variant is set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        textVariant: 'primary'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BJumbotron, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.findAll('.jumbotron > *').length).toBe(0)
  })

  it('renders default slot content inside container when fluid prop set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        fluid: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('jumbotron-fluid')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('.jumbotron > *').length).toBe(1)
    expect(wrapper.findAll('.container').length).toBe(1)
    expect(wrapper.find('.container').is('div')).toBe(true)
    expect(wrapper.find('.container').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')
  })

  it('renders default slot content inside container-fluid when fluid prop and container-fluid set', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        fluid: true,
        containerFluid: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('jumbotron-fluid')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('.jumbotron > *').length).toBe(1)
    expect(wrapper.findAll('.container').length).toBe(0)
    expect(wrapper.findAll('.container-fluid').length).toBe(1)
    expect(wrapper.find('.container-fluid').is('div')).toBe(true)
    expect(wrapper.find('.container-fluid').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')
  })

  it('renders header lead and content when using props', async () => {
    const wrapper = mount(BJumbotron, {
      propsData: {
        header: 'foo',
        lead: 'bar'
      },
      slots: {
        default: '<span>baz</span>'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.find('h1').classes()).toContain('display-3')
    expect(wrapper.find('h1').classes().length).toBe(1)
    expect(wrapper.find('h1').text()).toEqual('foo')
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.find('p').classes()).toContain('lead')
    expect(wrapper.find('p').classes().length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('bar')
    expect(wrapper.findAll('span').length).toBe(1)
    expect(wrapper.find('span').text()).toEqual('baz')
    expect(wrapper.find('.jumbotron > h1 + p + span').exists()).toBe(true)
  })

  it('renders header lead and content when using slots', async () => {
    const wrapper = mount(BJumbotron, {
      slots: {
        header: 'foo',
        lead: 'bar',
        default: '<span>baz</span>'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.find('h1').classes()).toContain('display-3')
    expect(wrapper.find('h1').classes().length).toBe(1)
    expect(wrapper.find('h1').text()).toEqual('foo')
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.find('p').classes()).toContain('lead')
    expect(wrapper.find('p').classes().length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('bar')
    expect(wrapper.findAll('span').length).toBe(1)
    expect(wrapper.find('span').text()).toEqual('baz')
    expect(wrapper.find('.jumbotron > h1 + p + span').exists()).toBe(true)
  })
})
