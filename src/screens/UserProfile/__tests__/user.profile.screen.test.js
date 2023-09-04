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

describe('UserProfileScreen', () => {
  it('renders user name and email when data is provided', () => {
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

  it('renders a go-back button', () => {
    const { getByTestId } = render(
      <UserProfileScreen navigation={navigation} />
    )
    expect(getByTestId('go-back-button')).toBeTruthy()
    fireEvent.press(getByTestId('go-back-button'))
    expect(navigation.goBack).toHaveBeenCalled()
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
