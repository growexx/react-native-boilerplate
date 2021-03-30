import React, { useEffect } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { connect, useDispatch } from 'react-redux'
import {
  login,
  clearRedux,
  signInwithFacebook,
  signInWithGoogle,
  signInWithApple
} from '@actions/auth.action'
import { strings } from '@i18n'
import { configs } from '@constants'
import { LOGIN_FAILED, LOGIN_SUCCESS } from '@types/auth.types'
import images from '@images'

const Login = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.auth.type === LOGIN_FAILED) {
      alert('Login failed!')
      dispatch(clearRedux())
    }
    if (props.auth.type === LOGIN_SUCCESS) {
      dispatch(clearRedux())
    }
  }, [props.auth])

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.SafeAreaView}>
        <Text>Environment: {configs.ENV}</Text>
        <Text>Is Connected: {props.deviceInfo.isConnected.toString()}</Text>
        <View style={styles.container}>
          <Image source={images.appLogo} style={styles.logoImage} />
          <Text style={styles.h1}>{strings('auth.login')}</Text>
          <TextInput
            placeholder={strings('auth.email-placeholder')}
            keyboardType="email-address"
            style={styles.inputField}
          />
          <TextInput
            placeholder={strings('auth.password-placeholder')}
            secureTextEntry={true}
            style={styles.inputField}
          />
          <TouchableOpacity
            testID={'ManualLoginButton'}
            style={styles.buttonWrapper}
            onPress={() => dispatch(login())}>
            <Text style={styles.buttonText}>{strings('auth.login')}</Text>
          </TouchableOpacity>
          <LoginButton
            style={styles.socialButton}
            onLoginFinished={signInwithFacebook}
            onLogoutFinished={() => {}}
          />
          <GoogleSigninButton
            style={styles.socialButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.socialButton}
              onPress={signInWithApple}
            />
          )}
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
