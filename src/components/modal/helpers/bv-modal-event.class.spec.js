import { BvEvent } from '../../../utils/bv-event.class'
import { BvModalEvent } from './bv-modal-event.class'

describe('modal > BvModalEvent', () => {
  it('works', async () => {
    const event = new BvModalEvent('foobar')
    expect(event).toBeInstanceOf(BvModalEvent)
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
  })

  it('throws exception if no type given', async () => {
    let event = null
    let failed = false
    try {
      event = new BvModalEvent()
    } catch (e) {
      failed = true
    }
    expect(event).not.toBeInstanceOf(BvModalEvent)
    expect(event).not.toBeInstanceOf(BvEvent)
    expect(event).toBe(null)
    expect(failed).toBe(true)
  })

  it('supports cancelable events via event.preventDefault()', async () => {
    const event = new BvModalEvent('foobar', {
      cancelable: true
    })
    expect(event).toBeInstanceOf(BvModalEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(true)
    expect(event.defaultPrevented).toBe(false)
    event.preventDefault()
    expect(event.defaultPrevented).toBe(true)
  })

  it('supports non cancelable events', async () => {
    const event = new BvModalEvent('foobar', {
      cancelable: false
    })
    expect(event).toBeInstanceOf(BvModalEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(false)
    expect(event.defaultPrevented).toBe(false)
    event.preventDefault()
    expect(event.defaultPrevented).toBe(false)
  })

  it('supports built in properties', async () => {
    const event = new BvModalEvent('foobar', {
      target: 'baz',
      trigger: 'ok',
      componentId: 'foo'
    })
    expect(event).toBeInstanceOf(BvModalEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(true)
    expect(event.target).toBe('baz')
    expect(event.trigger).toBe('ok')
    expect(event.componentId).toBe('foo')

    let failed = false
    try {
      event.trigger = 'foobar'
    } catch (e) {
      failed = true
    }
    expect(failed).toBe(true)
    expect(event.trigger).toBe('ok')
  })

  it('supports custom properties', async () => {
    const event = new BvEvent('foobar', {
      custom: 123
    })
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(true)
    expect(event.custom).toBe(123)
  })
})
