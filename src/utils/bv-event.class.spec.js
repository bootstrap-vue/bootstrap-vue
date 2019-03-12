import BvEvent from './bv-event.class'

describe('utils/BvEvent', () => {
  it('works', async () => {
    const evt = new BvEvent('foobar')
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
  })

  it('supports cancelable events', async () => {
    const evt = new BvEvent('foobar', {
      cancelable: true
    })
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.defaultPrevented).toBe(false)
    evt.preventDefault()
    expect(evt.defaultPrevented).toBe(true)
  })

  it('supports non cancelable events', async () => {
    const evt = new BvEvent('foobar', {
      cancelable: false
    })
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(false)
    expect(evt.defaultPrevented).toBe(false)
    evt.preventDefault()
    expect(evt.defaultPrevented).toBe(false)
  })

  it('supports built in properties', async () => {
    const evt = new BvEvent('foobar', {
      target: 'baz'
    })
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.target).toBe('baz')
  })

  it('supports custom properties', async () => {
    const evt = new BvEvent('foobar', {
      custom: 123
    })
    expect(evt).toBeInstanceOf(BvEvent)
    expect(evt.type).toBe('foobar')
    expect(evt.cancelable).toBe(true)
    expect(evt.custome).toBe(123)
  })
})
