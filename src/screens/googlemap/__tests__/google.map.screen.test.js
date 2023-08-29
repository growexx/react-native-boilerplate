import React from 'react'
import { render } from '@testing-library/react-native'
import GoogleMapScreen from '../google.map.screen' // Update the path to your component file
import { Provider } from 'react-redux'
import { store } from '@stores'

describe('GoogleMapScreen Component', () => {
  it('renders without crashing', () => {
    render(<GoogleMapScreen />)
  })

})
