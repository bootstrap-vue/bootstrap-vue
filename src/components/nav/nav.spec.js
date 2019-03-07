import { loadFixture, testVM } from '../../../tests/utils'

describe('nav', () => {
  beforeEach(loadFixture(__dirname, 'nav'))
  testVM()
})
