import {loadFixture, testVM} from '../../utils/helpers';

describe('nav', async() => {
    beforeEach(loadFixture('nav'));
    testVM();
});
