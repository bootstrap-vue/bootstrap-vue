import {loadFixture, testVM} from '../helpers';

describe('button', async() => {
    beforeEach(loadFixture('button'));
    testVM();
});