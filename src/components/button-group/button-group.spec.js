import { loadFixture, testVM } from '../../../tests/utils'

describe('button-group', () => {
  beforeEach(loadFixture(__dirname, 'button-group'))
  testVM()

  it('basic should contain base class', async () => {
    const {
      app: { $refs }
    } = window

    expect($refs.basic).toHaveClass('btn-group')
  })

  it('should apply vertical class', async () => {
    const {
      app: { $refs }
    } = window

    expect($refs.vertical).toHaveClass('btn-group-vertical')
  })

  it('should apply size class', async () => {
    const {
      app: { $refs }
    } = window

    expect($refs.size).toHaveClass('btn-group-sm')
  })
})
