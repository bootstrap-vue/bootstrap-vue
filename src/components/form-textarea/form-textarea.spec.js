import {loadFixture, testVM} from '../../../tests/utils'

describe('form-textarea', async () => {
  beforeEach(loadFixture(__dirname, 'form-textarea'))
  testVM()
})
