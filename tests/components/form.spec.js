import { loadFixture, testVM } from "../helpers";

describe("form-feedback", async () => {
    beforeEach(loadFixture("form-feedback"));
    testVM();

    it("default should have tag form", async () => {
        const { app: { $refs } } = window;
        expect($refs.default).toBeElement("div");
    });

});
