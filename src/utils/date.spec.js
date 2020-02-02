import {
  parseYMD,
  formatYMD,
  datesEqual,
  firstDateOfMonth,
  lastDateOfMonth,
  oneMonthAgo,
  oneMonthAhead,
  oneYearAgo,
  oneYearAhead
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
    // February 2020 was a leap year
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-02-03')))).toEqual('2020-02-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-02-29')))).toEqual('2020-02-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-01-03')))).toEqual('2020-01-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-11-03')))).toEqual('2020-11-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-12-03')))).toEqual('2020-12-01')
  })

  it('lastDateOfMonth works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-02-03')))).toEqual('2020-02-29')
    expect(formatYMD(lastDateOfMonth(parseYMD('2019-02-03')))).toEqual('2019-02-28')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-01-03')))).toEqual('2020-01-31')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-11-03')))).toEqual('2020-11-30')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-12-03')))).toEqual('2020-12-31')
  })

  it('oneMonthAgo works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneMonthAgo(parseYMD('2020-02-03')))).toEqual('2020-01-03')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-03-28')))).toEqual('2020-02-28')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-03-31')))).toEqual('2020-02-29')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-12-30')))).toEqual('2020-11-30')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-12-31')))).toEqual('2020-11-30')
  })

  it('oneMonthAhead works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneMonthAhead(parseYMD('2020-02-03')))).toEqual('2020-03-03')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-01-31')))).toEqual('2020-02-29')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-02-29')))).toEqual('2020-03-29')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-03-28')))).toEqual('2020-04-28')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-03-31')))).toEqual('2020-04-30')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-10-31')))).toEqual('2020-11-30')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-12-30')))).toEqual('2021-01-30')
    expect(formatYMD(oneMonthAhead(parseYMD('2020-12-31')))).toEqual('2021-01-31')
  })

  it('oneYearAgo works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneYearAgo(parseYMD('2020-02-29')))).toEqual('2019-02-28')
    expect(formatYMD(oneYearAgo(parseYMD('2020-02-28')))).toEqual('2019-02-28')
    expect(formatYMD(oneYearAgo(parseYMD('2020-01-31')))).toEqual('2019-01-31')
    expect(formatYMD(oneYearAgo(parseYMD('2020-11-01')))).toEqual('2019-11-01')
    expect(formatYMD(oneYearAgo(parseYMD('2020-11-30')))).toEqual('2019-11-30')
    expect(formatYMD(oneYearAgo(parseYMD('2020-12-31')))).toEqual('2019-12-31')
  })

  it('oneYearAhead works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneYearAhead(parseYMD('2020-02-29')))).toEqual('2021-02-28')
    expect(formatYMD(oneYearAhead(parseYMD('2020-02-28')))).toEqual('2021-02-28')
    expect(formatYMD(oneYearAhead(parseYMD('2020-01-31')))).toEqual('2021-01-31')
    expect(formatYMD(oneYearAhead(parseYMD('2020-11-01')))).toEqual('2021-11-01')
    expect(formatYMD(oneYearAhead(parseYMD('2020-11-30')))).toEqual('2021-11-30')
    expect(formatYMD(oneYearAhead(parseYMD('2020-12-31')))).toEqual('2021-12-31')
  })
})
