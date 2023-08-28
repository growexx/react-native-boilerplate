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
jest.mock('@react-native-google-signin/google-signin', () => {
  const mockGoogleSignin = jest.requireActual(
    '@react-native-google-signin/google-signin'
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

jest.mock('react-native-gesture-handler')

jest.mock('@react-native-community/netinfo', () => {
  const defaultState = {
    type: 'cellular',
    isConnected: true,
    isInternetReachable: true,
    details: {
      isConnectionExpensive: true,
      cellularGeneration: '3g'
    }
  }

  const RNCNetInfoMock = {
    configure: jest.fn(),
    fetch: jest.fn(),
    addEventListener: jest.fn(callback => {
      callback({ isConnected: true })
      return jest.fn()
    }),
    useNetInfo: jest.fn()
  }

  RNCNetInfoMock.fetch.mockResolvedValue(defaultState)
  RNCNetInfoMock.useNetInfo.mockResolvedValue(defaultState)

  return RNCNetInfoMock
})

// jest.mock('react-native-code-push', () => {
//   const cp = _ => app => app
//   Object.assign(cp, {
//     InstallMode: {},
//     CheckFrequency: {},
//     SyncStatus: {},
//     UpdateState: {},
//     DeploymentStatus: {},
//     DEFAULT_UPDATE_DIALOG: {},

//     checkForUpdate: jest.fn(),
//     getConfiguration: jest.fn(),
//     getCurrentPackage: jest.fn(),
//     getUpdateMetadata: jest.fn(),
//     log: jest.fn(),
//     notifyAppReady: jest.fn(),
//     notifyApplicationReady: jest.fn(),
//     sync: jest.fn()
//   })
//   return cp
// })

jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn(),
    show: jest.fn()
  }
})

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({
      path: 'mockedImagePath.jpg', // Provide a mocked image path
    })
  ),
}));


jest.mock('react-native-root-toast', () => ({
  durations: {
    LONG: 'long',
  },
}));

jest.mock('react-native-localize', () => ({
  findBestLanguageTag: jest.fn()
}))

jest.mock('react-native-razorpay', ()=>({
  open: jest.fn(()=>{
   return Promise.resolve()
  }),
}))

