import { loadFixture, testVM } from '../../../tests/utils'

describe('carousel', async () => {
  beforeEach(loadFixture(__dirname, 'carousel'))
  testVM()
})
