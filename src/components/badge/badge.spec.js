import { loadFixture, testVM } from '../../../tests/utils'

const variantList = ['secondary', 'primary', 'success', 'info', 'warning', 'danger', 'dark', 'light'].map(variant => {
  return { ref: `badge_${variant}`, variant }
})

describe('badge', async () => {
  beforeEach(loadFixture(__dirname, 'badge'))
  testVM()

  it('should apply variant classes', async () => {
    const { app: { $refs } } = window

    expect($refs.badge_pill).toHaveAllClasses(['badge', 'badge-pill'])

    variantList.forEach(({ ref, variant }) => {
      const vm = $refs[ref][0]
      expect(vm).toHaveAllClasses(['badge', `badge-${variant}`])
    })
  })

  it('should apply secondary class when not passed variant', async () => {
    const { app: { $refs } } = window

    const vm = $refs.no_props
    expect(vm).toHaveClass('badge-secondary')
  })

  it('should not apply pill class when not passed pill boolean prop', async () => {
    const { app: { $refs } } = window

    const vm = $refs.no_props
    expect(vm).not.toHaveClass('badge-pill')
  })
})
