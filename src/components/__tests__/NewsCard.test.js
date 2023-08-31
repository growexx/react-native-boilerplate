import { Provider } from 'react-redux'
import { store } from '@stores'
import { NewsCard } from '@components'
import { render } from '@testing-library/react-native'

describe('News Card', () => {
  it('should render news card component', () => {
    const screen = render(
      <Provider store={store}>
        <NewsCard
          item={{
            publishedAt: '31 Aug',
            urlToImage: 'https://test-image.com',
            title: 'test',
            source: { name: 'test' }
          }}
          colorScheme={'dark'}
        />
      </Provider>
    )
    expect(screen).toBeDefined()
  })

  it('should render news card component with correct props', () => {
    const screen = render(
      <Provider store={store}>
        <NewsCard
          item={{
            publishedAt: '31 Aug',
            title: 'test',
            source: { name: 'test' }
          }}
          colorScheme={'light'}
        />
      </Provider>
    )
    expect(screen).toBeDefined()
  })
})
