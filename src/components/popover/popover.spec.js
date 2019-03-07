import { loadFixture, testVM } from '../../../tests/utils'

describe('popover', () => {
  beforeEach(loadFixture(__dirname, 'popover'))
  testVM()
})
