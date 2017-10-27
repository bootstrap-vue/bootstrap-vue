import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('progress', async() => {
    beforeEach(loadFixture('progress'));
    testVM();
});
