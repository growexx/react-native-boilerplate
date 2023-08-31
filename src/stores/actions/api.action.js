import {
  FETCH_API_PENDING,
  FETCH_API_SUCCESS,
  FETCH_API_FAILED,
  CLEAR_REDUX
} from '@types/api.types'
import { getUsers } from '@api'

export const fetchApiRequest = () => {
  return {
    type: FETCH_API_PENDING
  }
}

export const fetchApiSuccess = data => {
  return {
    type: FETCH_API_SUCCESS,
    data
  }
}

export const fetchApiFail = () => {
  return {
    type: FETCH_API_FAILED,
    error: true
  }
}

export const clearRedux = () => {
  return {
    type: CLEAR_REDUX
  }
}

export const fetchApi = () => async dispatch => {
  try {
    dispatch(fetchApiRequest())
    const data = await getUsers()
    dispatch(fetchApiSuccess(data.data))
  } catch (error) {
    dispatch(fetchApiFail())
  }
}
