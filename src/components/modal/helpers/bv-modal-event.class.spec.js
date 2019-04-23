import BvEvent from '../../../utils/bv-event.class'
import BvModalEvent from './bv-modal-event.class'

describe('modal > BvModalEvent', () => {
  it('works', async () => {
    const evt = new BvModalEvent('foobar')
    expect(evt).toBeInstanceOf(BvModalEvent)
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
  })

  it('throws exception if no type given', async () => {
    let evt = null
    let failed = false
    try {
      evt = new BvModalEvent()
    } catch (e) {
      failed = true
    }
    expect(evt).not.toBeInstanceOf(BvModalEvent)
    expect(evt).not.toBeInstanceOf(BvEvent)
    expect(evt).toBe(null)
    expect(failed).toBe(true)
  })

  it('supports cancelable events via evt.preventDefault()', async () => {
    const evt = new BvModalEvent('foobar', {
      cancelable: true
    })
    expect(evt).toBeInstanceOf(BvModalEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.defaultPrevented).toBe(false)
    evt.preventDefault()
    expect(evt.defaultPrevented).toBe(true)
  })

  it('supports non cancelable events', async () => {
    const evt = new BvModalEvent('foobar', {
      cancelable: false
    })
    expect(evt).toBeInstanceOf(BvModalEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(false)
    expect(evt.defaultPrevented).toBe(false)
    evt.preventDefault()
    expect(evt.defaultPrevented).toBe(false)
  })

  it('supports built in properties', async () => {
    const evt = new BvModalEvent('foobar', {
      target: 'baz',
      trigger: 'ok',
      componentId: 'foo'
    })
    expect(evt).toBeInstanceOf(BvModalEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.target).toBe('baz')
    expect(evt.trigger).toBe('ok')
    expect(evt.componentId).toBe('foo')

    let failed = false
    try {
      evt.trigger = 'foobar'
    } catch (e) {
      failed = true
    }
    expect(failed).toBe(true)
    expect(evt.trigger).toBe('ok')

    failed = false
    try {
      evt.modalId = 'fail'
    } catch (e) {
      failed = true
    }
    expect(failed).toBe(true)
    expect(evt.componentId).toBe('foo')
  })

  it('supports custom properties', async () => {
    const evt = new BvEvent('foobar', {
      custom: 123
    })
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.custom).toBe(123)
  })

  describe('Deprecated features', () => {
    it('supports cancelable events via deprecated evt.cancel()', async () => {
      // Mock `console.warn()` to prevent a console warning and
      // check wether a warning about the `evt.cancel()` call
      // was made
      const warn = console.warn
      console.warn = jest.fn()

      const evt = new BvModalEvent('foobar', {
        cancelable: true
      })

      expect(evt).toBeInstanceOf(BvModalEvent)
      expect(evt.type).toBe('foobar')
      expect(evt.cancelable).toBe(true)
      expect(evt.defaultPrevented).toBe(false)
      evt.cancel()
      expect(evt.defaultPrevented).toBe(true)

      expect(console.warn).toHaveBeenCalled()
      console.warn = warn
    })

    it('supports deprecated evt.modalId', async () => {
      // Mock `console.warn()` to prevent a console warning and
      // check wether a warning about the `evt.cancel()` call
      // was made
      const warn = console.warn
      console.warn = jest.fn()

      const evt = new BvModalEvent('foobar', {
        componentId: 'foo'
      })

      expect(evt).toBeInstanceOf(BvModalEvent)
      expect(evt.type).toBe('foobar')
      expect(evt.componentId).toBe('foo')
      expect(evt.modalId).toBe('foo')

      expect(console.warn).toHaveBeenCalled()
      console.warn = warn
    })
  })
})
