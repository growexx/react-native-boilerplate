import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import UserProfileScreen from '../user.profile.screen'
import { store } from '@stores'
import { logout } from '../../../stores/actions/auth.action'

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn()
}

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(() => ({}))
  };
});

describe('UserProfileScreen', () => {
  it('renders user name and email when data is provided', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com'
    }
    require('react-redux').useSelector.mockReturnValue(userData)
    const { getByText } = render(<UserProfileScreen navigation={navigation} />)
    expect(getByText(`Name : ${userData.name}`)).toBeTruthy()
    expect(getByText(userData.email)).toBeTruthy()
  })
  it('renders user name and email when data is empty', () => {
    const userData = {}
    require('react-redux').useSelector.mockReturnValue(userData)
    const { getByText } = render(<UserProfileScreen navigation={navigation} />)
    expect(getByText(`Name : `)).toBeTruthy()
  })

  it('empty user name and email', () => {
    store.dispatch(logout())
    const screen = render(<UserProfileScreen navigation={navigation} />)
    expect(screen).toBeDefined()
  })

  it('renders correctly', () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(<UserProfileScreen navigation={navigationMock} />);

    // You can add more specific assertions here based on your UI
    expect(getByText('Name :')).toBeTruthy();
    expect(getByText('Account')).toBeTruthy();
  });
})
