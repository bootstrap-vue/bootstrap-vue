import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils';

describe('carousel', async() => {
    beforeEach(loadFixture(__dirname, 'carousel'));
    testVM();
});
