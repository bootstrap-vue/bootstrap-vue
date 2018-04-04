import {loadFixture, testVM} from '../../../tests/utils'

describe('nav', async () => {
  beforeEach(loadFixture(__dirname, 'nav'))
  testVM()
})
