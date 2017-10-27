import {loadFixture, testVM} from '../helpers';

describe('pagination', async() => {
    beforeEach(loadFixture('pagination'));
    testVM();
});