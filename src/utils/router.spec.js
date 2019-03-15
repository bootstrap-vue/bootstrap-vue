import { computeHref } from './router'

describe('utils/router', () => {
  // computeHref utility
  describe('computeHref', () => {
    it('works with href', async () => {
      const obj = { href: '/foo/bar?baz=123' }
      expect(computeHref(obj)).toEqual(obj.href)
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
      expect(computeHref({ href: '' }, '/', '')).toEqual('/')
      expect(computeHref({ href: '' }, '', '')).toEqual('')
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
      expect(computeHref({ to: {} }, '#', '')).toEqual('')
      expect(computeHref({ to: {} }, '/', '#')).toEqual('#')
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
      expect(computeHref(obj)).toEqual('/foo?bar=1&baz=a&baz=b&bif=#fizzlerocks')
    })
  })
})
