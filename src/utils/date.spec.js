import {
  parseYMD,
  formatYMD,
  datesEqual,
  firstDateOfMonth,
  lastDayOfMonth,
  oneMonthAgo,
  oneMonthAhead
} from './date'

describe('utils/date', () => {
  it('parseYMD works', async () => {
    const date1 = parseYMD('2020-01-15')
    const date2 = new Date(2020, 0, 15)

    expect(date1.toISOString()).toEqual(date2.toISOString())
    expect(parseYMD('yyyy-mm-dd')).toEqual(null)
  })

  it('formatYMD works', async () => {
    expect(formatYMD(new Date(2020, 0, 15))).toEqual('2020-01-15')
    expect(formatYMD('2020-01-15')).toEqual('2020-01-15')
    expect(formatYMD('2020-01-32')).toEqual('2020-02-01')
    expect(formatYMD('adsadsad')).toEqual(null)
    expect(formatYMD('x2020-01-15')).toEqual(null)
  })

  it('datesEqual works', async () => {
    expect(datesEqual('2020-01-15', '2020-01-15')).toBe(true)
    expect(datesEqual('2020-01-15', '2020-12-15')).toBe(false)
    expect(datesEqual(new Date(2020, 0, 15), '2020-12-15')).toBe(false)
    expect(datesEqual(new Date(2020, 0, 15), new Date(2020, 0, 15, 5, 4, 3))).toBe(true)
    expect(datesEqual('2020-01-15', new Date(2020, 0, 15))).toBe(true)
    expect(datesEqual('2020-02-15', new Date(2020, 0, 15))).toBe(false)
  })

  it('firstDateOfMonth works', async () => {
    expect(formatYMD(firstDateOfMonth(createDate(2020, 1, 3)))).toEqual('2020-02-01')
    expect(formatYMD(firstDateOfMonth(createDate(2020, 0, 3)))).toEqual('2020-01-01')
    expect(formatYMD(firstDateOfMonth(createDate(2020, 10, 3)))).toEqual('2020-11-01')
    expect(formatYMD(firstDateOfMonth(createDate(2020, 11, 3)))).toEqual('2020-12-01')
  })

  it('lastDateOfMonth works', async () => {
    expect(formatYMD(lastDateOfMonth(createDate(2020, 1, 3)))).toEqual('2020-02-29')
    expect(formatYMD(lastDateOfMonth(createDate(2020, 0, 3)))).toEqual('2020-01-31')
    expect(formatYMD(lastDateOfMonth(createDate(2020, 10, 3)))).toEqual('2020-11-30')
    expect(formatYMD(lastDateOfMonth(createDate(2020, 11, 3)))).toEqual('2020-12-31')
  })

  it('oneMonthAgo works', async () => {
    expect(formatYMD(oneMonthAgo(createDate(2020, 1, 3)))).toEqual('2020-01-03')
    expect(formatYMD(oneMonthAgo(createDate(2020, 2, 28)))).toEqual('2020-02-28')
    expect(formatYMD(oneMonthAgo(createDate(2020, 2, 31)))).toEqual('2020-02-29')
    expect(formatYMD(oneMonthAgo(createDate(2020, 11, 30)))).toEqual('2020-11-30')
    expect(formatYMD(oneMonthAgo(createDate(2020, 11, 31)))).toEqual('2020-11-30')
  })

  it('oneMonthAhead works', async () => {
    expect(formatYMD(oneMonthAhead(createDate(2020, 1, 3)))).toEqual('2020-03-03')
    expect(formatYMD(oneMonthAhead(createDate(2020, 2, 28)))).toEqual('2020-04-28')
    expect(formatYMD(oneMonthAhead(createDate(2020, 2, 31)))).toEqual('2020-04-30')
    expect(formatYMD(oneMonthAhead(createDate(2020, 9, 31)))).toEqual('2021-11-30')
    expect(formatYMD(oneMonthAhead(createDate(2020, 11, 30)))).toEqual('2021-01-30')
    expect(formatYMD(oneMonthAhead(createDate(2020, 11, 31)))).toEqual('2021-01-31')
  })
})
