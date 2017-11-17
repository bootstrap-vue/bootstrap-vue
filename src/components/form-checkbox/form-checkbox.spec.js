import {loadFixture, testVM} from '../../../tests/utils'

describe('form-checkbox', async () => {
  beforeEach(loadFixture(__dirname, 'form-checkbox'))
  testVM()
})
