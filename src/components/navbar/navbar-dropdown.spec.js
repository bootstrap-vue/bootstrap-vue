import { loadFixture, testVM } from '../../../tests/utils'

describe('navbar', () => {
  beforeEach(loadFixture(__dirname, 'navbar'))
  testVM()

  it('should have custom toggle class in nav-item-dropdown', async () => {
    const {
      app: { $refs }
    } = window
    const extraClass = $refs.extraToggleClasses
    expect(extraClass).toBeDefined()
    expect(extraClass.$refs.toggle).toBeDefined()
    expect(extraClass.$refs.toggle).toHaveAllClasses([
      'nav-link',
      'dropdown-toggle',
      'nav-link-custom'
    ])
  })
})
