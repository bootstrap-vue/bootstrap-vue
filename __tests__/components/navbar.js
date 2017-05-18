import {loadFixture, testVM} from '../helpers';

describe('navbar', async() => {
    beforeEach(loadFixture('navbar'));
    testVM();
});