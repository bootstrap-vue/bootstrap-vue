import { parseYMD, formatYMD, datesEqual } from './date'

describe('utils/date', () => {
  it('parseYMD works', async () => {
    const date1 = parseYMD('2020-01-15')
    const date2 = new Date(2020, 0, 15)
    expect(date1.toISOString()).toEqual(date1.toISOString())
  })

  it('formatYMD works', async () => {
    expect(formatYMD(new date(2020, 0, 15))).toEqual('2020-01-15')
    expect(formatYMD('2020-01-15')).toEqual('2020-01-15')
    expect(formatYMD('2020-01-32')).toEqual('2020-02-01')
  })

  it('datesEqual works', async () => {
    expect(datesEqual('2020-01-15', new Date(2020, 0, 15)).toBe(true)
    expect(datesEqual('2020-01-15', '2020-12-15')).toBe(false)
    expect(datesEqual( new Date(2020, 0, 15), new Date(2020, 0, 15, 5, 4, 3)).toBe(true)
  })
})
