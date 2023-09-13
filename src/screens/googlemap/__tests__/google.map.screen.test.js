import React from 'react'
import { render } from '@testing-library/react-native'
import GoogleMapScreen from '../google.map.screen' // Update the path to your component file
import { Provider } from 'react-redux'
import { store } from '@stores'
import { PermissionsAndroid } from 'react-native'

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
}));

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn(() => new Promise(resolve => resolve('granted'))),
  };
});

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn(() => Promise.resolve({
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }))
  }
})



describe('GoogleMapScreen Component', () => {
  it('renders without crashing', () => {
    render(<GoogleMapScreen />)
  })

})
