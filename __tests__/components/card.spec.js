import { loadFixture, testVM } from "../helpers"

describe("card", async () => {
    beforeEach(loadFixture("card"))
    testVM()

    it("should contain '.card-block' class in the default slot", async () => {
        const { app: { $refs } } = window

        const refs = ["simple_card", "standard_card", "img_card", "img_overlay_card"]

        refs.forEach(ref => {
            const childNodes = [...$refs[ref].childNodes]
            const cardBlock = childNodes.find(el => el.classList && el.classList.contains("card-block"))

            expect(cardBlock).toBeDefined()
        })
    })

    it("should not contain '.card-block' class if no-block specified", async () => {
        const { app: { $refs } } = window

        expect($refs.no_block.classList.contains("card-block")).toBe(false)
        expect($refs.no_block_default_slot).toEqual($refs.no_block.children[0])
    })

    it("should contain class names", async () => {
        const { app: { $refs } } = window

        expect($refs.simple_card).toHaveAllClasses(["card", "card-success", "card-inverse"])
        expect($refs.standard_card).toHaveClass("card")
        expect($refs.img_card).toHaveClass("card")
        expect($refs.img_overlay_card).toHaveAllClasses(["card", "card-inverse"])

        const blockEl = [...$refs.img_overlay_card.childNodes].find(
            el => el.classList && el.classList.contains("card-block")
        )

        expect(blockEl.classList.contains("card-img-overlay")).toBe(true)
    })

    it("should contain text content", async () => {
        const { app: { $refs } } = window

        expect($refs.simple_card.textContent).toContain("Simple Card")
        expect($refs.standard_card.textContent).toContain("Last updated 3 mins ago")
        expect($refs.img_card.textContent).toContain("This is my opinion :)")
        expect($refs.img_overlay_card.textContent).toContain("Overlay cards are cute!")
    })

    it("standard_card should display card header", async () => {
        const { app: { $refs } } = window

        const childNodes = [...$refs.standard_card.childNodes]
        const headerEl = childNodes.find(el => el.classList && el.classList.contains("card-header"))

        expect(headerEl).toBeDefined()
        expect(headerEl.textContent).toContain(app.headerText)
    })

    it("standard_card should display card footer", async () => {
        const { app: { $refs } } = window

        const childNodes = [...$refs.standard_card.childNodes]
        const footerEl = childNodes.find(el => el.classList && el.classList.contains("card-footer"))
        const footerText = "Last updated 3 mins ago"

        expect(footerEl).toBeDefined()
        expect(footerEl.textContent).toContain(footerText)
    })

    it("should contain <img> with matching src", async () => {
        const { app: { $refs } } = window

        const refsWithImg = ["img_card", "img_overlay_card"]

        refsWithImg.forEach((ref, i) => {
            const node = $refs[ref]
            const src = app["img" + i]
            const childNodes = [...node.childNodes]
            const imgEl = childNodes.find(el => el.tagName && el.tagName === "IMG")

            expect(imgEl).toBeDefined()
            expect(imgEl.src).toEqual(src)
        })
    })

    it("should use the 'tag' for element tag", async () => {
        const { app: { $refs } } = window
        const $titleCard = $refs.card_group.querySelector("#title-tag-test")
        // Card ref -> .card-block -> title el
        expect($titleCard).toBeElement("article")
    })

    it("should use the 'title-tag' for element tag", async () => {
        const { app: { $refs } } = window
        const $titleCard = $refs.card_group.querySelector("#title-tag-test")
        // Card ref -> .card-block -> title el
        expect($titleCard.children[0].children[0]).toBeElement("h1")
    })

    it("should use the 'sub-title-tag' for element tag", async () => {
        const { app: { $refs } } = window
        const $subtitleCard = $refs.card_group.querySelector("#sub-title-tag-test")
        // Card ref -> .card-block -> subtitle el
        expect($subtitleCard.children[0].children[0]).toBeElement("h2")
    })

    it("CardGroup: should apply '.card-group' class", async () => {
        const { app: { $refs } } = window

        expect($refs.card_group.classList.contains("card-group")).toBe(true)
    })

    it("CardGroup: should use the 'tag' for element tag", async () => {
        const { app: { $refs } } = window

        expect($refs.card_group).toBeElement("section")
    })
})
