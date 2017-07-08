import { loadFixture, testVM } from "../helpers"

/**
 * Button functionality to test:
 * - Style variants: [ 'primary','secondary','success','outline-success','warning','danger','link' ]
 * - Sizes: [ 'sm','','lg' ]
 * - Props: [ disabled, block ]
 * - elements: [ <button/>, <a/> ]
 */

const colorVariants = ["primary", "secondary", "success", "warning", "danger"]
const outlineVariants = colorVariants.map(v => `outline-${v}`)
const variants = colorVariants.concat(outlineVariants, "link")
const sizes = ["sm", "", "lg"]

const btnRefs = variants.reduce(
    (memo, variant) => [
        ...memo,
        ...sizes.map(size => {
            return {
                variant,
                size,
                ref: `btn${size ? `_${size}` : ""}_${variant.replace(/-/g, "_")}`
            }
        })
    ],
    []
)

describe("button", async () => {
    beforeEach(loadFixture("button"))
    testVM()

    it("should contain class names", async () => {
        const { app: { $refs, $el } } = window

        btnRefs.forEach(({ ref, variant, size }) => {
            // ref will contain an array of children because of v-for
            const vm = $refs[ref][0]

            let classList = ["btn", `btn-${variant}`]
            if (size) classList.push(`btn-${size}`)

            expect(vm).toHaveAllClasses(classList)
        })

        const vmBlockDisabled = $refs.btn_block_disabled
        expect(vmBlockDisabled).toHaveAllClasses(["btn", "btn-block", "disabled"])
    })

    it("should use <a> when given href", async () => {
        const { app: { $refs, $el } } = window
        const btnRootNode = $refs.btn_href

        expect(btnRootNode).toBeElement("a")
        expect(btnRootNode.href).toBe("https://github.com/bootstrap-vue/bootstrap-vue")
    })

    it('should emit "click" event when clicked', async () => {
        const { app: { $refs } } = window
        const btn = $refs.btn_click
        const spy = jest.fn()

        btn.addEventListener("click", spy)
        btn.click()

        expect(spy).toHaveBeenCalled()
    })

    it('should "click" event should emit with native event object', async () => {
        const { app: { $refs } } = window
        const btn = $refs.btn_click
        let event = null

        btn.addEventListener("click", e => (event = e))
        btn.click()

        expect(event).toBeInstanceOf(MouseEvent)
    })

    it("should be disabled and not emit click event with `disabled` prop true", async () => {
        const { app: { $refs } } = window
        const btn = $refs.btn_block_disabled
        const spy = jest.fn()

        btn.addEventListener("click", spy)
        btn.click()

        expect(btn.disabled).toBe(true)
        expect(spy).not.toHaveBeenCalled()
    })
})
