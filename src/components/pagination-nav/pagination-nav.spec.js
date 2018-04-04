import {loadFixture, testVM} from '../../../tests/utils'

describe('pagination-nav', async () => {
  beforeEach(loadFixture(__dirname, 'pagination-nav'))
  testVM()
})
