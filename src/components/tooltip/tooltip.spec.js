import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('tooltip', async() => {
    beforeEach(loadFixture('tooltip'));
    testVM();
});
