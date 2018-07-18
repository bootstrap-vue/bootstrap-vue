import {loadFixture, nextTick, testVM} from '../../../tests/utils'

const DIRECTION = {
  next: {
    dirClass: 'carousel-item-left',
    overlayClass: 'carousel-item-next'
  },
  prev: {
    dirClass: 'carousel-item-right',
    overlayClass: 'carousel-item-prev'
  }
}

jest.useFakeTimers()

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel-wrap'))
  testVM()

  it('Should scroll with prev direction from last to first', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    app.slide = carousel.slides.length - 1
    await nextTick()
    const direction = carousel.calcDirection(null, app.slide, 0)
    expect(direction).toEqual(DIRECTION.prev)
  })

  it('Should scroll with next direction from last to first', async () => {
    const { app } = window
    const carousel = app.$refs.carousel

    app.wrap = true
    app.slide = carousel.slides.length - 1

    await nextTick()
    const direction = carousel.calcDirection(null, app.slide, 0)
    expect(direction).toEqual(DIRECTION.next)
  })
})
