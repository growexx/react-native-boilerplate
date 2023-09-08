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

describe('UserProfileScreen', () => {
  it('renders user name and email when data is provided', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com'
    }
    require('react-redux').useSelector.mockReturnValue(userData)
    const { getByText } = render(<UserProfileScreen navigation={navigation} />)
    expect(getByText(`Name : ${userData.name}`)).toBeTruthy()
    expect(getByText(userData.email)).toBeTruthy()
  })
  it('renders user name and email when data is provided with dark', () => {
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


  it('renders a edit profile screen', () => {
    const { getByText } = render(
      <UserProfileScreen navigation={navigation} />
    )
    expect(getByText('Edit Profile')).toBeTruthy()
    fireEvent.press(getByText('Edit Profile'))
    expect(navigation.navigate).toHaveBeenCalled()
  })

  it('empty user name and email', () => {
    store.dispatch(logout())
    const screen = render(<UserProfileScreen navigation={navigation} />)
    expect(screen).toBeDefined()
  })
})
