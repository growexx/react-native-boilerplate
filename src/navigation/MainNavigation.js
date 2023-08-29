import React, { useEffect } from 'react'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect, useDispatch } from 'react-redux'
import DrawerContent from './DrawerContent.js'
import NetInfo from '@react-native-community/netinfo'
import { updateNetStatus } from '@actions/deviceInfo.action'
import SplashScreen from 'react-native-splash-screen'
import { Home, Login } from '@screens'
import RegisterScreen from '../screens/registeration/registration.screen'
import { useColorScheme } from 'react-native'
import ForgotPasswordScreen from '../screens/Forgotpassword/forgotPassword.screen'
import ChatScreen from '../screens/Chat/Chat.screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

const Drawer = createDrawerNavigator()
let unsubscribeNetListener
const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()
const Tab = createMaterialTopTabNavigator()

const MainBottomTabNavigator = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )
      }}
    />
    <BottomTab.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: 'Chat',
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />

    {/* <BottomTab.Screen
      name="MoreOptions"
      component={() => (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="ChatScreen" component={ChatScreen} />
        </Tab.Navigator>
      )}
      options={{
        title: 'More Options',
        tabBarIcon: ({ color, size }) => (
          <Icon name="ellipsis-h" color={color} size={size} />
        )
      }}
    /> */}
  </BottomTab.Navigator>
)

const AppDrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen
      name="Home"
      component={MainBottomTabNavigator}
      options={{
        title: '',
        drawerLabel: '',
        drawerIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )
      }}
    />
    <Drawer.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: 'Chat',
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />
  </Drawer.Navigator>
)

const MainNavigation = props => {
  const dispatch = useDispatch()
  const { isLoggedIn } = props.auth
  const theme = useColorScheme()

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
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      {!isLoggedIn ? (
        <Stack.Navigator headerShown={false}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="registration"
            component={RegisterScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="forgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: 'Forgot Password' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerShown={false}>
          <Stack.Screen
            name="MAIN"
            component={AppDrawerNavigator}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps, null)(MainNavigation)
