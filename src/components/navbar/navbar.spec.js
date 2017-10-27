import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('navbar', async() => {
    beforeEach(loadFixture('navbar'));
    testVM();
});
