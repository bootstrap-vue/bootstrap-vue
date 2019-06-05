import DEFAULTS from './config-defaults'

describe('utils/config-defaults', () => {
  it('default configuration is immutable', async () => {
    // Existing properties cannot be mutated
    expect(DEFAULTS.breakpoints).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    try {
      DEFAULTS.breakpoints = 'foobar'
    } catch {}
    expect(DEFAULTS.breakpoints).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])

    // Nested array properties cannot be mutated
    expect(DEFAULTS.breakpoints[0]).toEqual('xs')
    try {
      DEFAULTS.breakpoints[0] = 'foobar'
    } catch {}
    expect(DEFAULTS.breakpoints[0]).toEqual('xs')
    expect(DEFAULTS.breakpoints).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])

    // Nested object properties cannot be mutated
    expect(DEFAULTS.BAlert.variant).toEqual('info')
    try {
      DEFAULTS.BAlert.variant = 'foobar'
    } catch {}
    expect(DEFAULTS.BAlert.variant).toEqual('info')

    // New Properties cannot be added
    expect(DEFAULTS.foobar).not.toBeDefined()
    try {
      DEFAULTS.foobar = 'foobar'
    } catch {}
    expect(DEFAULTS.foobar).not.toBeDefined()
    expect(DEFAULTS.BAlert.foobar).not.toBeDefined()
    try {
      DEFAULTS.BAlert.foobar = 'foobar'
    } catch {}
    expect(DEFAULTS.BAlert.foobar).not.toBeDefined()

    // Properties cannot be deleted
    expect(DEFAULTS.BAlert).toBeDefined()
    try {
      delete DEFAULTS.BAlert
    } catch {}
    expect(DEFAULTS.BAlert).toBeDefined()
  })
})
