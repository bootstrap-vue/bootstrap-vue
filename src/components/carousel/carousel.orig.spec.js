import { loadFixture, nextTick, testVM, setData } from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', () => {
  beforeEach(loadFixture(__dirname, 'carousel'))
  testVM()

  it('Should have class carousel and slide by default', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    expect(carousel.$el.classList.contains('carousel')).toBe(true)
    expect(carousel.$el.classList.contains('slide')).toBe(true)
    expect(carousel.$el.classList.contains('carousel-fade')).toBe(false)
  })

  it('Should have class carousel, slide and fade when prop fade=true', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    await setData(app, 'fade', true)
    await app.$nextTick()

    expect(carousel.$el.classList.contains('carousel')).toBe(true)
    expect(carousel.$el.classList.contains('slide')).toBe(true)
    expect(carousel.$el.classList.contains('carousel-fade')).toBe(true)
  })

  it('Should only have class carousel when no-animation=true', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    await setData(app, 'noAnimation', true)
    await app.$nextTick()

    expect(carousel.$el.classList.contains('carousel')).toBe(true)
    expect(carousel.$el.classList.contains('slide')).toBe(false)
    expect(carousel.$el.classList.contains('carousel-fade')).toBe(false)
  })

  it('Should only have class carousel when no-animation=true and fade=true', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    await setData(app, 'noAnimation', true)
    await setData(app, 'fade', true)
    await app.$nextTick()

    expect(carousel.$el.classList.contains('carousel')).toBe(true)
    expect(carousel.$el.classList.contains('slide')).toBe(false)
    expect(carousel.$el.classList.contains('carousel-fade')).toBe(false)
  })

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

    await nextTick()

    expect(spyBegin).toHaveBeenCalledWith(1)
    expect(carousel.isSliding).toBe(true)

    jest.runOnlyPendingTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalled()
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalled()
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(2)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalledWith(1)
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalled()
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalled()
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(2)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalledWith(1)
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
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

    await nextTick()

    expect(spyBegin).toHaveBeenCalled()
    expect(carousel.isSliding).toBe(true)

    jest.runAllTimers()
    await nextTick()

    expect(spyEnd).toHaveBeenCalledWith(app.slide)
    expect(carousel.isSliding).toBe(false)
  })

  it('should emit paused and unpaused events when interval hcanged to 0', async () => {
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
