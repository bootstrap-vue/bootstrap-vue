import {loadFixture, nextTick, testVM} from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel-focus'))
  testVM()

  it('Should focus on next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const nextButton = carousel.$el.querySelector('.carousel-control-next')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()
    const spyFocus = jest.fn()

    carousel.setFocus = spyFocus

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
      expect(carousel.setFocus).toHaveBeenCalled()
    })
  })

  it('Should focus on next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const nextButton = carousel.$el.querySelector('.carousel-control-next')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()
    const spyFocus = jest.fn()

    carousel.setFocus = spyFocus

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    app.focus = false

    await nextTick()

    nextButton.click()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalledWith(1)
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(app.slide)
      expect(carousel.isSliding).toBe(false)
      expect(carousel.setFocus).not.toHaveBeenCalled()
    })
  })
})
