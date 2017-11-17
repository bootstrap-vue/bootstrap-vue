import {loadFixture, testVM} from '../../../tests/utils'

describe('form-group', async () => {
  beforeEach(loadFixture(__dirname, 'form-group'))
  testVM()
})
