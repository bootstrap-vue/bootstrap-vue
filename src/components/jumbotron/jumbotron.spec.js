import { mount } from '@vue/test-utils'
import { BJumbotron } from './jumbotron'

describe('jumbotron', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BJumbotron)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders with custom root element when prop "tag" is set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        tag: 'article'
      }
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has border when prop "border-variant" is set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        borderVariant: 'danger'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-danger')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has background variant when prop "bg-variant" is set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        bgVariant: 'info'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has text variant when prop "text-variant" is set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        textVariant: 'primary'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BJumbotron, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.findAll('.jumbotron > *').length).toBe(0)

    wrapper.unmount()
  })

  it('renders default slot content inside container when "fluid" prop set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        fluid: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('jumbotron-fluid')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('.jumbotron > *').length).toBe(1)
    expect(wrapper.findAll('.container').length).toBe(1)
    expect(wrapper.find('.container').element.tagName).toBe('DIV')
    expect(wrapper.find('.container').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('renders default slot content inside ".container-fluid" when props "fluid" and "container-fluid" set', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        fluid: true,
        containerFluid: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes()).toContain('jumbotron-fluid')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('.jumbotron > *').length).toBe(1)
    expect(wrapper.findAll('.container').length).toBe(0)
    expect(wrapper.findAll('.container-fluid').length).toBe(1)
    expect(wrapper.find('.container-fluid').element.tagName).toBe('DIV')
    expect(wrapper.find('.container-fluid').text()).toEqual('foobar')
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('renders header and lead content by props', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        header: 'foo',
        lead: 'bar'
      },
      slots: {
        default: '<span>baz</span>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.findAll('span').length).toBe(1)
    expect(wrapper.find('.jumbotron > h1 + p + span').exists()).toBe(true)

    const $header = wrapper.find('h1')
    expect($header.classes()).toContain('display-3')
    expect($header.classes().length).toBe(1)
    expect($header.text()).toEqual('foo')

    const $lead = wrapper.find('p')
    expect($lead.classes()).toContain('lead')
    expect($lead.classes().length).toBe(1)
    expect($lead.text()).toEqual('bar')

    expect(wrapper.find('span').text()).toEqual('baz')

    wrapper.unmount()
  })

  it('renders header and lead content by html props', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        // We also pass non-html props to ensure html props have precedence
        header: 'foo',
        headerHtml: '<strong>baz</strong>',
        lead: 'bar',
        leadHtml: '<strong>bat</strong>'
      },
      slots: {
        default: '<span>baz</span>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.findAll('span').length).toBe(1)
    expect(wrapper.find('.jumbotron > h1 + p + span').exists()).toBe(true)

    const $header = wrapper.find('h1')
    expect($header.classes()).toContain('display-3')
    expect($header.classes().length).toBe(1)
    expect($header.find('strong').exists()).toBe(true)
    expect($header.text()).toEqual('baz')

    const $lead = wrapper.find('p')
    expect($lead.classes()).toContain('lead')
    expect($lead.classes().length).toBe(1)
    expect($lead.find('strong').exists()).toBe(true)
    expect($lead.text()).toEqual('bat')

    expect(wrapper.find('span').text()).toEqual('baz')

    wrapper.unmount()
  })

  it('renders header and lead content by slots', async () => {
    const wrapper = mount(BJumbotron, {
      props: {
        // We also pass as props to ensure slots have precedence
        header: 'foo',
        headerHtml: '<strong>baz</strong>',
        lead: 'bar',
        leadHtml: '<strong>bat</strong>'
      },
      slots: {
        default: '<span>baz</span>',
        header: '<small>foo</small>',
        lead: '<small>bar</small>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('jumbotron')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.findAll('span').length).toBe(1)
    expect(wrapper.find('.jumbotron > h1 + p + span').exists()).toBe(true)

    const $header = wrapper.find('h1')
    expect($header.classes()).toContain('display-3')
    expect($header.classes().length).toBe(1)
    expect($header.find('small').exists()).toBe(true)
    expect($header.text()).toEqual('foo')

    const $lead = wrapper.find('p')
    expect($lead.classes()).toContain('lead')
    expect($lead.classes().length).toBe(1)
    expect($lead.find('small').exists()).toBe(true)
    expect($lead.text()).toEqual('bar')

    expect(wrapper.find('span').text()).toEqual('baz')

    wrapper.unmount()
  })
})
