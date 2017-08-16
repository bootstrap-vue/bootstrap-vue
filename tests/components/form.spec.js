import { loadFixture, testVM } from "../helpers";

describe("form", async () => {
    beforeEach(loadFixture("form"));
    testVM();

    it("default should have tag form", async () => {
        const { app: { $refs } } = window;
        expect($refs.default).toBeElement("form");
    });

});
