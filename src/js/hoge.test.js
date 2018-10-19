import {
  validateTelString,
  deleteNonNumericCharacters,
  validateNameString,
  validateNameKaneString,
  validateEmailString,
  validateLength,
  validateName,
  validateEmail
} from './hoge'

describe(`deleteNonNumericCharacters`, () => {
  test(`123 -> 123`, () => {
    expect(deleteNonNumericCharacters('123')).toBe('123')
  })
  test(`123a -> 123`, () => {
    expect(deleteNonNumericCharacters('123a')).toBe('123')
  })
})

describe(`validateTel`, () => {
  test(`123 -> true`, () => {
    expect(validateTelString('123')).toBe(true)
  })
  test(`123a -> false`, () => {
    expect(validateTelString('123a')).toBe(false)
  })
})

describe(`validateName`, () => {
  test(`あアァ亜 -> true`, () => {
    expect(validateNameString('あアァ亜')).toBe(true)
  })
  test(`あアァ亜1 -> false`, () => {
    expect(validateNameString('あアァ亜1')).toBe(false)
  })
})

describe(`validateNameKane`, () => {
  test(`あがん -> true`, () => {
    expect(validateNameKaneString('あがん')).toBe(true)
  })
  test(`あがんァ -> false`, () => {
    expect(validateNameKaneString('あがんァ')).toBe(false)
  })
})

describe(`validateEmailString`, () => {
  test(`aaaa@aaaa.aa.aa -> true`, () => {
    expect(validateEmailString('asai-ta@gnavi.co.jp')).toBe(true)
  })
  test(`aaaa@aaaa.aa.aaあ -> false`, () => {
    expect(validateEmailString('asai-ta@gnavi.co.jpあ')).toBe(false)
  })
})

describe(`validateLength`, () => {
  test(`(1)('a') -> true`, () => {
    expect(validateLength(1)('a')).toBe(true)
  })
  test(`(1)('') -> false`, () => {
    expect(validateLength(1)('')).toBe(false)
  })
  test(`(1)('a') -> false`, () => {
    expect(validateLength(1)('ab')).toBe(false)
  })
})

describe(`validateEmail`, () => {
  test(`aaaa@aaaa.aa.aa -> true`, () => {
    expect(validateEmail('aaaa@aaaa.aa.aa')).toBe(true)
  })
  test(`aaaaaaaa.aa.aa -> false`, () => {
    expect(validateEmail('aaaaaaaa.aa.aa')).toBe(false)
  })
  test(`aaaa@aaaa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> false`, () => {
    expect(validateEmail('aaaa@aaaa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(false)
  })
})

