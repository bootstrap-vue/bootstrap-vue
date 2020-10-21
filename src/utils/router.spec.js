import {
  stringifyQueryObj,
  parseQuery,
  computeHref,
  isRouterLink,
  computeRel,
  computeTag
} from './router'

describe('utils/router', () => {
  // stringifyQueryObject() utility method
  describe('stringifyQueryObj()', () => {
    it('returns empty string when noting passed', async () => {
      expect(stringifyQueryObj()).toEqual('')
    })

    it('handles special chars', async () => {
      expect(stringifyQueryObj({ foo: ", !'()*" })).toEqual('?foo=,%20%21%27%28%29%2a')
      expect(stringifyQueryObj({ ", !'()*": 'foo' })).toEqual('?,%20%21%27%28%29%2a=foo')
    })

    it('handles multiple keys', async () => {
      const obj = {
        foo: 1,
        bar: 'baz'
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=1&bar=baz')
    })

    it('handles array as values', async () => {
      const obj = {
        foo: 1,
        bar: ['a', 'b', 'c']
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=1&bar=a&bar=b&bar=c')
    })

    it('skips undefined values', async () => {
      const obj = {
        foo: 1,
        bar: undefined,
        baz: 2
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=1&baz=2')
    })

    it('skips undefined values in arrays', async () => {
      const obj = {
        foo: ['a', undefined, 'c']
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=a&foo=c')
    })

    it('leaves in null value keys', async () => {
      const obj = {
        foo: 1,
        bar: null,
        baz: 2
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=1&bar&baz=2')
    })

    it('leaves in null values in arrays', async () => {
      const obj = {
        foo: ['a', null, 'c']
      }
      expect(stringifyQueryObj(obj)).toEqual('?foo=a&foo&foo=c')
    })
  })

  describe('parseQuery()', () => {
    it('returns empty object when empty query', async () => {
      expect(parseQuery('')).toEqual({})
      expect(parseQuery('?')).toEqual({})
    })

    it('parses simple query', async () => {
      expect(parseQuery('?foo=bar')).toEqual({ foo: 'bar' })
      expect(parseQuery('?foo=bar&baz=buz')).toEqual({ foo: 'bar', baz: 'buz' })
    })

    it('parses empty values', async () => {
      expect(parseQuery('?foo')).toEqual({ foo: null })
      expect(parseQuery('?foo=bar&baz')).toEqual({ foo: 'bar', baz: null })
      expect(parseQuery('?foo=&baz')).toEqual({ foo: '', baz: null })
    })

    it('handles null key/value pairs values', async () => {
      expect(parseQuery('?foo=bar&&baz=fiz')).toEqual({ foo: 'bar', '': null, baz: 'fiz' })
      expect(parseQuery('?foo=bar&=&baz=fiz')).toEqual({ foo: 'bar', '': '', baz: 'fiz' })
    })

    it('handles values with = characters', async () => {
      expect(parseQuery('?foo=bar=baz')).toEqual({ foo: 'bar=baz' })
    })

    it('parses duplicate keys as arrays', async () => {
      expect(parseQuery('?foo=bar&foo=baz')).toEqual({ foo: ['bar', 'baz'] })
      expect(parseQuery('?foo=&foo=baz&foo')).toEqual({ foo: ['', 'baz', null] })
      expect(parseQuery('?foo=bar&baz=buz&baz=fiz')).toEqual({ foo: 'bar', baz: ['buz', 'fiz'] })
    })
  })

  // computeHref() utility method
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

    it('parses `to` with hash missing "#"', async () => {
      const obj = {
        to: {
          hash: 'foobar'
        }
      }
      expect(computeHref(obj)).toEqual('#foobar')
    })

    it('parses `to` with only query', async () => {
      const obj = {
        to: {
          query: { foo: 'bar' }
        }
      }
      expect(computeHref(obj)).toEqual('?foo=bar')
    })

    it('parses empty `to` to fallback default', async () => {
      expect(computeHref({ to: {} })).toEqual('#')
      expect(computeHref({ to: {} }, 'a', '#', '')).toEqual('#')
      expect(computeHref({ to: {} }, 'a', '/', '#')).toEqual('/')
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
      expect(computeHref(obj)).toEqual('/foo?bar=1&baz=a&baz=b&baz=c&bif#fizzlerocks')
    })
  })

  // isRouterLink() utility method
  describe('isRouterLink()', () => {
    it('works', async () => {
      expect(isRouterLink('a')).toBe(false)
      expect(isRouterLink('router-link')).toBe(true)
      expect(isRouterLink('nuxt-link')).toBe(true)
      expect(isRouterLink()).toBe(false)
    })
  })

  // computeRel() utility method
  describe('computeRel()', () => {
    it('works', async () => {
      expect(computeRel({ target: '_blank', rel: null })).toBe('noopener')
      expect(computeRel({ target: '_blank', rel: undefined })).toBe(null)
      expect(computeRel({ target: '_blank' })).toBe(null)
      expect(computeRel({ target: '_blank', rel: 'foo' })).toBe('foo')
      expect(computeRel({ target: '_notblank', rel: null })).toBe(null)
      expect(computeRel({ target: '_notblank', rel: undefined })).toBe(null)
      expect(computeRel({ target: '_notblank', rel: 'foo' })).toBe('foo')
      expect(computeRel({})).toBe(null)
    })
  })

  // computeTag() utility method
  describe('computeTag()', () => {
    it('works', async () => {
      const context1 = { $router: {} }
      const context2 = { $router: {}, $nuxt: {} }
      const context3 = {}

      expect(computeTag({ to: '/foo' }, context1)).toBe('router-link')
      expect(computeTag({ to: '/foo' }, context2)).toBe('nuxt-link')
      expect(computeTag({ to: '/foo' }, context3)).toBe('a')
      expect(computeTag({}, context1)).toBe('a')
      expect(computeTag({}, context2)).toBe('a')
      expect(computeTag({}, context3)).toBe('a')
      expect(computeTag({ to: '/foo', disabled: true }, context1)).toBe('a')
      expect(computeTag({ to: '/foo', disabled: true }, context2)).toBe('a')
      expect(computeTag({ to: '/foo', disabled: true }, context3)).toBe('a')
      expect(computeTag({ disabled: true }, context1)).toBe('a')
      expect(computeTag({ disabled: true }, context2)).toBe('a')
      expect(computeTag({ disabled: true }, context3)).toBe('a')
    })
  })
})
