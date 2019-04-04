import { loadFixture, nextTick, testVM, setData } from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', () => {
  beforeEach(loadFixture(__dirname, 'carousel'))
  testVM()
  it('should emit paused and unpaused events when interval changed to 0', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spy1 = jest.fn()
    const spy2 = jest.fn()

    carousel.$on('unpaused', spy1)
    carousel.$on('paused', spy2)

    expect(carousel.interval).toBe(0)
    expect(carousel.isPaused).toBe(true)

    jest.runOnlyPendingTimers()
    await nextTick()
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    await setData(app, 'interval', 1000)
    await app.$nextTick()
    jest.runOnlyPendingTimers()
    expect(carousel.interval).toBe(1000)
    expect(carousel.isPaused).toBe(false)
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()
    await nextTick()

    await setData(app, 'interval', 0)
    await app.$nextTick()
    jest.runOnlyPendingTimers()
    expect(carousel.interval).toBe(0)
    expect(carousel.isPaused).toBe(true)
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)

    jest.runOnlyPendingTimers()
    await nextTick()

    await setData(app, 'interval', 1000)
    await app.$nextTick()
    jest.runOnlyPendingTimers()
    expect(carousel.interval).toBe(1000)
    expect(carousel.isPaused).toBe(false)
    expect(spy1).toHaveBeenCalledTimes(2)
    expect(spy2).toHaveBeenCalledTimes(1)
  })
})
