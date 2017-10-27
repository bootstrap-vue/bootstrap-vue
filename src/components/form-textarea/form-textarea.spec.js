import {loadFixture, testVM} from '../../utils/helpers';

describe('form-textarea', async() => {
    beforeEach(loadFixture('form-textarea'));
    testVM();
});
