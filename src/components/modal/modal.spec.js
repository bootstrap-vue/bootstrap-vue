import {loadFixture, testVM} from '../../../tests/utils'

describe('modal', async () => {
  beforeEach(loadFixture(__dirname, 'modal'))
  testVM()
})
