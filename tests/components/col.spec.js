import { loadFixture, testVM } from "../helpers";

describe("col", async () => {
    beforeEach(loadFixture("col"));
    testVM();

    it("should apply '.col' when no props passed", async () => {
        const { $refs } = window.app;
        expect($refs.basic).toHaveClass("col");
    });

    it("should apply '.col-*' class with 'cols' prop", async () => {
        const { $refs } = window.app;
        $refs.cols.forEach((vnode, i) => {
            const size = i + 1;
            expect(vnode).toHaveClass(`col-${size}`);
            expect(vnode).not.toHaveClass("col");
        });
    });

    it("should apply '.offset-*' class with 'offset' prop", async () => {
        const { $refs } = window.app;
        $refs.offset.forEach((vnode, i) => {
            const size = i + 1;
            expect(vnode).toHaveClass(`offset-${size}`);
        });
    });

    it("should apply '.order-*' class with 'order' prop", async () => {
        const { $refs } = window.app;
        $refs.order.forEach((vnode, i) => {
            const size = i + 1;
            expect(vnode).toHaveClass(`order-${size}`);
        });
    });

    it("should apply breakpoint classes for 'col', 'offset', 'order' props", async () => {
        const { $refs } = window.app;
        for (const bkpt of ["sm", "md", "lg", "xl"]) {
            $refs[`multi-${bkpt}`].forEach((vnode, i) => {
                const size = i + 1;
                expect(vnode).toHaveAllClasses([
                    `col-${bkpt}-${size}`,
                    `offset-${bkpt}-${size}`,
                    `order-${bkpt}-${size}`
                ]);
                expect(vnode).not.toHaveClass("col");
            });
        }
    });

    it("should apply 'tag'", async () => {
        const { $refs } = window.app;
        expect($refs.tag).toBeElement("section");
    });
});
