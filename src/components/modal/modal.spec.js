import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('modal', async() => {
    beforeEach(loadFixture('modal'));
    testVM();
});
