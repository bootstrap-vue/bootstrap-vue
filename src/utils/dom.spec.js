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
  hasClass
} from './dom'

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

describe('utils/dom', () => {
  it('isElement works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()
    expect(wrapper.is('div.foo')).toBe(true)
    expect(isElement(wrapper.element)).toBe(true)
    expect(isElement(null)).toBe(false)
    expect(isElement(App)).toBe(false)
  })

  it('isDisabled works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)
    expect(isDisabled($btns.at(0).element)).toBe(false)
    expect(isDisabled($btns.at(1).element)).toBe(false)
    expect(isDisabled($btns.at(2).element)).toBe(true)
  })

  it('hasClass works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    const $span = wrapper.find('span.barspan')
    expect($span).toBeDefined()
    expect($span.exists()).toBe(true)
    expect(hasClass($span.element, 'barspan')).toBe(true)
    expect(hasClass($span.element, 'foobar')).toBe(true)
    expect(hasClass($span.element, 'fizzlerocks')).toBe(false)
    expect(hasClass(null, 'foobar')).toBe(false)
  })

  it('contains works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App)
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

  it('closest works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
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
  })

  it('matches works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
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
  })

  it('hasAttr works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
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
  })

  it('getAttr works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
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
  })

  it('select works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
    })
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(select('button', wrapper.element)).toBe($btns.at(0).element)
    expect(select('button')).toBe($btns.at(0).element) /* assumes document as root */
    expect(select('button#button3', wrapper.element)).toBe($btns.at(2).element)
    expect(select('span.nothere', wrapper.element)).toBe(null)
  })

  it('selectAll works', async () => {
    const App = Vue.extend({
      template: template1
    })
    const wrapper = mount(App, {
      mountToDocument: true
    })
    expect(wrapper).toBeDefined()

    const $btns = wrapper.findAll('div.baz > button')
    expect($btns).toBeDefined()
    expect($btns.length).toBe(3)

    expect(Array.isArray(selectAll('button', wrapper.element))).toBe(true)
    expect(selectAll('button', wrapper.element).length).toBe(3)
    expect(selectAll('button', wrapper.element)[0]).toBe($btns[0].element)
    expect(selectAll('button', wrapper.element)[1]).toBe($btns[1].element)
    expect(selectAll('button', wrapper.element)[2]).toBe($btns[2].element)
    expect(selectAll('button').length).toBe(3) /* assumes document as root */
    expect(Array.isArray(selectAll('button.fake', wrapper.element))).toBe(true)
    expect(selectAll('button.fake', wrapper.element).length).toBe(0)
  })
})
