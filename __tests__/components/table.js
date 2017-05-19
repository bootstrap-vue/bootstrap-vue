import {loadFixture, testVM} from '../helpers';

describe('table', async() => {
    beforeEach(loadFixture('table'));
    testVM();
});