import { render , fireEvent } from "@testing-library/react-native"
import React from 'react'
import { Provider } from "react-redux"
import { store} from "@stores"
import showToast from "../../../components/toast"
import { useColorScheme } from "react-native"
import OtpScreen from "../otp.screen"

const mockNavigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn()
  }
const mockRoute = {
  params: {
    mobile: '1234567980'
  }
}

jest.mock('../../../components/toast', () => jest.fn())
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})
describe('should available otp screen', () => {
  const Wrapper = (
    <Provider store={store}>
      <OtpScreen navigation={mockNavigation} route={mockRoute} />
    </Provider>
  )
  test('should render', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const { getByTestId } = render(Wrapper)
    fireEvent.press(getByTestId('verify-otp-btn'))
    expect(showToast).toHaveBeenCalledWith('Please enter valid code.')
  })

  test('should render with correct otp', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const { getByTestId } = render(Wrapper)
    fireEvent.changeText(getByTestId('otp-input'), '123456')
    fireEvent.press(getByTestId('verify-otp-btn'))
    expect(showToast).toHaveBeenCalledWith('Please enter valid code.')
  })

  
})