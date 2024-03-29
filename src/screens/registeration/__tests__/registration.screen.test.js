import { Provider } from 'react-redux'
import RegisterScreen from '../registration.screen'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import showToast from '../../../components/toast'
import ImagePicker from 'react-native-image-crop-picker'

jest.mock('../../../components/toast', () => jest.fn())
const mockNavigation = {
  navigate: jest.fn(),
  pop: jest.fn(),
  dispatch: jest.fn(),
  replace: jest.fn()
}
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

const mockedColorScheme = jest.fn()
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})

describe('registration screen tests', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  const Wrapper = (
    <Provider store={store}>
      <RegisterScreen />
    </Provider>
  )
  test('should first', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })

  test('handles email input', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const { getByTestId } = render(<RegisterScreen />)
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@example')
    fireEvent.press(getByTestId('signup-button'))
    expect(showToast).toHaveBeenCalledWith('All fields are required.')
  })

  test('handles all inputs', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <RegisterScreen navigation={mockNavigation} />
    )
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(getByTestId('name-input'), 'Rest@example1234')
    fireEvent.changeText(getByTestId('password-input'), 'Rest@example1234')
    fireEvent.changeText(
      getByTestId('confirm-password-input'),
      'Rest@example1234'
    )
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '9724390636')
    fireEvent.press(getByTestId('signup-button'))
    expect(mockNavigation.navigate).toHaveBeenLastCalledWith('Login')
  })
  test('should go to login page ', () => {
    const { getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    )
    const loginPage = getByTestId('go-to-login')
    fireEvent.press(loginPage)
    expect(mockNavigation.navigate).toHaveBeenLastCalledWith('Login')
  })
  test('should focused', () => {

    const setConfirmPadsswordFocus = jest.fn()
    const setNameFocus = jest.fn()
    useState.mockImplementationOnce(() => [false, setConfirmPadsswordFocus])
    useState.mockImplementationOnce(() => [false, setNameFocus])
    const { getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    )
    const confirmPassword = getByTestId('confirm-password-input')
    const name = getByTestId('name-input')
    fireEvent(confirmPassword, 'onFocus')
    expect(setConfirmPadsswordFocus).toHaveBeenLastCalledWith(true)
    fireEvent(confirmPassword, 'onBlur')
    fireEvent(name, 'onFocus')
    expect(setNameFocus).toHaveBeenLastCalledWith(true)
    fireEvent(name, 'onBlur')
  })
  test('should focused style', () => {
    // const setFocus = jest.fn()
    // const setPasswordFocus = jest.fn()
    const setConfirmPadsswordFocus = jest.fn()
    const setNameFocus = jest.fn()
    useState.mockImplementationOnce(() => [true, setConfirmPadsswordFocus])
    useState.mockImplementationOnce(() => [true, setNameFocus])
    const { getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    )

    const confirmPassword = getByTestId('confirm-password-input')
    const name = getByTestId('name-input')
    fireEvent(confirmPassword, 'onFocus')
    expect(setConfirmPadsswordFocus).toHaveBeenLastCalledWith(true)
    fireEvent(confirmPassword, 'onBlur')
  })
  test('should press on image picker', () => {
    const { getByText } = render(<RegisterScreen />)
    const pickImageButton = getByText('Pick Image')
    fireEvent.press(pickImageButton)
    expect(ImagePicker.openPicker).toHaveBeenCalled()
  })
  test('handles all inputs for mobile empty case', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <RegisterScreen navigation={mockNavigation} />
    )
    // const emailInput = getByTestId('email-input')
    // fireEvent.changeText(emailInput, 'test@example.com')
    // fireEvent.changeText(getByTestId('password-input'), 'Rest@example1234')
    // fireEvent.changeText(
    //   getByTestId('confirm-password-input'),
    //   'Rest@example1234'
    // )
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '32344')
    fireEvent.press(getByTestId('signup-button'))
    expect(showToast).toHaveBeenCalledWith('Please Enter Valid Phone Number.')
    // expect(mockNavigation.navigate).toHaveBeenLastCalledWith('Login')
  })
})
