import {
  parseYMD,
  formatYMD,
  datesEqual,
  firstDateOfMonth,
  lastDateOfMonth,
  oneMonthAgo,
  oneMonthAhead,
  oneYearAgo,
  oneYearAhead,
  oneDecadeAgo,
  oneDecadeAhead,
  constrainDate
} from './date'

describe('utils/date', () => {
  it('parseYMD() works', async () => {
    const date1 = parseYMD('2020-01-15')
    const date2 = new Date(2020, 0, 15)
    const date3 = parseYMD('2020-01-15T23:16:56.131Z')
    const date4 = parseYMD('2020-01-15 23:16:56')

    expect(date1.toISOString()).toEqual(date2.toISOString())
    expect(date1.toISOString()).toEqual(date3.toISOString())
    expect(date1.toISOString()).toEqual(date4.toISOString())
    expect(parseYMD('yyyy-mm-dd')).toEqual(null)
    expect(parseYMD('2020-01-15XYZ')).toEqual(null)
  })

  it('formatYMD() works', async () => {
    expect(formatYMD(new Date(2020, 0, 15))).toEqual('2020-01-15')
    expect(formatYMD('2020-01-15')).toEqual('2020-01-15')
    expect(formatYMD('2020-01-32')).toEqual('2020-02-01')
    expect(formatYMD('foobar')).toEqual(null)
    expect(formatYMD('x2020-01-15')).toEqual(null)
    expect(formatYMD('2020-01-15x')).toEqual(null)
    expect(formatYMD('2020-01-15T23:16:56.131Z')).toEqual('2020-01-15')
    expect(formatYMD('2020-01-15 23:16:56')).toEqual('2020-01-15')
  })

  it('datesEqual() works', async () => {
    expect(datesEqual('2020-01-15', '2020-01-15')).toBe(true)
    expect(datesEqual('2020-01-15', '2020-12-15')).toBe(false)
    expect(datesEqual(new Date(2020, 0, 15), '2020-12-15')).toBe(false)
    expect(datesEqual(new Date(2020, 0, 15), new Date(2020, 0, 15, 5, 4, 3))).toBe(true)
    expect(datesEqual('2020-01-15', new Date(2020, 0, 15))).toBe(true)
    expect(datesEqual('2020-02-15', new Date(2020, 0, 15))).toBe(false)
  })

  it('firstDateOfMonth() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-02-03')))).toEqual('2020-02-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-02-29')))).toEqual('2020-02-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-01-03')))).toEqual('2020-01-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-11-03')))).toEqual('2020-11-01')
    expect(formatYMD(firstDateOfMonth(parseYMD('2020-12-03')))).toEqual('2020-12-01')
  })

  it('lastDateOfMonth() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-02-03')))).toEqual('2020-02-29')
    expect(formatYMD(lastDateOfMonth(parseYMD('2019-02-03')))).toEqual('2019-02-28')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-01-03')))).toEqual('2020-01-31')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-11-03')))).toEqual('2020-11-30')
    expect(formatYMD(lastDateOfMonth(parseYMD('2020-12-03')))).toEqual('2020-12-31')
  })

  it('oneMonthAgo() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneMonthAgo(parseYMD('2020-02-03')))).toEqual('2020-01-03')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-03-28')))).toEqual('2020-02-28')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-03-31')))).toEqual('2020-02-29')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-12-30')))).toEqual('2020-11-30')
    expect(formatYMD(oneMonthAgo(parseYMD('2020-12-31')))).toEqual('2020-11-30')
  })

  it('oneMonthAhead() works', async () => {
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

  it('oneYearAgo() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneYearAgo(parseYMD('2020-02-29')))).toEqual('2019-02-28')
    expect(formatYMD(oneYearAgo(parseYMD('2020-02-28')))).toEqual('2019-02-28')
    expect(formatYMD(oneYearAgo(parseYMD('2020-01-31')))).toEqual('2019-01-31')
    expect(formatYMD(oneYearAgo(parseYMD('2020-11-01')))).toEqual('2019-11-01')
    expect(formatYMD(oneYearAgo(parseYMD('2020-11-30')))).toEqual('2019-11-30')
    expect(formatYMD(oneYearAgo(parseYMD('2020-12-31')))).toEqual('2019-12-31')
  })

  it('oneYearAhead() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneYearAhead(parseYMD('2020-02-29')))).toEqual('2021-02-28')
    expect(formatYMD(oneYearAhead(parseYMD('2020-02-28')))).toEqual('2021-02-28')
    expect(formatYMD(oneYearAhead(parseYMD('2020-01-31')))).toEqual('2021-01-31')
    expect(formatYMD(oneYearAhead(parseYMD('2020-11-01')))).toEqual('2021-11-01')
    expect(formatYMD(oneYearAhead(parseYMD('2020-11-30')))).toEqual('2021-11-30')
    expect(formatYMD(oneYearAhead(parseYMD('2020-12-31')))).toEqual('2021-12-31')
  })

  it('oneDecadeAgo() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-02-29')))).toEqual('2010-02-28')
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-02-28')))).toEqual('2010-02-28')
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-01-31')))).toEqual('2010-01-31')
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-11-01')))).toEqual('2010-11-01')
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-11-30')))).toEqual('2010-11-30')
    expect(formatYMD(oneDecadeAgo(parseYMD('2020-12-31')))).toEqual('2010-12-31')
  })

  it('oneDecadeAhead() works', async () => {
    // February 2020 was a leap year
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-02-29')))).toEqual('2030-02-28')
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-02-28')))).toEqual('2030-02-28')
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-01-31')))).toEqual('2030-01-31')
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-11-01')))).toEqual('2030-11-01')
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-11-30')))).toEqual('2030-11-30')
    expect(formatYMD(oneDecadeAhead(parseYMD('2020-12-31')))).toEqual('2030-12-31')
  })

  it('constrainDate() works', async () => {
    const min = parseYMD('2020-01-05')
    const max = parseYMD('2020-01-15')
    const date1 = parseYMD('2020-01-10')
    const date2 = parseYMD('2020-01-01')
    const date3 = parseYMD('2020-01-20')

    expect(constrainDate(null, null, null)).toEqual(null)
    expect(constrainDate(null, min, max)).toEqual(null)

    expect(constrainDate(date1, null, null)).not.toEqual(null)
    expect(constrainDate(date1, null, null).toISOString()).toEqual(date1.toISOString())

    expect(constrainDate(date1, min, max)).not.toEqual(null)
    expect(constrainDate(date1, min, max).toISOString()).toEqual(date1.toISOString())

    expect(constrainDate(date2, min, max)).not.toEqual(null)
    expect(constrainDate(date2, min, max).toISOString()).toEqual(min.toISOString())
    expect(constrainDate(date2, '', max)).not.toEqual(null)
    expect(constrainDate(date2, '', max).toISOString()).toEqual(date2.toISOString())
    expect(constrainDate(date2, null, max)).not.toEqual(null)
    expect(constrainDate(date2, null, max).toISOString()).toEqual(date2.toISOString())

    expect(constrainDate(date3, min, max)).not.toEqual(null)
    expect(constrainDate(date3, min, max).toISOString()).toEqual(max.toISOString())
    expect(constrainDate(date3, min, '')).not.toEqual(null)
    expect(constrainDate(date3, min, '').toISOString()).toEqual(date3.toISOString())
    expect(constrainDate(date3, min, null)).not.toEqual(null)
    expect(constrainDate(date3, min, null).toISOString()).toEqual(date3.toISOString())
  })
})
