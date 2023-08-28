import { render , fireEvent } from "@testing-library/react-native"
import React from 'react'
import { Provider } from "react-redux"
import { store} from "@stores"
import PhoneInputScreen from "../mobile.number.screen"
import showToast from "../../../components/toast"
import { useColorScheme } from "react-native"

const mockNavigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn()
  }
  
  jest.mock('../../../components/toast', () => jest.fn())
  const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})
describe('otp mobile numer screen test', () => {
    const Wrapper = (<Provider store={store}>
        <PhoneInputScreen navigation={mockNavigation}/>
    </Provider>)
  test('should render', () => { 
    const { getByTestId , getByPlaceholderText } = render(Wrapper);

    fireEvent.changeText(getByPlaceholderText('Enter phone number'),'1234567890')
    fireEvent.press(getByTestId('submit'))
    expect(mockNavigation.navigate).toHaveBeenCalled()

    })
  test('should render with toast', () => { 
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const { getByTestId , getByPlaceholderText } = render(Wrapper);

    fireEvent.changeText(getByPlaceholderText('Enter phone number'),'1237890')
    fireEvent.press(getByTestId('submit'))
    expect(showToast).toHaveBeenCalled()

    })
  test('should render with toast for empty', () => { 
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const { getByTestId , getByPlaceholderText } = render(Wrapper);

    fireEvent.changeText(getByPlaceholderText('Enter phone number'),'')
    fireEvent.press(getByTestId('submit'))
    expect(showToast).toHaveBeenCalled()

    })
})
