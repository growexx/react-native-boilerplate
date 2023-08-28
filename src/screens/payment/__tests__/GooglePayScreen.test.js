import { Provider } from 'react-redux'
import { store } from '@stores'
import GooglePayScreen from '../GooglePay.screen'
import { render, fireEvent } from '@testing-library/react-native'
import { GooglePay } from 'react-native-google-pay'

describe('Google Pay Screen Test', () => {
  const Wrapper = (
    <Provider store={store}>
      <GooglePayScreen />
    </Provider>
  )

  const googlePayMock = jest.spyOn(GooglePay, 'isReadyToPay')

  it('should pay when google pay button is clicked', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => {
      return {
        OS: 'android'
      }
    })
    googlePayMock.mockResolvedValue(true)
    const { getByTestId } = render(Wrapper)
    fireEvent.press(getByTestId('gpay-btn'))
  })

  it('shouldnt pay when google pay button is clicked but is not ready', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => {
      return {
        OS: 'android'
      }
    })
    googlePayMock.mockResolvedValue(false)
    const { getByTestId } = render(Wrapper)
    fireEvent.press(getByTestId('gpay-btn'))
  })

  it('shouldnt show google pay button when platform is not android', () => {
    jest.resetModules()
    jest.mock('react-native/Libraries/Utilities/Platform', () => {
      return {
        OS: 'ios'
      }
    })
    const { queryByTestId } = render(Wrapper)
    const gpayBtn = queryByTestId('gpay-btn')
    expect(gpayBtn).toBeNull()
  })
})
