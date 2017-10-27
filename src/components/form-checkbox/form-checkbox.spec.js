import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";
describe('form-checkbox', async() => {
    beforeEach(loadFixture('form-checkbox'));
    testVM();
});
