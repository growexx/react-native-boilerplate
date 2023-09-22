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
import { Home, Login, ChangePasswordScreen } from '@screens'
import RegisterScreen from '../screens/registeration/registration.screen'
import { useColorScheme } from 'react-native'
import ForgotPasswordScreen from '../screens/Forgotpassword/forgotPassword.screen'
import ChatScreen from '../screens/Chat/Chat.screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import OtpScreen from '../screens/otpscreen/otp.screen'
import PhoneInputScreen from '../screens/otpscreen/mobile.number.screen'
import EditProfileScreen from '../screens/editprofile/edit.profile.sceen'
import PaymentScreen from '../screens/payment/payment.screen'
import GoogleMapScreen from '../screens/googlemap/google.map.screen.js'
import TodoList from '../screens/todo/todoList/TodoList.js'
import AddTodo from '../screens/todo/addTodo/AddTodo.js'
import EditTodo from '../screens/todo/editTodo/EditTodo.js'
import PinCodeScreen from '../screens/pinCode/pinCodeScreen.js'
import LanguageUtils from '../localization/languageUtils'
import languagekeys from '../localization/languagekeys'
import UserProfileScreen from '../screens/UserProfile/user.profile.screen.js'

const Drawer = createDrawerNavigator()
let unsubscribeNetListener
const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()
const Tab = createMaterialTopTabNavigator()

const MainBottomTabNavigator = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen
      name={LanguageUtils.getLangText(languagekeys.dashboard)}
      component={Home}
      options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )
      }}
    />
    <BottomTab.Screen
      name={LanguageUtils.getLangText(languagekeys.chat)}
      component={ChatScreen}
      options={{
        title: '',
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />
    <BottomTab.Screen
      name={LanguageUtils.getLangText(languagekeys.payment)}
      component={PaymentScreen}
      options={{
        title: '',
        tabBarIcon: ({ color, size }) => (
          <Icon name="credit-card" color={color} size={size} />
        )
      }}
    />
    {/* Top bar navigationn */}
    {/* <BottomTab.Screen
      name="MoreOptions"
      component={() => (
        <Tab.Navigator>
          <Tab.Screen name="Payments" component={PaymentScreen} />
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
  <Drawer.Navigator
    screenOptions={{
      headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black', // Set your desired color here
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen
      name=" "
      component={MainBottomTabNavigator}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} /> // Replace 'home' with the actual icon name
        )
      }}
    />
    {/* <Drawer.Screen
      name="Dashboard"
      component={Home}
      options={{
        title: ''
      }}
    /> */}
    <Drawer.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: 'Chat Screen'
      }}
    />
    <Drawer.Screen
      name="editprofilescreen"
      component={EditProfileScreen}
      options={{
        title: LanguageUtils.getLangText(languagekeys.editProfile)
      }}
    />
    <Drawer.Screen
      name="changePassword"
      component={ChangePasswordScreen}
      options={{
        title: LanguageUtils.getLangText(languagekeys.changePassword)
      }}
    />
    <Drawer.Screen
      name="googleMapScreen"
      component={GoogleMapScreen}
      options={{
        title: LanguageUtils.getLangText(languagekeys.googleMap),
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />
    <Drawer.Screen
      name="Todo"
      component={TodoList}
      options={{ title: LanguageUtils.getLangText(languagekeys.todo) }}
    />
    <Drawer.Screen
      name="AddTodo"
      component={AddTodo}
      options={{ title: LanguageUtils.getLangText(languagekeys.addTodo) }}
    />
    <Drawer.Screen
      name="EditTodo"
      component={EditTodo}
      options={{ title: LanguageUtils.getLangText(languagekeys.updateTodo) }}
    />
    <Drawer.Screen
      name="PinCodeScreen"
      component={PinCodeScreen}
      options={{ title: LanguageUtils.getLangText(languagekeys.pin) }}
    />
    <Drawer.Screen
      name="userProfile"
      component={UserProfileScreen}
      options={{ title: LanguageUtils.getLangText(languagekeys.userProfile) }}
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
          <Stack.Screen
            name="signwithotp"
            component={OtpScreen}
            options={{ title: 'Sign with OTP' }}
          />
          <Stack.Screen
            name="phoneNumberScreen"
            component={PhoneInputScreen}
            options={{ title: 'Sign with OTP' }}
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
