import { isValidEmail, isNonEmptyField } from '@utils/validations'

describe('App renders successfully', () => {
  test('Should return true on passing valid email', () => {
    const email = 'test@email.com'
    const result = isValidEmail(email)
    expect(result).toBe(true)
  })

  test('Should return false on passing invalid email', () => {
    const email = 'test.email.com'
    const result = isValidEmail(email)
    expect(result).toBe(false)
  })

  test('Should return false on passing empty, undefined, null email', () => {
    const email = ''
    const result = isValidEmail(email)
    expect(result).toBe(false)

    const result1 = isValidEmail(undefined)
    expect(result1).toBe(false)

    const email2 = null
    const result2 = isValidEmail(email2)
    expect(result2).toBe(false)
  })

  test('Should return true on passing non empty string', () => {
    const field = 'test@123'
    const result = isNonEmptyField(field)
    expect(result).toBe(true)
  })

  test('Should return false on passing empty string', () => {
    const field = ''
    const result = isNonEmptyField(field)
    expect(result).toBe(false)
  })
})
