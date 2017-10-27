import {loadFixture, testVM} from '../helpers';

describe('form-textarea', async() => {
    beforeEach(loadFixture('form-textarea'));
    testVM();
});
