import {loadFixture, testVM} from '../../../tests/utils'

describe('tab', async () => {
  beforeEach(loadFixture(__dirname, 'tabs'))
  testVM()
})
