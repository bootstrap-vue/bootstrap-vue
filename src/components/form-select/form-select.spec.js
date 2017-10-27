import {loadFixture, testVM} from '../../utils/helpers';

describe('form-select', async() => {
    beforeEach(loadFixture('form-select'));
    testVM();
});
