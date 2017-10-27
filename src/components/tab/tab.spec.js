import {loadFixture, testVM} from '../helpers';

describe('tab', async() => {
    beforeEach(loadFixture('tab'));
    testVM();
});