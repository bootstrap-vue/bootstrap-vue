import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";
describe('form-file', async() => {
    beforeEach(loadFixture('form-file'));
    testVM();
});
