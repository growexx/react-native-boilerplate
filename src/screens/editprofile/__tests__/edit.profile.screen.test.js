import { Provider } from 'react-redux'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import showToast from '../../../components/toast'
import ImagePicker from 'react-native-image-crop-picker'
import EditProfileScreen from '../edit.profile.sceen'

jest.mock('../../../components/toast.js', () => jest.fn())
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  pop: jest.fn(),
  dispatch: jest.fn(),
  replace: jest.fn()
}
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})
describe('edit profile screen tested', () => {
  const Wrapper = (
    <Provider store={store}>
      <EditProfileScreen navigation={mockNavigation} />
    </Provider>
  )
  it('renders change password screen in dark mode correctly', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })
  it('renders change password screen in light mode correctly', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })
  test('textinput testing', () => {
    const { getByTestId, getByPlaceholderText } = render(Wrapper)
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@example.com')
   
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '1234567890')
    fireEvent.press(getByTestId('editProfile-button'))
    expect(mockNavigation.pop).toHaveBeenCalled()
  })
  test('toast message for invalid phone', () => {
    const { getByTestId, getByPlaceholderText } = render(Wrapper)
   
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '97')
    fireEvent.press(getByTestId('editProfile-button'))
    expect(showToast).toHaveBeenCalled()
  })
  test('toast message for invalid email', () => {
    const { getByTestId, getByPlaceholderText } = render(Wrapper)
   
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '1234567890')
    fireEvent.press(getByTestId('editProfile-button'))
    expect(showToast).toHaveBeenCalled()
  })
  test('toast message for empty phone', () => {
    const { getByTestId, getByPlaceholderText } = render(Wrapper)
   
    const phoneNumber = getByPlaceholderText('Enter phone number')
    fireEvent.changeText(phoneNumber, '')
    fireEvent.press(getByTestId('editProfile-button'))
    expect(showToast).toHaveBeenCalled()
  })
  test('should press on image picker', () => {
    const { getByText } = render(Wrapper)
    const pickImageButton = getByText('Pick Image')
    fireEvent.press(pickImageButton)
    expect(ImagePicker.openPicker).toHaveBeenCalled()
  })
})
