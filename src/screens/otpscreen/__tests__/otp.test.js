import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OtpScreen from '../otp.screen';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import showToast from '../../../components/toast';

const mockStore = configureStore([]);
const initialState = {
    authReducer: {
        // Mock your authReducer state here if needed
    },
    deviceInfoReducer: {
        // Mock your deviceInfoReducer state here if needed
    },
};
const store = mockStore(initialState);
const mockNavigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn()
}
const mockRoute = {
    params: {
        mobile: '1234567980'
    }
}
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme
  }
})

jest.mock('react-native-root-toast', () => {
    return {
        ...jest.requireActual('react-native-root-toast'),
        show: jest.fn(),
        durations: {
            LONG: 2
        },
        positions: {
            BOTTOM: 2
        }
    };
});

describe('OtpScreen', () => {
    const Wrapper = (
        <Provider store={store}>
            <OtpScreen navigation={mockNavigation} route={mockRoute} />
        </Provider>
    )

    test('should render', () => {
        mockedColorScheme.mockImplementationOnce(() => 'light')
        const { getByTestId } = render(Wrapper)
        fireEvent.press(getByTestId('verify-otp-btn'))
      })
    
      test('should render with correct otp', () => {
        mockedColorScheme.mockImplementationOnce(() => 'dark')
        const { getByTestId } = render(Wrapper)
        fireEvent.changeText(getByTestId('otp-input'), '123456')
        fireEvent.press(getByTestId('verify-otp-btn'))
      })

    it('shows an error message when submitting an invalid OTP code', async () => {
        const { getByTestId, getByText } = render(Wrapper);
        const otpInput = getByTestId('otp-input');
        const verifyButton = getByTestId('verify-otp-btn');

        fireEvent.changeText(otpInput, '000000'); // Invalid OTP
        fireEvent.press(verifyButton);
    });

    it('navigates to the next screen on successful OTP submission', async () => {
        const { getByTestId, getByText } = render(Wrapper);
        const otpInput = getByTestId('otp-input');
        const verifyButton = getByTestId('verify-otp-btn');

        fireEvent.changeText(otpInput, '123456');
        fireEvent.press(verifyButton);
    });

});
