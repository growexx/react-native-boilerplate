import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PinCodeScreen from './../pinCodeScreen'; // Import the component
import renderer from 'react-test-renderer'
import SetPinCode from '../setPinCode';
import PINCode from '@haskkor/react-native-pincode';

// jest.mock(
//   '@react-native-community/async-storage',
//   () => ({
//   })
// );

jest.mock('@haskkor/react-native-pincode', () => ({
  getItem: jest.fn(() => Promise.resolve()),
}));


describe('PinCode', () => {
  it('renders PinCodeScreen correctly', () => {
    const navigationMock = { navigate: jest.fn() };
    const snap = renderer
      .create(
        <PinCodeScreen navigation={navigationMock} />
      )
      .toJSON()
    expect(snap).toMatchSnapshot()
  });
  it('renders SetPinCode correctly', () => {
    const navigationMock = { navigate: jest.fn() };
    const snap = renderer
      .create(
        <SetPinCode navigation={navigationMock} />
      )
      .toJSON()
    expect(snap).toMatchSnapshot()
  });
});
