import {loadFixture, testVM} from '../helpers';

describe('modal', async() => {
    beforeEach(loadFixture('modal'));
    testVM();
});