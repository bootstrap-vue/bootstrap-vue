import {loadFixture, testVM} from '../helpers';

describe('jumbotron', async() => {
    beforeEach(loadFixture('jumbotron'));
    testVM();
});