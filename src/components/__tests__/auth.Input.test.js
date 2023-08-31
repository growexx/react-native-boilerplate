import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import AuthInput from '../auth.Input'

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

const Wrapper = (
  <AuthInput
    email={'test@example.com'}
    setEmail={jest.fn()}
    password={'Test@1234'}
    setPassword={jest.fn()}
  />
)
describe('auth input test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should focused', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const setFocus = jest.fn()
    useState.mockImplementation(() => [false, setFocus])
    const { getByTestId } = render(Wrapper)
    const email = getByTestId('email-input')
    const password = getByTestId('password-input')
    fireEvent(email, 'onFocus')
    expect(setFocus).toHaveBeenLastCalledWith(true)
    fireEvent(email, 'onBlur')
    expect(setFocus).toHaveBeenLastCalledWith(false)
    fireEvent(password, 'onFocus')
    expect(setFocus).toHaveBeenLastCalledWith(true)
    fireEvent(password, 'onBlur')
  })
  test('should focused style', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const setFocus = jest.fn()
    const setPasswordFocus = jest.fn()
    useState.mockImplementationOnce(() => [true, setFocus])
    useState.mockImplementationOnce(() => [true, setPasswordFocus])
    const { getByTestId } = render(Wrapper)
    const email = getByTestId('email-input')
    const password = getByTestId('password-input')
    fireEvent(email, 'onFocus')
    expect(setFocus).toHaveBeenLastCalledWith(true)
    fireEvent(email, 'onBlur')
    expect(setFocus).toHaveBeenLastCalledWith(false)
    fireEvent(password, 'onFocus')
    expect(setPasswordFocus).toHaveBeenLastCalledWith(true)
    fireEvent(password, 'onBlur')
  })
})
