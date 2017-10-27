import {loadFixture, testVM} from '../../utils/helpers';

describe('list-group', async() => {
    beforeEach(loadFixture('list-group'));
    testVM();
});
