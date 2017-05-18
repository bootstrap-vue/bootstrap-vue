import {loadFixture, testVM} from '../helpers';

describe('badge', async() => {
    beforeEach(loadFixture('badge'));
    testVM();
});