import showToast from '../../components/toast'
import handleLogin from '../loginController'

jest.mock('../../components/toast', () => jest.fn())
describe('login controller test', () => {
  test('should show toat for invalid email', () => {
    handleLogin('meet@example', 'meet@E1231xample')
    expect(showToast).toHaveBeenCalledWith(
      'You have entered invalid email address, Please, enter a valid email address.'
    )
  })
  test('should show toat for empty email', () => {
    handleLogin('')
    expect(showToast).toHaveBeenCalled()
  })
  test('should return true', async () => {
    const res = await handleLogin('test@gmail.com', 'test@gmaiL1234')
    expect(res).toBe(true)
  })
})
