import { loadFixture, testVM } from "../helpers"

describe("button-group", async () => {
    beforeEach(loadFixture("button-group"))
    testVM()

    const btnRefs = ["basic", "vertical", "size"]

    it("should contain base class", async () => {
        const { app: { $refs } } = window

        btnRefs.forEach(ref => {
            expect($refs[ref]).toHaveClass("btn-group")
        })
    })

    it("should apply vertical class", async () => {
        const { app: { $refs } } = window

        expect($refs.vertical).toHaveClass("btn-group-vertical")
    })

    it("should apply size class", async () => {
        const { app: { $refs } } = window

        expect($refs.size).toHaveClass("btn-group-sm")
    })
})
