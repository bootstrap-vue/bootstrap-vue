import {loadFixture, testVM} from '../../../tests/utils'

describe('form-file', async () => {
  beforeEach(loadFixture(__dirname, 'form-file'))
  testVM()
})
