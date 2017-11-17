import {loadFixture, testVM} from '../../../tests/utils'

describe('navbar', async () => {
  beforeEach(loadFixture(__dirname, 'navbar'))
  testVM()
})
