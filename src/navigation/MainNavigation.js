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
import LanguageUtils from '../localization/languageUtils'
import languagekeys from '../localization/languagekeys'

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
        title: LanguageUtils.getLangText(languagekeys.dashboard),
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
        title: LanguageUtils.getLangText(languagekeys.chat),
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />
    <BottomTab.Screen
      name="paymentScreen"
      component={PaymentScreen}
      options={{
        title: LanguageUtils.getLangText(languagekeys.payment),
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
        title: 'Google Map',
        tabBarIcon: ({ color, size }) => (
          <Icon name="comments" color={color} size={size} />
        )
      }}
    />
    <Drawer.Screen name="Todo" component={TodoList} />
    <Drawer.Screen name="AddTodo" component={AddTodo} />
    <Drawer.Screen name="EditTodo" component={EditTodo} />
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
