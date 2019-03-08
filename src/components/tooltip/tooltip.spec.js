import { loadFixture, testVM } from '../../../tests/utils'

describe('tooltip', () => {
  beforeEach(loadFixture(__dirname, 'tooltip'))
  testVM()
})
