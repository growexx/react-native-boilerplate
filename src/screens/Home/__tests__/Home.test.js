import React from 'react'
import { render, fireEvent, act, cleanup } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Home from '../Home.screen'
import { store } from '@stores'
import { fetchNews, clearRedux } from '@actions/news.action'
import { mockedGetRequest } from '../Home.util'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'

jest.mock('@api/AxiosClient')
global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

// Cache original functionality
const realUseState = React.useState

// Stub the initial state
const text = {
  general: LanguageUtils.getLangText(languagekeys.general),
  business: LanguageUtils.getLangText(languagekeys.business),
  entertainment: LanguageUtils.getLangText(languagekeys.entertainment),
  health: LanguageUtils.getLangText(languagekeys.health),
  science: LanguageUtils.getLangText(languagekeys.science),
  sports: LanguageUtils.getLangText(languagekeys.sports),
  technology: LanguageUtils.getLangText(languagekeys.technology),
  errorMessage: LanguageUtils.getLangText(languagekeys.errorMessage),
  errorHeader: LanguageUtils.getLangText(languagekeys.errorHeader),
  retry: LanguageUtils.getLangText(languagekeys.retry),
  changePassword: LanguageUtils.getLangText(languagekeys.changePassword),
  editProfile: LanguageUtils.getLangText(languagekeys.editProfile),
  googlePay: LanguageUtils.getLangText(languagekeys.googlePay)
}
const stubInitialState = [text]
// Mock useState before rendering your component
jest
  .spyOn(React, 'useState')
  .mockImplementationOnce(() => realUseState(stubInitialState))

describe('render home screen properly', () => {
 
  require('react').useState.mockReturnValue(text)
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
