import { loadFixture, testVM } from "../../utils/helpers";

describe("form", async () => {
    beforeEach(loadFixture("form"));
    testVM();
});
