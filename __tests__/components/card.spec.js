import {loadFixture, testVM} from '../helpers';

describe('card', async() => {
    beforeEach(loadFixture('card'));
    testVM();
});