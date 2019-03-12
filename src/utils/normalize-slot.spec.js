import normalizeSlot from './normalize-slot'

describe('utils/normalizeSlot', () => {
  it('works', async () => {
    const $scoped = {
      default(slotScope) {
        return 'foo' + (slotScope.a || '')
      }
    }
    const $slots = {
      default: 'bar'
    }
    expect(typeof normalizeSlot).toBe('function')

    // Prefers scopedSlots over slots
    let result = normalizeSlot('default', {}, $scoped, $slots)
    expect(result).toBe('foo')

    // Passes slot scope to scopedSlot
    result = normalizeSlot('default', { a: ' foo' }, $scoped, $slots)
    expect(result).toBe('foo foo')

    // Uses named slot if scopedSlot not found
    result = normalizeSlot('default', {}, {}, $slots)
    expect(result).toBe('bar')

    // Works if only named slot found
    result = normalizeSlot('default', { a: ' foo' }, {}, $slots)
    expect(result).toBe('bar')

    // Works if only named slot found and scopedSlots is undef
    result = normalizeSlot('default', { a: ' foo' }, undefined, $slots)
    expect(result).toBe('bar')

    // Works if only scoped slot found
    result = normalizeSlot('default', { a: ' bar' }, $scoped, {})
    expect(result).toBe('foo bar')

    // Works if only scoped slot found and scoped is undef
    result = normalizeSlot('default', { a: ' bar' }, $scoped, undefined)
    expect(result).toBe('foo bar')

    // Returns undefined if slot name not found
    result = normalizeSlot('default', {}, {}, {})
    expect(result).not.toBeDefined()

    // Returns undefined if slot name not found
    result = normalizeSlot('baz', {}, $scoped, $slots)
    expect(result).not.toBeDefined()
  })
})
