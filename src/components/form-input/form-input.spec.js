import {loadFixture, testVM} from '../../../tests/utils'

describe('form-input', async () => {
  beforeEach(loadFixture(__dirname, 'form-input'))
  testVM()
})
