import {loadFixture, testVM} from '../../../tests/utils'

describe('tooltip', async () => {
  beforeEach(loadFixture(__dirname, 'tooltip'))
  testVM()
})
