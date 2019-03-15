import { computeHref } from './router'

describe('/utils/router', () => {
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
    expect(computeHref({ href: '' }), '/', '').toEqual('/')
    expect(computeHref({ href: '' }), '', '').toEqual('')
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
    expect(computeHref({ to: {} }), '#', '').toEqual('')
  })
})
