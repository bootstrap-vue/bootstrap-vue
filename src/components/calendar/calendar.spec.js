import { mount } from '@vue/test-utils'
import { BCalendar } from './calendar'

describe('calendar', () => {
  it('works', async () => {
    const wrapper = mount(BCalendar)

    expect (wrapper.isVueInstance()).toBe(true)

    wrapper.destroy()
  })
})
