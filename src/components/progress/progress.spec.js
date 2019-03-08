import { loadFixture, testVM } from '../../../tests/utils'

describe('progress', () => {
  beforeEach(loadFixture(__dirname, 'progress'))
  testVM()
})
