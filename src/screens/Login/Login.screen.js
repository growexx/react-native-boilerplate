import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  useColorScheme
} from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
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
import { spacing } from '@constants';

const Login = props => {
  const dispatch = useDispatch()
  const insRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (props.auth.type === LOGIN_FAILED) {
      // Alert.alert('Login failed!')
      dispatch(clearRedux())
    }
    if (props.auth.type === LOGIN_SUCCESS) {
      dispatch(clearRedux())
    }
  }, [dispatch, props.auth])

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.SafeAreaView}>
        {/* <Text>Environment: {configs.ENV}</Text>
        <Text>Is Connected: {props.deviceInfo.isConnected.toString()}</Text> */}
        <View style={styles.container}>
          <Image source={images.appLogo} style={styles.logoImage} />
          <Text style={styles.h1}>{LanguageUtils.getLangText(languagekeys.login)}</Text>
          <AuthInput
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <View style={styles.register_view}>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.dont_have_account_dark
                  : styles.dont_have_account
              }>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('registration')
              }}
              style={{
                padding: spacing
              }}>
              <Text style={styles.createAccountButton}>Register Here.</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('forgotPassword')
            }}
            style={{
              padding: spacing
            }}>
            <Text style={styles.createAccountButton}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={'ManualLoginButton'}
            style={colorScheme === 'dark' ? styles.login_dark : styles.login}
            onPress={() => dispatch(login(email, password))}>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.login_text_dark
                  : styles.login_text
              }>
              {strings('auth.login')}
            </Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.socialButton}
              onPress={signInWithApple}
            />
          )}
          <LoginButton
            style={styles.socialButton}
            onLoginFinished={signInwithFacebook}
            onLogoutFinished={() => {}}
          />
          <GoogleSigninButton
            style={styles.socialButtonGoogle}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => dispatch(signInWithGoogle())}
          />
          <TouchableOpacity
            testID={'ManualLoginButton'}
            style={styles.buttonWrapper}
            onPress={() => insRef.current.show()}>
            <Text style={styles.buttonText}>{strings('auth.insta-login')}</Text>
          </TouchableOpacity>
          <InstagramLogin
            ref={insRef}
            appId="142239872267996"
            appSecret="36aed31f4c3704495a63cacd8b5838ae"
            redirectUrl="https://www.growexx.com/"
            scopes={['user_profile']}
            onLoginSuccess={() => dispatch(signInWithInstagram())}
            onLoginFailure={data => console.log(data)}
          />
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
