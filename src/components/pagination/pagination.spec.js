import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('pagination', async() => {
    beforeEach(loadFixture('pagination'));
    testVM();
});
