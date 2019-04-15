import Vue from 'vue'
import { mount } from '@vue/test-utils'
import {
  isElement,
  isDisabled,
  contains,
  closest,
  matches,
  select,
  selectAll,
  hasAttr,
  getAttr,
  hasClass,
  parseEventOptions
} from './dom'
import { hasPassiveEventSupport } from './env'

const template1 = `
<div id="a" class="foo">
  <div class="bar">
    <span class="barspan foobar"></span>
  </div>
  <div class="baz">
    <button id="button1" aria-label="label">btn 1</button>
    <button id="button2">btn 1</button>
    <button id="button3" disabled>btn 1</button>
  </div>
</div>
`

const App = Vue.extend({
  template: template1
})

describe('utils/dom', () => {
  it('isElement works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('div.foo')).toBe(true)
    expect(isElement(wrapper.element)).toBe(true)
    expect(isElement(null)).toBe(false)
    expect(isElement(App)).toBe(false)

    wrapper.destroy()
  })

  it('isDisabled works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)
    expect(isDisabled($btns.at(0).element)).toBe(false)
    expect(isDisabled($btns.at(1).element)).toBe(false)
    expect(isDisabled($btns.at(2).element)).toBe(true)

    wrapper.destroy()
  })

  it('hasClass works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
    expect(wrapper).toBeDefined()

    const $span = wrapper.find('span.barspan')
    expect($span).toBeDefined()
    expect($span.exists()).toBe(true)
    expect(hasClass($span.element, 'barspan')).toBe(true)
    expect(hasClass($span.element, 'foobar')).toBe(true)
    expect(hasClass($span.element, 'fizzlerocks')).toBe(false)
    expect(hasClass(null, 'foobar')).toBe(false)

    wrapper.destroy()
  })

  it('contains works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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

    wrapper.destroy()
  })

  it('closest works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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
    expect(closest('div.nothere', $btns.at(0).element)).toBe(null)

    wrapper.destroy()
  })

  it('matches works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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

    wrapper.destroy()
  })

  it('hasAttr works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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

    wrapper.destroy()
  })

  it('getAttr works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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

    wrapper.destroy()
  })

  it('select works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    // With root element specified
    expect(select('button', wrapper.element)).toBe($btns.at(0).element)
    expect(select('button#button3', wrapper.element)).toBe($btns.at(2).element)
    expect(select('span.nothere', wrapper.element)).toBe(null)

    // Note: It appears that vue-test-utils is not detaching previous app instances
    //       and elements once the test is complete!
    expect(select('button')).not.toBe(null)
    expect(select('button')).toBe($btns.at(0).element)
    expect(select('button#button3')).not.toBe(null)
    expect(select('button#button3')).toBe($btns.at(2).element)
    expect(select('span.nothere')).toBe(null)

    wrapper.destroy()
  })

  it('selectAll works', async () => {
    const wrapper = mount(App, {
      attachToDocument: true
    })
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
    // Note: It appears that vue-test-utils is not detaching previous app instances
    //       and elements once the test is complete!
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

    wrapper.destroy()
  })

  it('event options parsing works', async () => {
    // JSDOM probably does not support passive mode
    if (hasPassiveEventSupport) {
      // Converts boolean to object
      expect(parseEventOptions(true)).toEqual({ useCapture: true })
      expect(parseEventOptions(false)).toEqual({ useCapture: false })
      expect(parseEventOptions()).toEqual({ useCapture: false })

      // Parses object correctly (returns as-is)
      expect(parseEventOptions({ useCapture: false })).toEqual({ useCapture: false })
      expect(parseEventOptions({ useCapture: true })).toEqual({ useCapture: true })
      expect(parseEventOptions({})).toEqual({})
      expect(
        parseEventOptions({
          useCapture: false,
          foobar: true
        })
      ).toEqual({ useCapture: false, foobar: true })
      expect(
        parseEventOptions({
          useCapture: true,
          foobar: false
        })
      ).toEqual({ useCapture: true, foobar: false })
    } else {
      // Converts non object to boolean
      expect(parseEventOptions(true)).toEqual(true)
      expect(parseEventOptions(false)).toEqual(false)
      expect(parseEventOptions()).toEqual(false)
      expect(parseEventOptions(null)).toEqual(false)
      // Converts object to boolean
      expect(parseEventOptions({ useCapture: false })).toEqual(false)
      expect(parseEventOptions({ useCapture: true })).toEqual(true)
      expect(parseEventOptions({})).toEqual(false)
      expect(
        parseEventOptions({
          useCapture: false,
          foobar: true
        })
      ).toEqual(false)
      expect(
        parseEventOptions({
          useCapture: true,
          foobar: true
        })
      ).toEqual(true)
      expect(parseEventOptions({ foobar: true })).toEqual(false)
      expect(parseEventOptions({ foobar: false })).toEqual(false)
    }
  })
})
