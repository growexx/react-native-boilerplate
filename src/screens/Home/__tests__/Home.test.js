import React from 'react'
import { render, fireEvent, act, cleanup } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Home from '../Home.screen'
import { store } from '@stores'
import { fetchNews, clearRedux } from '@actions/news.action'
import { GET } from '@api/AxiosClient'

jest.mock('@api/AxiosClient')

const newsListResponse = Array(15).fill({
  publishedAt: '2021-03-24T10:27:00Z',
  title:
    'Sensex dives 871 points; Nifty ends below 14,550: Top reasons behind fall - Times of India',
  source: {
    id: null,
    name: 'The Times of India'
  },
  urlToImage:
    'https://static.toiimg.com/thumb/msid-81669086,width-1070,height-580,imgsize-225595,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'
})

const mockedGetRequest = function (type) {
  if (type === 'success') {
    GET.mockImplementation(() =>
      Promise.resolve({
        status: 'ok',
        articles: newsListResponse
      })
    )
  } else if (type === 'failed') {
    GET.mockImplementation(() => Promise.reject(new Error('Request failed!')))
  } else {
    GET.mockImplementation(() =>
      Promise.resolve({
        status: 'error',
        articles: []
      })
    )
  }
}

describe('render home screen properly', () => {
  const Wrapper = (
    <Provider store={store}>
      <Home />
    </Provider>
  )

  beforeEach(async () => {
    cleanup()
    await act(() => store.dispatch(clearRedux()))
  })

  test('fetches general news on render', async () => {
    mockedGetRequest('success')
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { getByTestId } = render(Wrapper)
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBeGreaterThan(0)
  })

  test('fetch empty news data on render', async () => {
    mockedGetRequest('empty')
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { getByTestId } = render(Wrapper)
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBe(0)
  })

  test('fetch general news fails on render', async () => {
    mockedGetRequest('failed')
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { getByTestId } = render(Wrapper)
    const { error } = store.getState().newsReducer
    expect(error).toBeTruthy()
  })

  test('refetch news on retry', async () => {
    mockedGetRequest('failed')
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { getByTestId } = render(Wrapper)

    mockedGetRequest('success')
    await act(() => fireEvent.press(getByTestId('RetryButton')))
    const { error, newsList } = store.getState().newsReducer
    expect(error).not.toBeTruthy()
    expect(newsList.length).toBeGreaterThan(0)
  })

  test('Should fetch news on clicking filter', async () => {
    mockedGetRequest('success')
    const { getByTestId } = render(Wrapper)
    await act(() => fireEvent.press(getByTestId('FilterButton-0')))
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBeGreaterThan(0)
  })

  test('Should logout', async () => {
    const { getByTestId } = render(Wrapper)
    await act(() => fireEvent.press(getByTestId('LogoutButton')))
    const { isLoggedIn } = store.getState().authReducer
    expect(isLoggedIn).toBe(false)
  })

  test('fetch new data on list end reach', async () => {
    mockedGetRequest('success')
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { getByTestId } = render(Wrapper)
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500
        },
        contentSize: {
          height: 500,
          width: 100
        },
        layoutMeasurement: {
          height: 100,
          width: 100
        }
      }
    }
    await act(() => fireEvent.scroll(getByTestId('FlatList'), eventData))
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBe(30)
  })
})
