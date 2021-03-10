import {
  FETCH_NEWS_PENDING,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
  CLEAR_REDUX
} from '@types/news.types'

const initialState = {
  isLoading: false,
  newsList: [],
  type: null,
  error: null
}

export const newsReducer = (state = initialState, action) => {
  const { type, data, error } = action
  switch (action.type) {
    case FETCH_NEWS_PENDING:
      return {
        ...state,
        isLoading: true,
        type
      }

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newsList: state.newsList.concat(data),
        error: false,
        type
      }

    case FETCH_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error,
        type
      }

    case CLEAR_REDUX:
      return {
        ...state,
        isLoading: false,
        newsList: [],
        error: null,
        type: null
      }

    default:
      return state
  }
}

export default newsReducer
