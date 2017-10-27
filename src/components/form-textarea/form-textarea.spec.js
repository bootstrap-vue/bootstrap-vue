import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('form-textarea', async() => {
    beforeEach(loadFixture('form-textarea'));
    testVM();
});
