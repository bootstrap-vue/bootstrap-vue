import {loadFixture, testVM} from '../../../tests/utils'

describe('form-select', async () => {
  beforeEach(loadFixture(__dirname, 'form-select'))
  testVM()
})
