import {loadFixture, testVM} from '../../../tests/utils'

describe('media', async () => {
  beforeEach(loadFixture(__dirname, 'media'))
  testVM()
})
