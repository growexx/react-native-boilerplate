import {
  FETCH_API_PENDING,
  FETCH_API_SUCCESS,
  FETCH_API_FAILED,
  CLEAR_REDUX
} from '@types/api.types'

const initialState = {
  isFetching: false,
  userList: [],
  error: null
}

export const apiReducer = (state = initialState, action) => {
  const { data, error } = action
  switch (action.type) {
    case FETCH_API_PENDING:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userList: data,
        error: false
      }

    case FETCH_API_FAILED:
      return {
        ...state,
        isFetching: false,
        error
      }

    case CLEAR_REDUX:
      return {
        ...state,
        isFetching: false,
        userList: [],
        error: null
      }

    default:
      return state
  }
}

export default apiReducer
