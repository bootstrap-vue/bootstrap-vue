import {loadFixture, nextTick, testVM} from '../../../tests/utils'

jest.useFakeTimers()

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel-pause'))
  testVM()

  it('Should not auto scroll to next slide on mouse enter', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    app.pause = false
    carousel.mouseEnter()

    await nextTick()

    app.$nextTick(() => {
      expect(spyBegin).toHaveBeenCalledWith(1)
      expect(carousel.isSliding).toBe(true)
    })
  })

  it('Should auto scroll to next slide on mouse enter', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    const spyBegin = jest.fn()
    const spyEnd = jest.fn()

    carousel.$on('sliding-start', spyBegin)
    carousel.$on('sliding-end', spyEnd)

    app.pause = true
    carousel.mouseEnter()

    await nextTick()

    app.$nextTick(() => {
      expect(spyBegin).not.toHaveBeenCalled()
      expect(carousel.isSliding).toBe(false)
    })
  })
})
