import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  CLEAR_REDUX
} from '@types/auth.types'

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  loginData: null,
  type: null,
  error: null
}

export const authReducer = (state = initialState, action) => {
  const { type, data, error } = action
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        type
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loginData: data,
        type
      }

    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error,
        type
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loginData: null,
        error: null,
        type
      }

    case CLEAR_REDUX:
      return {
        ...state,
        isLoading: false,
        error: null,
        type: null
      }

    default:
      return state
  }
}

export default authReducer
