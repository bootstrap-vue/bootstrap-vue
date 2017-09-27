import {loadFixture, testVM} from '../helpers';

describe('tooltip', async() => {
    beforeEach(loadFixture('tooltip'));
    testVM();
});