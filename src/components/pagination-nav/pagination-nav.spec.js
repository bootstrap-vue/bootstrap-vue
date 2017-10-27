import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('pagination-nav', async() => {
    beforeEach(loadFixture('pagination-nav'));
    testVM();
});
