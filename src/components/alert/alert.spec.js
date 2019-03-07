import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils'

describe('alert', () => {
  jest.useFakeTimers()

  beforeEach(loadFixture(__dirname, 'alert'))
  testVM()

  it('visible alerts have class names', async () => {
    const { app } = window

    expect(app.$refs.default_alert).toHaveClass('alert alert-info')
    expect(app.$refs.success_alert).toHaveClass('alert alert-success')
  })

  it('show prop set to true displays hidden alert', async () => {
    const { app } = window

    // Default is hidden
    expect(app.$el.textContent).not.toContain('Dismissible Alert!')

    // Make visible by changing visible state
    await setData(app, 'showDismissibleAlert', true)
    expect(app.$el.textContent).toContain('Dismissible Alert!')
  })

  it('dismiss should have class alert-dismissible', async () => {
    const { app } = window
    const alert = app.$refs.success_alert
    expect(alert).toHaveClass('alert-dismissible')
  })

  it('dismiss should have close button', async () => {
    const { app } = window
    const alert = app.$refs.success_alert
    const closeBtn = alert.$el.querySelector('.close')
    expect(closeBtn).not.toBeNull()
    expect(closeBtn.tagName).toBe('BUTTON')
  })

  it('dismiss button click should close alert', async () => {
    const { app } = window
    const alert = app.$refs.success_alert
    // const closeBtn = alert.$el.querySelector('.close')
    // This line causes Jest to puke for some reason????
    // closeBtn.click()
    // But this line works instead (which i what click calls)
    alert.dismiss()
    await nextTick()
    expect(app.$el.textContent).not.toContain('Success Alert')
  })

  it('dismiss countdown emits dismiss-count-down event', async () => {
    const { app } = window
    const alert = app.$refs.counter_alert
    const spy = jest.fn()

    // Default is hidden
    expect(app.$el.textContent).not.toContain('This alert will dismiss after')

    // Make visible by changing visible state
    const dismissTime = 5
    alert.$on('dismiss-count-down', spy)
    await setData(app, 'dismissCountDown', dismissTime)
    // await nextTick();
    expect(spy).not.toBeCalled()
    jest.runTimersToTime(1000)
    // Emits a dismiss-count-down` event
    expect(spy).toHaveBeenCalledWith(dismissTime - 1)
    // await nextTick();
    jest.runAllTimers()
    expect(app.$el.textContent).toContain('This alert will dismiss after')
    expect(spy.mock.calls.length).toBe(dismissTime + 1)
  })
})
