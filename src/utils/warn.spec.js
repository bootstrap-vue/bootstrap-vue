import warn from './warn'

describe('utils/warn', () => {
  const dummyWarning = 'A Rush Of Blood To The Head'

  let originalProcess

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    originalProcess = global.process
  })

  afterEach(() => {
    console.warn.mockClear()
    global.process = originalProcess
  })

  describe('with BOOTSTRAP_VUE_NO_WARN environment variable set', () => {
    beforeEach(() => {
      global.process = {
        env: {
          BOOTSTRAP_VUE_NO_WARN: true
        }
      }
    })

    it('does not call console.warn()', () => {
      warn(dummyWarning)

      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe('without process object', () => {
    beforeEach(() => {
      delete global.process
    })

    it('calls console.warn()', () => {
      warn(dummyWarning)

      expect(console.warn).toHaveBeenCalledWith(`[BootstrapVue warn]: ${dummyWarning}`)
    })
  })
})
