import { mount } from '@vue/test-utils'
import {
  closest,
  contains,
  getAttr,
  getShadowRootOrRoot,
  getStyle,
  hasAttr,
  hasClass,
  isConnectedToDOM,
  isDisabled,
  isElement,
  isVisible,
  matches,
  select,
  selectAll
} from './dom'

const template = `
<div id="a" class="foo">
  <div class="bar">
    <span class="barspan foobar" style="color: red;"></span>
  </div>
  <div class="baz">
    <button id="button1" aria-label="label">btn 1</button>
    <button id="button2">btn 1</button>
    <button id="button3" disabled>btn 1</button>
  </div>
</div>
`
let App
let wrapper

describe('utils/dom', () => {
  beforeEach(() => {
    App = { template }
    wrapper = mount(App, {
      attachTo: document.body
    })
    // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
    // Hack to make Popper not bork out during tests
    // Note popper still does not do any positioning calculation in JSDOM though
    // So we cannot test actual positioning, just detect when it is open
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    })
    // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
    // Needed for visibility checks of trigger element, etc
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('isElement() works', async () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div.foo').exists()).toBe(true)
    expect(isElement(wrapper.element)).toBe(true)
    expect(isElement(null)).toBe(false)
    expect(isElement(App)).toBe(false)
  })

  it('isDisabled() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)
    expect(isDisabled($btns.at(0).element)).toBe(false)
    expect(isDisabled($btns.at(1).element)).toBe(false)
    expect(isDisabled($btns.at(2).element)).toBe(true)
  })

  it('isVisible() works', async () => {
    expect(wrapper).toBeDefined()
    const $baz = wrapper.find('div.baz')
    expect($baz).toBeDefined()
    expect(isVisible($baz.element)).toBe(true)
  })
  it('isVisible() is not connected', async () => {
    const el = document.createElement('div')

    expect(el).toBeDefined()
    // test for element not connected
    expect(isVisible(el)).toBe(false)
    // test for not an element
    expect(isVisible({})).toBe(false)
  })

  it('isVisible() element display none', async () => {
    expect(wrapper).toBeDefined()

    const $baz = wrapper.find('div.baz')
    $baz.element.style.display = 'none'
    expect($baz).toBeDefined()
    expect(isVisible($baz.element)).toBe(false)
  })

  it('isConnectedToDOM() Regular DOM', async () => {
    expect(wrapper).toBeDefined()

    const $barspan = wrapper.findAll('span.barspan')
    expect($barspan).toBeDefined()
    expect($barspan.length).toBe(1)
    expect(isConnectedToDOM($barspan.at(0).element)).toBe(true)
  })

  it('isConnectedToDOM() Shadow DOM', async () => {
    const rootEl = document.createElement('div')
    const shadow = rootEl.attachShadow({ mode: 'open' })
    const subElement = document.createElement('p')
    shadow.appendChild(subElement)
    document.body.appendChild(rootEl)

    expect(rootEl).toBeDefined()
    expect(shadow).toBeDefined()
    expect(isConnectedToDOM(subElement)).toBe(true)
  })

  it('isConnectedToDOM() not connected', async () => {
    const el = document.createElement('div')

    expect(el).toBeDefined()
    expect(isConnectedToDOM(el)).toBe(false)
  })

  it('getShadowRootOrRoot() Shadow Dom', async () => {
    const rootEl = document.createElement('div')
    const shadow = rootEl.attachShadow({ mode: 'open' })
    const subElement = document.createElement('p')
    shadow.appendChild(subElement)
    const testRoot = getShadowRootOrRoot(subElement)

    expect(rootEl).toBeDefined()
    expect(shadow).toBeDefined()
    expect(testRoot).toBe(shadow)
  })
  it('getShadowRootOrRoot() Regular DOM', async () => {
    expect(wrapper).toBeDefined()

    const $baz = wrapper.find('div.baz')
    const $documentBody = getShadowRootOrRoot($baz.element)
    expect($documentBody).toBeDefined()
    expect($documentBody.nodeName.toLowerCase()).toBe('body')
  })

  it('getShadowRootOrRoot() getRootNode is Null', async () => {
    const el = {
      getRootNode: null
    }

    expect(getShadowRootOrRoot(el).nodeName.toLowerCase()).toBe('body')
  })

  it('hasClass() works', async () => {
    expect(wrapper).toBeDefined()

    const $span = wrapper.find('span.barspan')
    expect($span).toBeDefined()
    expect($span.exists()).toBe(true)
    expect(hasClass($span.element, 'barspan')).toBe(true)
    expect(hasClass($span.element, 'foobar')).toBe(true)
    expect(hasClass($span.element, 'fizzle-rocks')).toBe(false)
    expect(hasClass(null, 'foobar')).toBe(false)
  })

  it('contains() works', async () => {
    expect(wrapper).toBeDefined()

    const $span = wrapper.find('span.barspan')
    expect($span).toBeDefined()
    expect($span.exists()).toBe(true)
    const $btn1 = wrapper.find('button#button1')
    expect($btn1).toBeDefined()
    expect($btn1.exists()).toBe(true)

    expect(contains(wrapper.element, $span.element)).toBe(true)
    expect(contains(wrapper.element, $btn1.element)).toBe(true)
    expect(contains($span.element, $btn1.element)).toBe(false)
    expect(contains(null, $btn1.element)).toBe(false)
  })

  it('closest() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(closest('div.foo', $btns.at(0).element)).toBeDefined()
    expect(closest('div.foo', $btns.at(0).element)).toBe(wrapper.element)
    expect(closest('div.foo', null)).toBe(null)

    const $baz = wrapper.find('div.baz')
    expect($baz).toBeDefined()
    expect($baz.exists()).toBe(true)
    expect(closest('div.baz', $btns.at(0).element)).toBeDefined()
    expect(closest('div.baz', $btns.at(0).element)).toBe($baz.element)
    expect(closest('div.not-here', $btns.at(0).element)).toBe(null)
    expect(closest('div.baz', $baz.element)).toBe(null)
    expect(closest('div.baz', $baz.element, true)).toBe($baz.element)
  })

  it('matches() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(matches($btns.at(0).element, 'button[disabled]')).toBe(false)
    expect(matches($btns.at(1).element, 'button[disabled]')).toBe(false)
    expect(matches($btns.at(2).element, 'button[disabled]')).toBe(true)
    expect(matches($btns.at(0).element, 'div.baz button')).toBe(true)
    expect(matches($btns.at(0).element, 'div.baz > button')).toBe(true)
    expect(matches($btns.at(0).element, '.foo > div.baz > button')).toBe(true)
    expect(matches($btns.at(0).element, 'div.foo button')).toBe(true)
    expect(matches($btns.at(0).element, 'div.foo > button')).toBe(false)
    expect(matches($btns.at(0).element, 'div.bar > button')).toBe(false)
    expect(matches($btns.at(0).element, 'button#button1')).toBe(true)
    expect(matches(null, 'div.foo')).toBe(false)
  })

  it('hasAttr() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(hasAttr($btns.at(0).element, 'disabled')).toBe(false)
    expect(hasAttr($btns.at(0).element, 'aria-label')).toBe(true)
    expect(hasAttr($btns.at(1).element, 'disabled')).toBe(false)
    expect(hasAttr($btns.at(2).element, 'disabled')).toBe(true)
    expect(hasAttr($btns.at(2).element, 'role')).toBe(false)
    expect(hasAttr(null, 'role')).toBe(null)
  })

  it('getAttr() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(getAttr($btns.at(0).element, 'aria-label')).toBe('label')
    expect(getAttr($btns.at(0).element, 'id')).toBe('button1')
    expect(getAttr($btns.at(1).element, 'aria-label')).toBe(null)
    expect(getAttr($btns.at(1).element, 'id')).toBe('button2')
    expect(getAttr($btns.at(2).element, 'aria-label')).toBe(null)
    expect(getAttr($btns.at(2).element, 'id')).toBe('button3')
    expect(getAttr(null, 'role')).toBe(null)
    expect(getAttr($btns.at(0).element, '')).toBe(null)
    expect(getAttr($btns.at(0).element, undefined)).toBe(null)
  })

  it('getStyle() works', async () => {
    expect(wrapper).toBeDefined()

    const $span = wrapper.find('span.barspan')
    expect($span).toBeDefined()
    expect($span.exists()).toBe(true)
    expect(getStyle($span.element, 'color')).toBe('red')
    expect(getStyle($span.element, 'width')).toBe(null)
    expect(getStyle(null, 'color')).toBe(null)
  })

  it('select() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    // With root element specified
    expect(select('button', wrapper.element)).toBe($btns.at(0).element)
    expect(select('button#button3', wrapper.element)).toBe($btns.at(2).element)
    expect(select('span.not-here', wrapper.element)).toBe(null)

    // Without root element specified
    expect(select('button')).not.toBe(null)
    expect(select('button')).toBe($btns.at(0).element)
    expect(select('button#button3')).not.toBe(null)
    expect(select('button#button3')).toBe($btns.at(2).element)
    expect(select('span.not-here')).toBe(null)
  })

  it('selectAll() works', async () => {
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    // With root element specified
    expect(Array.isArray(selectAll('button', wrapper.element))).toBe(true)
    expect(selectAll('button', wrapper.element).length).toBe(3)
    expect(selectAll('button', wrapper.element)[0]).toBe($btns.at(0).element)
    expect(selectAll('button', wrapper.element)[1]).toBe($btns.at(1).element)
    expect(selectAll('button', wrapper.element)[2]).toBe($btns.at(2).element)

    expect(Array.isArray(selectAll('button.fake', wrapper.element))).toBe(true)
    expect(selectAll('button.fake', wrapper.element).length).toBe(0)

    expect(selectAll('div.baz button', wrapper.element).length).toBe(3)
    expect(selectAll('div.baz button', wrapper.element)[0]).toBe($btns.at(0).element)
    expect(selectAll('div.baz button', wrapper.element)[1]).toBe($btns.at(1).element)
    expect(selectAll('div.baz button', wrapper.element)[2]).toBe($btns.at(2).element)

    // Without root element specified (assumes document as root)
    expect(Array.isArray(selectAll('button'))).toBe(true)
    expect(selectAll('button')).not.toEqual([])
    expect(selectAll('button').length).toBe(3)
    expect(selectAll('button')[0]).toBe($btns.at(0).element)
    expect(selectAll('button')[1]).toBe($btns.at(1).element)
    expect(selectAll('button')[2]).toBe($btns.at(2).element)

    expect(Array.isArray(selectAll('button.fake'))).toBe(true)
    expect(selectAll('button.fake').length).toBe(0)

    expect(selectAll('div.baz button')).not.toEqual([])
    expect(selectAll('div.baz button').length).toBe(3)
    expect(selectAll('div.baz button')[0]).toBe($btns.at(0).element)
    expect(selectAll('div.baz button')[1]).toBe($btns.at(1).element)
    expect(selectAll('div.baz button')[2]).toBe($btns.at(2).element)
  })
})
