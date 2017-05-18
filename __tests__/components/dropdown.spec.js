import {loadFixture, testVM} from '../helpers';

describe('dropdown', async() => {
    beforeEach(loadFixture('dropdown'));
    testVM();
});