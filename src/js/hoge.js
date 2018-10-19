const REGEXP_PATTERN = {
  tel: new RegExp('[^0-9]'),
  name: new RegExp('[a-zA-Z0-9\!@#\$%\^&*()_+-=\[\\]{};:?,.\\s]'),
  namekana: new RegExp('[^あ-ん]'),
  email: new RegExp('[^a-zA-Z0-9\!@#\$%\^&*()_+-=\[\\]{};:?,.\\s]'),
}

export const deleteNonNumericCharacters = s => s.replace(REGEXP_PATTERN.tel, '')

export const validateTelString = s => s.match(REGEXP_PATTERN.tel) === null
export const validateNameString = s => s.match(REGEXP_PATTERN.name) === null
export const validateNameKaneString = s => s.match(REGEXP_PATTERN.namekana) === null
export const validateEmailString = s => s.match(REGEXP_PATTERN.email) === null

export const validateLength = l => s => s.length <= l && s.length > 0

export const makeValidator = tasks => s => !(tasks.map(f => f(s)).indexOf(false) > -1)

export const validateName = makeValidator([
  validateLength(10),
  validateNameString
])

export const validateNameKana = makeValidator([
  validateLength(10),
  validateNameKaneString
])

export const validateEmail = makeValidator([
  validateLength(53),
  validateEmailString,
  (s) => s.indexOf('@') > -1,
])
