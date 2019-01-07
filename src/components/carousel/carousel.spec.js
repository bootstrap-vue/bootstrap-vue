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
    const prevButton = carousel.$el.querySelector('.carousel-control-prev')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    prevButton.click()

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
    const indicators = carousel.$el.querySelectorAll('.carousel-indicators > li')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    indicators[2].click()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalled()
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(2)
      expect(carousel.isSliding).toBe(false)
    })
  })

  it('Next button works with keypress space', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const nextButton = carousel.$el.querySelector('.carousel-control-next')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    const event = new KeyboardEvent('keydown', { keyCode: 32 })
    nextButton.dispatchEvent(event)

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

  it('Prev button works with keypress space', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const prevButton = carousel.$el.querySelector('.carousel-control-prev')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    const event = new KeyboardEvent('keydown', { keyCode: 32 })
    prevButton.dispatchEvent(event)

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

  it('Indicators work with keypress space', async () => {
    const { app } = window
    const carousel = app.$refs.carousel
    const indicators = carousel.$el.querySelectorAll('.carousel-indicators > li')

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    const event = new KeyboardEvent('keydown', { keyCode: 32 })
    indicators[2].dispatchEvent(event)

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalled()
      expect(carousel.isSliding).toBe(true)
    })

    jest.runAllTimers()

    app.$nextTick(() => {
      expect(spyEnd).toHaveBeenCalledWith(2)
      expect(carousel.isSliding).toBe(false)
    })
  })

  it('Arrow right keypress triggers next slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    const event = new KeyboardEvent('keydown', { keyCode: 39 })
    carousel.$el.dispatchEvent(event)

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

  it('Arrow left keypress triggers prev slide', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    const event = new KeyboardEvent('keydown', { keyCode: 37 })
    carousel.$el.dispatchEvent(event)

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
})
