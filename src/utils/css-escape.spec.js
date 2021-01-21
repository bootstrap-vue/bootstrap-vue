import { cssEscape } from './css-escape'

describe('utils/cssEscape', () => {
  it('works', () => {
    expect(cssEscape('\0')).toBe('\uFFFD')
    expect(cssEscape('a\0')).toBe('a\uFFFD')
    expect(cssEscape('\0b')).toBe('\uFFFDb')
    expect(cssEscape('a\0b')).toBe('a\uFFFDb')

    expect(cssEscape('\uFFFD')).toBe('\uFFFD')
    expect(cssEscape('a\uFFFD')).toBe('a\uFFFD')
    expect(cssEscape('\uFFFDb')).toBe('\uFFFDb')
    expect(cssEscape('a\uFFFDb')).toBe('a\uFFFDb')

    expect(cssEscape(undefined)).toBe('')
    expect(cssEscape(null)).toBe('')
    expect(cssEscape(true)).toBe('true')
    expect(cssEscape(false)).toBe('false')
    expect(cssEscape('')).toBe('')

    expect(cssEscape('\x01\x02\x1E\x1F')).toBe('\\1 \\2 \\1e \\1f ')

    expect(cssEscape('0a')).toBe('\\30 a')
    expect(cssEscape('1a')).toBe('\\31 a')
    expect(cssEscape('2a')).toBe('\\32 a')
    expect(cssEscape('3a')).toBe('\\33 a')
    expect(cssEscape('4a')).toBe('\\34 a')
    expect(cssEscape('5a')).toBe('\\35 a')
    expect(cssEscape('6a')).toBe('\\36 a')
    expect(cssEscape('7a')).toBe('\\37 a')
    expect(cssEscape('8a')).toBe('\\38 a')
    expect(cssEscape('9a')).toBe('\\39 a')

    expect(cssEscape('a0b')).toBe('a0b')
    expect(cssEscape('a1b')).toBe('a1b')
    expect(cssEscape('a2b')).toBe('a2b')
    expect(cssEscape('a3b')).toBe('a3b')
    expect(cssEscape('a4b')).toBe('a4b')
    expect(cssEscape('a5b')).toBe('a5b')
    expect(cssEscape('a6b')).toBe('a6b')
    expect(cssEscape('a7b')).toBe('a7b')
    expect(cssEscape('a8b')).toBe('a8b')
    expect(cssEscape('a9b')).toBe('a9b')

    expect(cssEscape('-0a')).toBe('-\\30 a')
    expect(cssEscape('-1a')).toBe('-\\31 a')
    expect(cssEscape('-2a')).toBe('-\\32 a')
    expect(cssEscape('-3a')).toBe('-\\33 a')
    expect(cssEscape('-4a')).toBe('-\\34 a')
    expect(cssEscape('-5a')).toBe('-\\35 a')
    expect(cssEscape('-6a')).toBe('-\\36 a')
    expect(cssEscape('-7a')).toBe('-\\37 a')
    expect(cssEscape('-8a')).toBe('-\\38 a')
    expect(cssEscape('-9a')).toBe('-\\39 a')

    expect(cssEscape('-')).toBe('\\-')
    expect(cssEscape('-a')).toBe('-a')
    expect(cssEscape('--')).toBe('--')
    expect(cssEscape('--a')).toBe('--a')

    expect(cssEscape('\x80\x2D\x5F\xA9')).toBe('\x80\x2D\x5F\xA9')
    expect(
      cssEscape(
        '\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F'
      )
    ).toBe(
      '\\7f \x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F'
    )
    expect(cssEscape('\xA0\xA1\xA2')).toBe('\xA0\xA1\xA2')
    expect(cssEscape('a0123456789b')).toBe('a0123456789b')
    expect(cssEscape('abcdefghijklmnopqrstuvwxyz')).toBe('abcdefghijklmnopqrstuvwxyz')
    expect(cssEscape('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

    expect(cssEscape('\x20\x21\x78\x79')).toBe('\\ \\!xy')

    // Astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
    expect(cssEscape('\uD834\uDF06')).toBe('\uD834\uDF06')
    // Lone surrogates
    expect(cssEscape('\uDF06')).toBe('\uDF06')
    expect(cssEscape('\uD834')).toBe('\uD834')
  })
})
