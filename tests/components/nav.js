import {loadFixture, testVM} from '../helpers';

describe('nav', async() => {
    beforeEach(loadFixture('nav'));
    testVM();
});