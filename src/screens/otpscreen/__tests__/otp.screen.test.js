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
  
  jest.mock('../../../components/toast', () => jest.fn())
  const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})
describe('should available otp screen', () => { 
    const Wrapper = (<Provider store={store}>
        <OtpScreen navigation={mockNavigation}/>
    </Provider>)
    test('should render', () => {
        const { getByTestId , getByPlaceholderText } = render(Wrapper);

    })
    
 })