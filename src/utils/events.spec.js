import { parseEventOptions } from './events'
import { hasPassiveEventSupport } from './env'

describe('utils/events', () => {
  it('event options parsing works', async () => {
    // JSDOM probably does not support passive mode
    if (hasPassiveEventSupport) {
      // Converts boolean to object
      expect(parseEventOptions(true)).toEqual({ capture: true })
      expect(parseEventOptions(false)).toEqual({ capture: false })
      expect(parseEventOptions()).toEqual({ capture: false })

      // Parses object correctly (returns as-is)
      expect(parseEventOptions({ capture: false })).toEqual({ capture: false })
      expect(parseEventOptions({ capture: true })).toEqual({ capture: true })
      expect(parseEventOptions({})).toEqual({})
      expect(parseEventOptions({ capture: false, foobar: true })).toEqual({
        capture: false,
        foobar: true
      })
      expect(parseEventOptions({ capture: true, foobar: false })).toEqual({
        capture: true,
        foobar: false
      })
    } else {
      // Converts non object to boolean
      expect(parseEventOptions(true)).toEqual(true)
      expect(parseEventOptions(false)).toEqual(false)
      expect(parseEventOptions()).toEqual(false)
      expect(parseEventOptions(null)).toEqual(false)
      // Converts object to boolean
      expect(parseEventOptions({ capture: false })).toEqual(false)
      expect(parseEventOptions({ capture: true })).toEqual(true)
      expect(parseEventOptions({})).toEqual(false)
      expect(parseEventOptions({ capture: false, foobar: true })).toEqual(false)
      expect(parseEventOptions({ capture: true, foobar: true })).toEqual(true)
      expect(parseEventOptions({ foobar: true })).toEqual(false)
      expect(parseEventOptions({ foobar: false })).toEqual(false)
    }
  })
})
