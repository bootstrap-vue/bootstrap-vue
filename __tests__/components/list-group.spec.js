import {loadFixture, testVM} from '../helpers';

describe('list-group', async() => {
    beforeEach(loadFixture('list-group'));
    testVM();
});