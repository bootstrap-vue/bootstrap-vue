import { stringifyQueryObj, computeHref, isRouterLink } from './router'

describe('utils/router', () => {
  // stringifyQueryObject utility method
  describe('stringifyQueryObj()', async () => {
    it('returns empty string when noting passed', async () => {
      expect(stringifyQueryObj()).toEqual('')
    })

    it('handles special chars', async () => {
      expect(stringifyQueryObj({ foo: ", !'()*" })).toEqual('foo=,%20%21%27%28%29%2a')
      expect(stringifyQueryObj({ ", !'()*": 'foo' })).toEqual(',%20%21%27%28%29%2a=foo')
    })

    it('handles multiple keys', async () => {
      const obj = {
        foo: 1,
        bar: 'baz'
      }
      expect(stringifyQueryObj(obj)).toEqual('foo=1&bar=baz')
    })

    it('handles array as values', async () => {
      const obj = {
        foo: 1,
        bar: ['a', 'b', 'c']
      }
      expect(stringifyQueryObj(obj)).toEqual('foo=1&bar=a&bar=b&bar=c')
    })

    it('skips undefined vals', async () => {
      const obj = {
        foo: 1,
        bar: undefined,
        baz: 2
      }
      expect(stringifyQueryObj(obj)).toEqual('foo=1&baz=2')
    })

    it('leaves in null val keys', async () => {
      const obj = {
        foo: 1,
        bar: null,
        baz: 2
      }
      expect(stringifyQueryObj(obj)).toEqual('foo=1&bar&baz=2')
    })
  })

  // computeHref utility metod
  describe('computeHref()', () => {
    it('works with href', async () => {
      const obj = { href: '/foo/bar?baz=123' }
      expect(computeHref(obj)).toEqual(obj.href)
    })

    it('parses nothing to default', async () => {
      expect(computeHref()).toEqual('#')
      expect(computeHref(undefined, undefined, '/', '')).toEqual('/')
      expect(computeHref(undefined, undefined, '', '')).toEqual('')
    })

    it('returns null when tag is not `a`', async () => {
      expect(computeHref({}, 'div')).toEqual(null)
      expect(computeHref(undefined, 'div', '/', '')).toEqual(null)
      expect(computeHref(undefined, 'span', '', '/')).toEqual(null)
    })

    it('returns href when both href and to provided', async () => {
      const obj = {
        href: '/foo/bar?baz=123',
        to: '/baz/bar'
      }
      expect(computeHref(obj)).toEqual(obj.href)
    })

    it('parses empty `href` to default', async () => {
      expect(computeHref({ href: '' })).toEqual('#')
      expect(computeHref({ href: '' }, 'a', '/', '')).toEqual('/')
      expect(computeHref({ href: '' }, 'a', '', '')).toEqual('')
    })

    it('parses `to` when string', async () => {
      const obj = {
        to: '/baz/bar'
      }
      expect(computeHref(obj)).toEqual(obj.to)
    })

    it('parses `to` with only path', async () => {
      const obj = {
        to: {
          path: '/baz/bar'
        }
      }
      expect(computeHref(obj)).toEqual(obj.to.path)
    })

    it('parses `to` with only hash', async () => {
      const obj = {
        to: {
          hash: '#foobar'
        }
      }
      expect(computeHref(obj)).toEqual(obj.to.hash)
    })

    it('parses `to` with only query', async () => {
      const obj = {
        to: {
          query: { foo: 'bar' }
        }
      }
      expect(computeHref(obj)).toEqual('?foo=bar')
    })

    it('parses empty `to` to default', async () => {
      expect(computeHref({ to: {} })).toEqual('/')
      expect(computeHref({ to: {} }, 'a', '#', '')).toEqual('')
      expect(computeHref({ to: {} }, 'a', '/', '#')).toEqual('#')
    })

    it('parses complete `to`', async () => {
      const obj = {
        to: {
          path: '/foo',
          query: {
            bar: 1,
            baz: ['a', 'b', 'c'],
            bif: null,
            zap: undefined
          },
          hash: '#fizzlerocks'
        }
      }
      expect(computeHref(obj)).toEqual('/foo?bar=1&baz=a&baz=b&bif#fizzlerocks')
    })
  })

  // isROuterLink utility method
  describe('isRouterLink()', () => {
    it('works', async () => {
      expect(isRouterLink('a')).toBe(false)
      expect(isRouterLink('div')).toBe(true)
      expect(isRouterLink()).toBe(true)
    })
  })
})
