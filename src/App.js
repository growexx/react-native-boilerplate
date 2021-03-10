import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from '@navigation/MainNavigation'
import { Provider } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'
import { store } from '@stores'
import { configs } from '@constants'
import { enableScreens } from 'react-native-screens'
import withCodePush from './withCodePush'
enableScreens()

const App = () => {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      androidClientId: configs.GOOGLE_CLIENT_ID_ANDROID,
      iosClientId: configs.GOOGLE_CLIENT_ID_IOS
    })
  }

  useEffect(() => {
    configureGoogleSignIn()
  }, [])

  return (
    <>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default withCodePush(App)
