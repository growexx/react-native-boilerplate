import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  useColorScheme
} from 'react-native'
import { LoginButton, LoginManager } from 'react-native-fbsdk'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { connect, useDispatch } from 'react-redux'
import InstagramLogin from 'react-native-instagram-login'
import {
  login,
  clearRedux,
  signInwithFacebook,
  signInWithGoogle,
  signInWithInstagram,
  signInWithApple
} from '@actions/auth.action'
import { strings } from '@i18n'
import { LOGIN_FAILED, LOGIN_SUCCESS } from '@types/auth.types'
import images from '@images'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'
import AuthInput from '../../components/auth.Input'
import { spacing } from '@constants'
import loginControl from '../../constants/loginControl'

const Login = props => {
  const dispatch = useDispatch()
  const insRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (props.auth.type === LOGIN_FAILED) {
      dispatch(clearRedux())
    }
    if (props.auth.type === LOGIN_SUCCESS) {
      dispatch(clearRedux())
    }
  }, [dispatch, props.auth])

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email'
      ])
      if (!result.isCancelled) {
        dispatch(signInwithFacebook())
      }
    } catch (error) {
      console.error('Facebook login error:', error)
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.SafeAreaView}>
        {/* <Text>Environment: {configs.ENV}</Text>
        <Text>Is Connected: {props.deviceInfo.isConnected.toString()}</Text> */}
        <View style={styles.container}>
          <Image
            source={
              colorScheme === 'dark' ? images.darkappLogo : images.appLogo
            }
            style={styles.logoImage}
          />
          <Text style={colorScheme === 'dark' ? styles.h1Dark : styles.h1}>
            {LanguageUtils.getLangText(languagekeys.login)}
          </Text>
          <AuthInput
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('forgotPassword')
            }}
            style={{
              padding: spacing
            }}>
            <Text style={styles.createAccountButton}>
              {LanguageUtils.getLangText(languagekeys.forgotPassword)}
            </Text>
          </TouchableOpacity>
          <View style={styles.register_view}>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.dont_have_account_dark
                  : styles.dont_have_account
              }>
              {LanguageUtils.getLangText(languagekeys.dontHaveAccount)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('registration')
              }}
              style={{
                padding: spacing
              }}>
              <Text style={styles.createAccountButton}>
                {LanguageUtils.getLangText(languagekeys.registerHere)}
              </Text>
            </TouchableOpacity>
          </View>
          {loginControl.LoginStandard && (
            <TouchableOpacity
              testID={'ManualLoginButton'}
              style={styles.buttonWrapper}
              onPress={() => dispatch(login(email, password))}>
              <Text style={styles.buttonText}>
                {LanguageUtils.getLangText(languagekeys.login)}
              </Text>
            </TouchableOpacity>
          )}
          {loginControl.LoginWithOtp && (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('phoneNumberScreen')
              }}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>
                {LanguageUtils.getLangText(languagekeys.loginWithOtp)}
              </Text>
            </TouchableOpacity>
          )}
          <InstagramLogin
            ref={insRef}
            appId="142239872267996"
            appSecret="36aed31f4c3704495a63cacd8b5838ae"
            redirectUrl="https://www.growexx.com/"
            scopes={['user_profile']}
            onLoginSuccess={() => dispatch(signInWithInstagram())}
            onLoginFailure={data => {}}
          />
          {Platform.OS === 'ios' && loginControl.Apple && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.socialButtonApple}
              onPress={signInWithApple}
            />
          )}
          <View style={styles.row}>
            {loginControl.FB && (
              <TouchableOpacity onPress={handleFacebookLogin}>
                <Image source={images.facebook} style={styles.image} />
              </TouchableOpacity>
            )}
            {loginControl.Google && (
              <TouchableOpacity onPress={() => dispatch(signInWithGoogle())}>
                <Image source={images.google} style={styles.image} />
              </TouchableOpacity>
            )}
            {loginControl.Instagram && (
              <TouchableOpacity
                testID={'ManualLoginButton'}
                onPress={() => insRef.current.show()}>
                <Image source={images.instagram} style={styles.image} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    deviceInfo: state.deviceInfoReducer
  }
}

export default connect(mapStateToProps, null)(Login)
