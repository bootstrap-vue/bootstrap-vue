import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('list-group', async() => {
    beforeEach(loadFixture('list-group'));
    testVM();
});
