import React from 'react'
// import App from '../src/App'
import { render, cleanup } from '@testing-library/react-native'

describe('App renders successfully', () => {
  beforeEach(() => {
    cleanup()
  })

  test('on successfully render on production', async () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: () => null
    }))
    jest.mock('react-native-config', () => {
      return {
        ENV: 'Production',
        API_URL: 'https://newsapi.org',
        CODE_PUSH_KEY_IOS: '2Dx0tSAxO1QN1u',
        CODE_PUSH_KEY_ANDROID: '8vQY82WtSsdZk8VIoM',
        GOOGLE_CLIENT_ID_ANDROID: '210784425858',
        GOOGLE_CLIENT_ID_IOS: '210784425858'
      }
    })
    const { getByTestId } = render(<App />)
  })
  test('on successfully render on development', async () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
      select: () => null
    }))
    jest.mock('react-native-config', () => {
      return {
        ENV: 'Development',
        API_URL: 'https://newsapi.org',
        CODE_PUSH_KEY_IOS: '2Dx0tSAxO1QN1u',
        CODE_PUSH_KEY_ANDROID: '8vQY82WtSsdZk8VIoM',
        GOOGLE_CLIENT_ID_ANDROID: '210784425858',
        GOOGLE_CLIENT_ID_IOS: '210784425858'
      }
    })
    const { getByTestId } = render(<App />)
  })
})
