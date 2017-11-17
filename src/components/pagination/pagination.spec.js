import {loadFixture, testVM} from '../../../tests/utils'

describe('pagination', async () => {
  beforeEach(loadFixture(__dirname, 'pagination'))
  testVM()
})
