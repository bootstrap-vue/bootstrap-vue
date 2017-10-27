import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('form-select', async() => {
    beforeEach(loadFixture('form-select'));
    testVM();
});
