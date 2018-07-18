import {loadFixture, nextTick, testVM} from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel-pause'))
  testVM()

  it('Should scroll to next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spy = jest.fn()

    carousel.$on('sliding-start', spy)

    jest.runOnlyPendingTimers()
    await nextTick()
    expect(spy).toHaveBeenCalled()
  })

  it('Should not auto scroll to next slide on mouse enter', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    carousel.$emit('mouseenter')

    app.$nextTick(() => {
      expect(spyBegin).not.toHaveBeenCalled()
      expect(carousel.isSliding).toBe(false)
    })

    carousel.$emit('mouseleave')

    jest.runOnlyPendingTimers()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalledWith(1)
      expect(carousel.isSliding).toBe(true)
    })
  })
})
