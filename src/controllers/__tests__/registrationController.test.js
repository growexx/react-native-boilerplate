import showToast from '../../components/toast'
import handleRegistration from '../registrationController'
jest.mock('../../components/toast', () => jest.fn())
const mockNavigation = {
  navigate: jest.fn(),
  pop: jest.fn(),
  dispatch: jest.fn(),
  replace: jest.fn()
}
describe('registration controller test', () => {
  test('should show toast for empty fields', () => {
    handleRegistration('', '', '', mockNavigation)
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for invalid password', () => {
    handleRegistration('test@gmail.com', '', '', mockNavigation)
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for invalid email', () => {
    handleRegistration('', 'test@gmaiL123', 'test@gmaiL123', mockNavigation)
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for incorrect password', () => {
    handleRegistration(
      'test@gmail.com',
      'test@gmaiL123',
      'test@gmai1',
      mockNavigation
    )
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for invalid email toast', () => {
    handleRegistration(
      'test@gmail',
      'test@gmaiL123',
      'test@gmaiL123',
      mockNavigation
    )
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for invalid password toast', () => {
    handleRegistration('test@gmail.com', 'test', 'test', mockNavigation)
    expect(showToast).toHaveBeenCalled()
  })
  test('should show toast for all valid inputs', () => {
    handleRegistration(
      'test@gmail.com',
      'testM@1234',
      'testM@1234',
      mockNavigation
    )
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login')
  })
})
