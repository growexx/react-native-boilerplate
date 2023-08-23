import {
  FETCH_NEWS_PENDING,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
  CLEAR_REDUX
} from '@types/news.types'
import { getNews } from '@api'

export const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_PENDING
  }
}

export const fetchNewsSuccess = data => {
  return {
    type: FETCH_NEWS_SUCCESS,
    data
  }
}

export const fetchNewsFail = () => {
  return {
    type: FETCH_NEWS_FAILED,
    error: true
  }
}

export const clearRedux = () => {
  return {
    type: CLEAR_REDUX
  }
}

export const fetchNews = (page, category) => async dispatch => {
  try {
    dispatch(fetchNewsRequest())
    const data = await getNews(page, category)
    if (data.status === 'ok') {
      dispatch(fetchNewsSuccess(data.articles))
    } else {
      dispatch(fetchNewsSuccess([]))
    }
  } catch (error) {
    console.log('error is ', error)
    dispatch(fetchNewsFail())
  }
}
