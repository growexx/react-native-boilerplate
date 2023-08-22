import { loginUser } from '@api/fakeApiLogin'
import { Alert } from 'react-native'
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  CLEAR_REDUX
} from '@types/auth.types'
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication'

export const loginRequest = () => {
  return {
    type: LOGIN_PENDING
  }
}

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFail = () => {
  return {
    type: LOGIN_FAILED
  }
}

export const clearRedux = () => {
  return {
    type: CLEAR_REDUX
  }
}

export const login = () => async dispatch => {
  try {
    dispatch(loginRequest())
    const { data } = await loginUser()
    dispatch(loginSuccess(data))
  } catch (error) {
    dispatch(loginFail())
  }
}

export const logout = () => dispatch => {
  try {
    dispatch({ type: LOGOUT_SUCCESS })
  } catch (error) {}
}

export const getInfoFromToken = token => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name,  first_name, last_name'
    }
  }
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        Alert.alert(error.code)
      } else {
        Alert.alert('Signed In as: ' + result.name)
      }
    }
  )
  new GraphRequestManager().addRequest(profileRequest).start()
}

export const signInwithFacebook = (error, result) => {
  if (error) {
    Alert.alert('login has error: ' + result.error)
  } else if (result.isCancelled) {
    Alert.alert('User cancelled!')
  } else {
    AccessToken.getCurrentAccessToken().then(data => {
      const accessToken = data.accessToken.toString()
      getInfoFromToken(accessToken)
    })
  }
}

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    Alert.alert('Signed In as: ' + userInfo.user.name)
  } catch (error) {
    Alert.alert(error.message)
  }
}

export const signInWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    })
    console.log(appleAuthRequestResponse)
    Alert.alert('Signed In as: ' + appleAuthRequestResponse.fullName)
  } catch (error) {
    Alert.alert(error.message)
  }
}
