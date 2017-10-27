import { loadFixture, testVM } from "../../utils/helpers";
import regeneratorRuntime from "regenerator-runtime";

describe("form-feedback", async () => {
    beforeEach(loadFixture("form-feedback"));
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
