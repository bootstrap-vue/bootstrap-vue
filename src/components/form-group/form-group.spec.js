import { loadFixture, testVM } from '../../../tests/utils'

describe('form-group', () => {
  beforeEach(loadFixture(__dirname, 'form-group'))
  testVM()
})
