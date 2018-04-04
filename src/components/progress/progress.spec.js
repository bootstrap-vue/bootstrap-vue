import {loadFixture, testVM} from '../../../tests/utils'

describe('progress', async () => {
  beforeEach(loadFixture(__dirname, 'progress'))
  testVM()
})
