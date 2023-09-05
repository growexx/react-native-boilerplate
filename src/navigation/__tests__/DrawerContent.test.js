import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DrawerContent from '../DrawerContent'; 

describe('DrawerContent Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockedColorScheme = jest.fn()

  jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
    return {
      default: mockedColorScheme
    }
  })
    it('renders correctly', () => {
    mockedColorScheme.mockImplementationOnce(() => 'light')

    const { getByText, getByTestId } = render(<DrawerContent navigation={mockNavigation} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('Change Password')).toBeTruthy();
    expect(getByText('Google Map')).toBeTruthy();
    expect(getByText('Todo List')).toBeTruthy();
    expect(getByText('User Profile')).toBeTruthy();
  });

  it('renders correctly with dark', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')

    const { getByText, getByTestId } = render(<DrawerContent navigation={mockNavigation} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('Change Password')).toBeTruthy();
    expect(getByText('Google Map')).toBeTruthy();
    expect(getByText('Todo List')).toBeTruthy();
    expect(getByText('User Profile')).toBeTruthy();
  });

  it('navigates to the correct screen on press', () => {
    const { getByText } = render(<DrawerContent navigation={mockNavigation} />);

    fireEvent.press(getByText('Dashboard'));
    fireEvent.press(getByText('Edit Profile'));
    fireEvent.press(getByText('Change Password'));
    fireEvent.press(getByText('Google Map'));
    fireEvent.press(getByText('Todo List'));
    fireEvent.press(getByText('User Profile'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('editprofilescreen');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('changePassword');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('googleMapScreen');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Todo');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('userProfile');
  });

});
