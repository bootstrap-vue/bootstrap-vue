import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('tab', async() => {
    beforeEach(loadFixture('tab'));
    testVM();
});
