import { loadFixture, testVM } from "../../utils/helpers";
import regeneratorRuntime from "regenerator-runtime";
describe("form", async () => {
    beforeEach(loadFixture("form"));
    testVM();
});
