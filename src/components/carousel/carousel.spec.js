import {loadFixture, testVM} from '../helpers';

describe('carousel', async() => {
    beforeEach(loadFixture('carousel'));
    testVM();
});