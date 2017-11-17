import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils';

describe("form-feedback", async () => {
    beforeEach(loadFixture(__dirname, "form-feedback"));
    testVM();

    it("default should have tag div", async () => {
        const { app: { $refs } } = window;
        expect($refs.default).toBeElement("div");
    });

    it("default should contain base class", async () => {
        const { app: { $refs } } = window;
        expect($refs.default).toHaveClass("invalid-feedback");
    });

});
