import React from 'react'
import { render, fireEvent, act, cleanup } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import Login from '../Login.screen'
import { store } from '@stores'
import { loginUser } from '@api/fakeApiLogin'
import { signInwithFacebook, signInWithGoogle, signInWithApple } from '@actions/auth.action'
import { getLoginResponse } from '../Login.util'

jest.mock('@api/fakeApiLogin')

describe('render login component properly', () => {
  const Wrapper = (
    <Provider store={store}>
      <Login />
    </Provider>
  )

  beforeEach(() => {
    cleanup()
    spyOn(window, 'alert')
  })

  test('On Login Success', async () => {
    loginUser.mockImplementation(() =>
      Promise.resolve(getLoginResponse('default'))
    )
    const { getByTestId } = render(Wrapper)
    await act(() => fireEvent.press(getByTestId('ManualLoginButton')))
    const { isLoggedIn } = store.getState().authReducer
    expect(isLoggedIn).toBeTruthy()
  })

  test('On Login Failed', async () => {
    loginUser.mockImplementation(() =>
      Promise.reject(new Error('Request failed!'))
    )
    const { getByTestId } = render(Wrapper)
    await act(() => fireEvent.press(getByTestId('ManualLoginButton')))
    const { isLoading } = store.getState().authReducer
    expect(isLoading).not.toBeTruthy()
    expect(window.alert).toHaveBeenCalledWith('Login failed!')
  })

  test('On login with facebook success', () => {
    AccessToken.getCurrentAccessToken.mockImplementation(() =>
      Promise.resolve(getLoginResponse('facebook'))
    )
    const result = {
      isCancelled: false,
      error: null
    }
    signInwithFacebook(null, result)
  })

  test('On cancel login with facebook', () => {
    const result = {
      isCancelled: true,
      error: null
    }
    signInwithFacebook(null, result)
    expect(window.alert).toHaveBeenCalledWith('User cancelled!')
  })

  test('On login with facebook fail', () => {
    const result = {
      isCancelled: false,
      error: 'something went wrong!'
    }
    signInwithFacebook(true, result)
    expect(window.alert).toHaveBeenCalledWith('login has error: something went wrong!')
  })

  test('On login with google success', async () => {
    GoogleSignin.signIn.mockImplementation(() =>
      Promise.resolve(getLoginResponse('google'))
    )
    await act(() => signInWithGoogle())
    expect(window.alert).toHaveBeenCalledWith('Signed In as: name')
  })

  test('On login with google fail', async () => {
    GoogleSignin.signIn.mockImplementation(() =>
      Promise.reject(new Error('something went wrong!'))
    )
    await act(() => signInWithGoogle())
    expect(window.alert).toHaveBeenCalledWith('something went wrong!')
  })

  test('On login with apple success', async () => {
    appleAuth.performRequest.mockImplementation(() =>
      Promise.resolve(getLoginResponse('apple'))
    )
    await act(() => signInWithApple())
    expect(window.alert).toHaveBeenCalledWith('Signed In as: name')
  })

  test('On login with apple fail', async () => {
    appleAuth.performRequest.mockImplementation(() =>
      Promise.reject(new Error('something went wrong!'))
    )
    await act(() => signInWithApple())
    expect(window.alert).toHaveBeenCalledWith('something went wrong!')
  })
})
