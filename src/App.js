import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from '@navigation/MainNavigation'
import { Provider } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { store } from '@stores'
import { configs } from '@constants'
import { enableScreens } from 'react-native-screens'
import LanguageUtils from './localization/languageUtils'

enableScreens()

const App = () => {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      androidClientId: configs.GOOGLE_CLIENT_ID_ANDROID,
      iosClientId: configs.GOOGLE_CLIENT_ID_IOS
    })
  }

  const configureLanguageForApp = async () => {
    await LanguageUtils.setAppLanguageFromDeviceStorage()
  }

  useEffect(() => {
    configureGoogleSignIn()
    configureLanguageForApp()
  }, [])

  return (
    <>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default App
