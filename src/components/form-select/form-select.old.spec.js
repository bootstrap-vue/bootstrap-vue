import { loadFixture, testVM } from '../../../tests/utils'

describe('form-select', () => {
  beforeEach(loadFixture(__dirname, 'form-select'))
  testVM()
})
