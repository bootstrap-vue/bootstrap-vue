import {loadFixture, testVM} from '../helpers';

describe('form-select', async() => {
    beforeEach(loadFixture('form-select'));
    testVM();
});