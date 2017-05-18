import {loadFixture, testVM} from '../helpers';

describe('breadcrumb', async() => {
    beforeEach(loadFixture('breadcrumb'));
    testVM();
});