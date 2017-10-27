import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";
describe('form-group', async() => {
    beforeEach(loadFixture('form-group'));
    testVM();
});
