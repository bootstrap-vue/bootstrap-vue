import {loadFixture, testVM} from '../../../tests/utils'

describe('popover', async () => {
  beforeEach(loadFixture(__dirname, 'popover'))
  testVM()
})
