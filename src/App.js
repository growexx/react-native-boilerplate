import 'react-native-gesture-handler'
import React from 'react'
import MainNavigation from '@navigation/MainNavigation'
import { Provider } from 'react-redux'
import { store } from '@stores'
import { enableScreens } from 'react-native-screens'
import withCodePush from './withCodePush'
enableScreens()

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default withCodePush(App)
