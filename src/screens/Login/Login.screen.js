import React, { useEffect, useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
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
import Spacing from '../../constants/Spacing'

const Login = props => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        <Text>Environment: {configs.ENV}</Text>
        <Text>Is Connected: {props.deviceInfo.isConnected.toString()}</Text>
        <View style={styles.container}>
          <Image source={images.appLogo} style={styles.logoImage} />
          <Text style={styles.h1}>{strings('auth.login')}</Text>
          <TextInput
            placeholder={strings('auth.email-placeholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.inputField}
          />
          <TextInput
            placeholder={strings('auth.password-placeholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.inputField}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('registration')
            }}
            style={{
              padding: Spacing
            }}>
            <Text style={styles.createAccountButton}>Create new account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={'ManualLoginButton'}
            style={styles.buttonWrapper}
            onPress={() => dispatch(login(email, password))}>
            <Text style={styles.buttonText}>{strings('auth.login')}</Text>
          </TouchableOpacity>
          <LoginButton
            style={styles.socialButton}
            onLoginFinished={signInwithFacebook}
            onLogoutFinished={() => {}}
          />
          <GoogleSigninButton
            style={styles.socialButtonGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => dispatch(signInWithGoogle())}
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
