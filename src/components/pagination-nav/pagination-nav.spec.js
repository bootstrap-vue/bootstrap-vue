import { loadFixture, testVM } from '../../../tests/utils'

describe('pagination-nav', () => {
  beforeEach(loadFixture(__dirname, 'pagination-nav'))
  testVM()
})
