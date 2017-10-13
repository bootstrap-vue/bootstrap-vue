import { loadFixture, testVM, nextTick } from "../helpers";

describe("dropdown", async () => {
    beforeEach(loadFixture("dropdown"));
    testVM();

    it("should work", async () => {
        const { app: { $refs } } = window;
        const dds = Object.keys($refs).map(ref => $refs[ref]);

        dds.forEach(dd => {
            expect(dd._isVue).toBe(true);
            expect(dd).toHaveClass("dropdown");
        });
    });

    it("should work with shorthand component tag names", async () => {
        const { app: { $refs } } = window;
        const { dd_5 } = $refs;

        expect(dd_5).toBeComponent("b-dd");
    });

    it("should open only one dropdown at a time", async () => {
        const { app: { $refs } } = window;
        const dds = Object.keys($refs).map(ref => $refs[ref].$el);

        // Without async iterators, just use a for loop.
        for (let i = 0; i < dds.length; i++) {
            Array.from(dds[i].children)
                .find(node => node.tagName === "BUTTON" && node.id.includes("_BV_toggle_"))
                .click();
            // Await the next render after click triggers dropdown.
            await nextTick();
            const openDds = dds.filter(dd => dd.classList.contains("show"));
            expect(openDds.length).toBe(1);
        }
    });

    it("should not have a toggle when hidde-toggle is true", async () => {
        const { app: { $refs } } = window;
        const { dd_7 } = $refs;

        const toggle = Array.from(dd_7.$el.children)
            .find(node => node.tagName === "BUTTON" && node.id.includes("BV_toggle_"));
        expect(toggle).not.toHaveClass("dropdown-toggle");
    });

    it("should have a toggle when hide-toggle and split are true", async () => {
        const { app: { $refs } } = window;
        const { dd_8 } = $refs;

        const toggle = Array.from(dd_8.$el.children)
            .find(node => node.tagName === "BUTTON" && node.id.includes("BV_toggle_"));
        expect(toggle).toHaveClass("dropdown-toggle");
    });

    it('dd-item should render as link by default', async () => {
        const {app: {$refs}} = window;
        const {dd_6} = $refs;

        expect(Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'link')).toBeElement('a');
    });

    it('dd-item-button should render as button', async () => {
        const {app: {$refs}} = window;
        const {dd_6} = $refs;

        expect(Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'button')).toBeElement('button');
    });

    it('dd-item-button should emit click event', async () => {
        const {app: {$refs}} = window;
        const {dd_6} = $refs;

        const spy = jest.fn();

        dd_6.$parent.$root.$on('clicked::link', spy);

        const buttonItem = Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'button');
        buttonItem.click();

        expect(spy).toHaveBeenCalled();
    });

    it('dd-divider should render', async () => {
        const {app: {$refs}} = window;
        const {dd_6} = $refs;

        expect(Array.from(dd_6.$refs.menu.children).filter(node => node.classList.contains('dropdown-divider')).length).toBe(1);
    });
});
