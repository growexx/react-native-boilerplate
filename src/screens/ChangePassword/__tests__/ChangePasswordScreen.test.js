import { Provider } from 'react-redux'
import { store } from '@stores'
import ChangePasswordScreen from '../changePassword.screen'
import { render, fireEvent } from '@testing-library/react-native'
import showToast from '../../../components/toast.js'
import React, { useState } from 'react'
import { useColorScheme } from 'react-native'

jest.mock('../../../components/toast.js', () => jest.fn())
jest.mock('react-native-root-toast', () => ({
  durations: {
    LONG: 'long'
  }
}))

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

describe('Change Password Screen test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState)
  })

  const Wrapper = (
    <Provider store={store}>
      <ChangePasswordScreen />
    </Provider>
  )
  it('renders change password screen in dark mode correctly', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })

  it('renders change password screen in light mode and shows error message for empty fields', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const { getByTestId } = render(Wrapper)
    fireEvent.press(getByTestId('submit-button'))
    expect(showToast).toHaveBeenCalledWith('All fields are required')
  })

  it('info icon opens validation menu', () => {
    const setIsMenuVisible = jest.fn()
    useState.mockImplementation(() => [true, setIsMenuVisible])
    const { getByTestId } = render(Wrapper)
    const icon = getByTestId('toggle-button')
    fireEvent.press(icon)
    expect(setIsMenuVisible).toHaveBeenCalled()
  })

  it('new password and confirm password mismatch gives error', () => {
    const { getByTestId } = render(Wrapper)
    const oldPasswordInput = getByTestId('old-password-input')
    const newPasswordInput = getByTestId('new-password-input')
    const confirmPasswordInput = getByTestId('confirm-password-input')
    const submitButton = getByTestId('submit-button')
    fireEvent.changeText(oldPasswordInput, 'old password')
    fireEvent.changeText(newPasswordInput, 'new password')
    fireEvent.changeText(confirmPasswordInput, 'mismatched password')
    fireEvent.press(submitButton)

    expect(showToast).toHaveBeenCalledWith(
      "Password and confirm password doesn't match"
    )
  })

  it('should show an error message when passwords dont validate', async () => {
    const { getByTestId } = render(Wrapper)
    const oldPasswordInput = getByTestId('old-password-input')
    const newPasswordInput = getByTestId('new-password-input')
    const confirmPasswordInput = getByTestId('confirm-password-input')
    const submitButton = getByTestId('submit-button')
    fireEvent.changeText(oldPasswordInput, 'old password')
    fireEvent.changeText(newPasswordInput, 'new password')
    fireEvent.changeText(confirmPasswordInput, 'new password')
    fireEvent.press(submitButton)

    expect(showToast).toHaveBeenCalledWith('Password validation failed')
  })

  it('should change password if all data are correct', () => {
    const { getByTestId } = render(Wrapper)
    const oldPasswordInput = getByTestId('old-password-input')
    const newPasswordInput = getByTestId('new-password-input')
    const confirmPasswordInput = getByTestId('confirm-password-input')
    const submitButton = getByTestId('submit-button')
    fireEvent.changeText(oldPasswordInput, 'old password')
    fireEvent.changeText(newPasswordInput, 'Test@123')
    fireEvent.changeText(confirmPasswordInput, 'Test@123')
    fireEvent.press(submitButton)
    expect(showToast).toHaveBeenCalledWith('Password changed successfully!')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
