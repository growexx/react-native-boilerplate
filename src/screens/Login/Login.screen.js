import React, { useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import styles from './styles'
import { connect, useDispatch } from 'react-redux'
import { login, clearRedux } from '@actions/auth.action'
import { TextInput } from 'react-native-gesture-handler'
import { strings } from '@i18n'
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
      alert('Login success')
      dispatch(clearRedux())
    }
  }, [props.auth])

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            style={styles.buttonWrapper}
            onPress={() => dispatch(login())}>
            <Text style={styles.buttonText}>{strings('auth.login')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps, null)(Login)
