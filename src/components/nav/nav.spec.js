import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('nav', async() => {
    beforeEach(loadFixture('nav'));
    testVM();
});
