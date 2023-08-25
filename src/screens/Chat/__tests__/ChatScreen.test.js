import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { store } from '@stores'
import ChatScreen from '../Chat.screen'

describe('Chat Screen Test', () => {
  test('should render Chat screen correctly', () => {
    const screen = render(
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    )
    expect(screen).toBeDefined()
  })
})
