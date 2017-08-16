import { loadFixture, testVM } from "../helpers";

describe("form", async () => {
    beforeEach(loadFixture("form"));
    testVM();
});
