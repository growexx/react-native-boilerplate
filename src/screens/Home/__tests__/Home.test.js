import React from 'react'
import { render, fireEvent, act, cleanup } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Home from '../Home.screen'
import { store } from '@stores'
import { fetchNews, clearRedux } from '@actions/news.action'
import { mockedGetRequest } from '../Home.util'

jest.mock('@api/AxiosClient')

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
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBeGreaterThan(0)
  })

  test('fetch empty news data on render', async () => {
    mockedGetRequest()
    await act(() => store.dispatch(fetchNews(1, 'general')))
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBe(0)
  })

  test('fetch general news fails on render', async () => {
    mockedGetRequest('failed')
    await act(() => store.dispatch(fetchNews(1, 'general')))
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
    expect(newsList.length).toBe(45)
  })

  test('pull to refresh data', async () => {
    mockedGetRequest('success')
    const { getByTestId } = render(Wrapper)
    const flatList = getByTestId('FlatList')
    await act(() => fireEvent(flatList.props.refreshControl, 'refresh'))
    const { newsList } = store.getState().newsReducer
    expect(newsList.length).toBe(30)
  })
})
