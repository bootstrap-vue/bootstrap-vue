import { loadFixture, nextTick, testVM } from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel'))
  testVM()

  it('Should not scroll to next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spy = jest.fn()

    carousel.$on('sliding-end', spy)

    jest.runOnlyPendingTimers()
    await nextTick()
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should scroll to next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const nextButton = carousel.$el.querySelector('.carousel-control-next')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    nextButton.click()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalledWith(1)
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(app.slide)
      expect(carousel.isSliding).toBe(false)
    })
  })

  it('Should scroll to prev slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const nextButton = carousel.$el.querySelector('.carousel-control-prev')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    nextButton.click()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalled()
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(app.slide)
      expect(carousel.isSliding).toBe(false)
    })
  })

  it('Should scroll to specified slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    app.$refs.carousel.slide = 2

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalled()
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(2)
      expect(carousel.isSliding).toBe(false)
    })

    app.$refs.carousel.slide = 1

    app.$nextTick(() => {
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(carousel.isSliding).toBe(false)
    })
  })
})
