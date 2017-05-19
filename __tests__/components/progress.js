import {loadFixture, testVM} from '../helpers';

describe('progress', async() => {
    beforeEach(loadFixture('progress'));
    testVM();
});