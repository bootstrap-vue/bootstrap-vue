import {loadFixture, testVM} from '../helpers';

describe('media', async() => {
    beforeEach(loadFixture('media'));
    testVM();
});