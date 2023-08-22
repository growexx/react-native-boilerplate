import Toast from 'react-native-root-toast'
import showToast from '../toast'

jest.mock('react-native-root-toast', () => ({
  show: jest.fn(),
  durations: {
    SHORT: 2000
  },
  positions: {
    BOTTOM: 'bottom'
  }
}))

describe('showToast', () => {
  it('should call Toast.show with the correct arguments', () => {
    const message = 'Test message'
    const duration = 5000
    showToast(message, duration)
    expect(Toast.show).toHaveBeenCalledWith(message, {
      duration: duration,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })
  })

  it('should call Toast.show with default duration if duration is not provided', () => {
    const message = 'Test message'
    showToast(message)
    expect(Toast.show).toHaveBeenCalledWith(message, {
      duration: 5000,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })
  })
})
