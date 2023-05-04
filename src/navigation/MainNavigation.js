import React, { useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect, useDispatch } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'
import { updateNetStatus } from '@actions/deviceInfo.action'
import SplashScreen from 'react-native-splash-screen'
import { Home, Login } from '@screens'

let unsubscribeNetListener
const Stack = createStackNavigator()

const MainNavigation = props => {
  const dispatch = useDispatch()
  const { isLoggedIn } = props.auth

  const setupNetListener = () => {
    unsubscribeNetListener = NetInfo.addEventListener(state => {
      dispatch(updateNetStatus(state.isConnected))
    })
  }

  useEffect(() => {
    SplashScreen.hide()
    setupNetListener()

    return () => unsubscribeNetListener()
  }, [])

  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator headerShown="false">
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps, null)(MainNavigation)
