import {loadFixture, testVM} from '../../utils/helpers';
import regeneratorRuntime from "regenerator-runtime";

describe('popover', async() => {
    beforeEach(loadFixture('popover'));
    testVM();
});
