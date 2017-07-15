import { loadFixture, testVM, nextTick } from "../helpers";
import { keys } from "../../lib/utils/object";

describe("dropdown", async () => {
    beforeEach(loadFixture("dropdown"));
    testVM();

    it("should work", async () => {
        const { app: { $refs } } = window;
        const dds = keys($refs).map(ref => $refs[ref]);

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
        const dds = keys($refs).map(ref => $refs[ref].$el);

        // Without async iterators, just use a for loop.
        for (let i = 0; i < dds.length; i++) {
            Array.from(dds[i].children)
                .find(node => node.tagName === "BUTTON" && node.classList.contains("dropdown-toggle"))
                .click();
            // Await the next render after click triggers dropdown.
            await nextTick();
            const openDds = dds.filter(dd => dd.classList.contains("show"));
            expect(openDds.length).toBe(1);
        }
    });
});
