import normalizeSlot from './normalize-slot'

describe('util/normalize-slot', async () => {
  if('works', async () => {
    const $scoped = {
      default(slotScope) { return 'foo' + (slotScope.a || '')  }
    }
    const $slots = {
      default: 'bar'
    }
    expect(typeof normalizeSlot).toBe('function')

    let result = normalizeSlot('default', {}, $scoped, $slot)
    expect(result).toBe('foo')

    let result = normalizeSlot('default', { a: ' foo' }, $scoped, $slot)
    expect(result).toBe('foo foo')

    result = normalizeSlot('default', {}, {}, $slot)
    expect(result).toBe('bar')

    result = normalizeSlot('default', { a: ' foo'}, {}, $slot)
    expect(result).toBe('bar')

    result = normalizeSlot('default', { a: ' bar'}, $scoped, {})
    expect(result).toBe('foo bar')

    result = normalizeSlot('default', {}, {}, {})
    expect(result).not.toBeDefined()

    let result = normalizeSlot('baz', {}, $scoped, $slot)
    expect(result).not.toBeDefined()
  })
})
