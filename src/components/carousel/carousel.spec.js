import {loadFixture, testVM} from "../../utils/helpers";

describe('carousel', async() => {
    beforeEach(loadFixture('carousel'));
    testVM();
});
