import {loadFixture, testVM} from '../../../tests/utils'

describe('list-group', async () => {
  beforeEach(loadFixture(__dirname, 'list-group'))
  testVM()
})
