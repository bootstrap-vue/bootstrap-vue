import { loadFixture, testVM } from '../../../tests/utils'

describe('form', () => {
  beforeEach(loadFixture(__dirname, 'form'))
  testVM()
})
