import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";
describe('form-input', async() => {
    beforeEach(loadFixture('form-input'));
    testVM();
});
