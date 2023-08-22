import { Provider } from 'react-redux'
import RegisterScreen from '../registration.screen'
import { store } from '@stores'
import { render } from '@testing-library/react-native'
import React from 'react'

describe('registration screen tests', () => {
  const Wrapper = (
    <Provider store={store}>
      <RegisterScreen />
    </Provider>
  )
  test('should first', () => {
    const screen = render(Wrapper)
    expect(screen).toBeDefined()
  })
})
