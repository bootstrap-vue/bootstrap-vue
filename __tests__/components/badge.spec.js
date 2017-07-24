import { loadFixture, testVM } from '../helpers'

const variantList = [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
].map(variant => {
    return { ref: `badge_${variant}`, variant }
})

describe('badge', async() => {
    beforeEach(loadFixture('badge'))
    testVM()

    it('should apply variant classes', async() => {
        const { app: { $refs, $el } } = window

        expect($refs.badge_pill).toHaveAllClasses(['badge', 'badge-pill'])

        variantList.forEach(({ ref, variant }) => {
            const vm = $refs[ref][0]
            expect(vm).toHaveAllClasses(['badge', `badge-${variant}`])
        })
    })

    it('should apply default pill class when not passed variant', async() => {
        const { app: { $refs, $el } } = window

        const vm = $refs.no_props
        expect(vm).toHaveClass('badge-default')
    })

    it('should not apply pill class when not passed pill boolean prop', async() => {
        const { app: { $refs, $el } } = window

        const vm = $refs.no_props
        expect(vm).not.toHaveClass('badge-pill')
    })
});
