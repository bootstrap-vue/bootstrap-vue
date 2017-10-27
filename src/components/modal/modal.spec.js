import {loadFixture, testVM} from '../../utils/helpers';

describe('modal', async() => {
    beforeEach(loadFixture('modal'));
    testVM();
});
