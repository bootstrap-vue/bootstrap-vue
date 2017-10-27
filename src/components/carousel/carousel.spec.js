import {loadFixture, testVM} from "../../utils/helpers";
import regeneratorRuntime from "regenerator-runtime";
describe('carousel', async() => {
    beforeEach(loadFixture('carousel'));
    testVM();
});
