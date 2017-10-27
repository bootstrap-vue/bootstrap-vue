import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('form-radio', async() => {
    beforeEach(loadFixture('form-radio'));
    testVM();
});
