import {loadFixture, testVM} from '../../../tests/utils'

describe('form-radio', async () => {
  beforeEach(loadFixture(__dirname, 'form-radio'))
  testVM()
})
