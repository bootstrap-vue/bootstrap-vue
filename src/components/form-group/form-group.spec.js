import { loadFixture, testVM, setData, nextTick } from '../../../tests/utils'

describe('form-group', () => {
  beforeEach(loadFixture(__dirname, 'form-group'))
  testVM()

  it('app changes validation state when text supplied', async () => {
    const { app } = window
    const $group = app.$refs.group1

    expect($group.$el.getAttribute('aria-invalid')).toBe('true')

    const oldADB = $group.$el.getAttribute('aria-describedby')

    await setData(app, 'text', 'foobar doodle')
    await nextTick()

    expect($group.$el.getAttribute('aria-invalid')).toBe(null)

    const newADB = $group.$el.getAttribute('aria-describedby')

    expect(oldADB).not.toBe(newADB)
  })
})
