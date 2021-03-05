import { loginUser } from '@api/fakeApiLogin'
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_REDUX
} from '@types/auth.types'

export const loginRequest = () => {
  return {
    type: LOGIN_PENDING
  }
}

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data: data
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
