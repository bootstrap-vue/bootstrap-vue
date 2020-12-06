import { BvEvent } from './bv-event.class'

describe('utils/BvEvent class', () => {
  it('works', async () => {
    const event = new BvEvent('foobar')
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
  })

  it('throws exception if no type given', async () => {
    let event = null
    let failed = false
    try {
      event = new BvEvent()
    } catch (e) {
      failed = true
    }
    expect(event).not.toBeInstanceOf(BvEvent)
    expect(event).toBe(null)
    expect(failed).toBe(true)
  })

  it('supports cancelable events', async () => {
    const event = new BvEvent('foobar', {
      cancelable: true
    })
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(true)
    expect(event.defaultPrevented).toBe(false)
    event.preventDefault()
    expect(event.defaultPrevented).toBe(true)
  })

  it('supports non cancelable events', async () => {
    const event = new BvEvent('foobar', {
      cancelable: false
    })
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(false)
    expect(event.defaultPrevented).toBe(false)
    event.preventDefault()
    expect(event.defaultPrevented).toBe(false)
  })

  it('supports built in properties', async () => {
    const event = new BvEvent('foobar', {
      target: 'baz'
    })
    expect(event).toBeInstanceOf(BvEvent)
    expect(event.type).toBe('foobar')
    expect(event.cancelable).toBe(true)
    expect(event.target).toBe('baz')
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
