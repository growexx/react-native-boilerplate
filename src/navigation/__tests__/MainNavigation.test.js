import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import MainNavigation from './../MainNavigation'; 

jest.mock('@react-navigation/stack')

const mockStore = {
  getState: () => ({ authReducer: { isLoggedIn: false } }),
  dispatch: jest.fn(),
};

describe('MainNavigation', () => {
  it('renders the Login screen when not logged in', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <MainNavigation />
      </Provider>
    );

    const loginText = getByText('Login');
    expect(loginText).toBeDefined();
  });

  it('renders the AppDrawerNavigator when logged in', () => {
    // Mock the store to indicate that the user is logged in
    const loggedInStore = {
      getState: () => ({ authReducer: { isLoggedIn: true } }),
      dispatch: jest.fn(),
    };

    const { getByText } = render(
      <Provider store={loggedInStore}>
        <MainNavigation />
      </Provider>
    );

    // You should adjust this to match a text element on your AppDrawerNavigator
    const drawerText = getByText('ReactNative Boilerplate');
    expect(drawerText).toBeDefined();
  });

  // Add more test cases to cover different scenarios and components in your MainNavigation.
});
