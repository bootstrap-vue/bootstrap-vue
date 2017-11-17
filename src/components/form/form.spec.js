import { loadFixture, testVM } from '../../../tests/utils'

describe('form', async () => {
  beforeEach(loadFixture(__dirname, 'form'))
  testVM()
})
