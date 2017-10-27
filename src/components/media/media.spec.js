import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('media', async() => {
    beforeEach(loadFixture('media'));
    testVM();
});
