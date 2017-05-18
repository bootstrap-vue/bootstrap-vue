import {loadFixture, testVM} from '../helpers';

describe('collapse', async() => {
    beforeEach(loadFixture('collapse'));
    testVM();
});