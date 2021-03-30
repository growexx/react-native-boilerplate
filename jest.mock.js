import React from 'react'
import { NativeModules } from 'react-native'

jest.mock('react-native-i18n')
jest.mock('@i18n')
jest.mock('@react-native-async-storage/async-storage', () => {
  const AsyncStorage = () => {}
  AsyncStorage.setItem = jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      return typeof key !== 'string' || typeof value !== 'string'
        ? reject(new Error('key and value must be string'))
        : resolve(true)
    })
  })
})
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers)
  }
})
jest.mock('react-native-fbsdk', () => ({
  LoginButton: () => <></>,
  AccessToken: {
    getCurrentAccessToken: jest.fn()
  },
  GraphRequest: jest.fn(),
  GraphRequestManager: jest.fn()
}))
jest.mock('@react-native-community/google-signin', () => {
  const mockGoogleSignin = jest.requireActual(
    '@react-native-community/google-signin'
  )

  mockGoogleSignin.GoogleSignin.hasPlayServices = () => Promise.resolve(true)
  mockGoogleSignin.GoogleSignin.configure = () => Promise.resolve()
  mockGoogleSignin.GoogleSignin.signIn = jest.fn()

  return mockGoogleSignin
})

NativeModules.RNGoogleSignin = {
  BUTTON_SIZE_ICON: 0,
  BUTTON_SIZE_STANDARD: 0,
  BUTTON_SIZE_WIDE: 0,
  BUTTON_COLOR_AUTO: 0,
  BUTTON_COLOR_LIGHT: 0,
  BUTTON_COLOR_DARK: 0,
  configure: jest.fn(),
  currentUserAsync: jest.fn()
}

jest.mock('@invertase/react-native-apple-authentication', () => {
  const mockAppleAuth = jest.requireActual(
    '@invertase/react-native-apple-authentication'
  )
  mockAppleAuth.appleAuth.performRequest = jest.fn()

  return mockAppleAuth
})