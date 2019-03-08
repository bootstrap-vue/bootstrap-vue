import { loadFixture, testVM } from '../../../tests/utils'

describe('media', () => {
  beforeEach(loadFixture(__dirname, 'media'))
  testVM()
})
