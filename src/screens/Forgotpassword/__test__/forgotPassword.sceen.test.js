import { Provider } from 'react-redux'
import ForgotPasswordScreen from '../forgotPassword.screen'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import showToast from '../../../components/toast'

showToast
jest.mock('../../../components/toast', () => jest.fn())
const mockNavigation = {
  navigate: jest.fn(),
  pop: jest.fn(),
  dispatch: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn()
}
describe('forgot password screen test', () => {
  const Wrapper = (
    <Provider store={store}>
      <ForgotPasswordScreen navigation={mockNavigation} />
    </Provider>
  )
  test('should first', () => {
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })

  test('handles email input', () => {
    const { getByTestId } = render(Wrapper)
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@example')
    fireEvent.press(getByTestId('submit'))
    expect(showToast).toHaveBeenCalled()
  })

  test('handles email input for empty string', () => {
    const { getByTestId } = render(Wrapper)
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, '')
    fireEvent.press(getByTestId('submit'))
    expect(showToast).toHaveBeenCalled()
  })
  test('handles navigation', () => {
    const { getByTestId } = render(Wrapper)
    fireEvent.press(getByTestId('go-back'))
    expect(mockNavigation.goBack).toHaveBeenCalled()
  })
  test('should handle email toast', () => {
    const { getByTestId } = render(Wrapper)
    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@')
    fireEvent.press(getByTestId('submit'))
    expect(showToast).toHaveBeenCalled("")
  })
})
