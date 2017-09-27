import {loadFixture, testVM} from '../helpers';

describe('popover', async() => {
    beforeEach(loadFixture('popover'));
    testVM();
});