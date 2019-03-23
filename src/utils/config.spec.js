import { getConfigParam, getBreakpointsAll, getBreakpointsUp, getBreakpointsDown } from './config'

describe('utils/config', () => {
  it('getConfigParam works', async () => {
    expect(getConfigParam('breakpoints')).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getConfigParam('breakpoints')).not.toBe(getConfigParam('breakpoints'))
    // Should return null for not found
    expect(getConfigParam('foo.bar[1].baz')).toBe(null)
  })

  it('getBreakpointsAll works', async () => {
    expect(getBreakpointsAll()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpointsAll()).not.toBe(getBreakpointsAll())
  })

  it('getBreakpointsUp works', async () => {
    expect(getBreakpointsUp()).toEqual(['', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpointsUp()).not.toBe(getBreakpointsUp())
  })

  it('getBreakpointsDown works', async () => {
    expect(getBreakpointsDown()).toEqual(['xs', 'sm', 'md', 'lg', ''])
    // Should return a deep clone
    expect(getBreakpointsDown()).not.toBe(getBreakpointsDown())
  })
})
