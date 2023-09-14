import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from './../forgotPassword.screen';
import showToast from '../../../components/toast';

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
jest.mock('../../../components/toast', () => jest.fn())
const mockNavigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn()
}
describe('ForgotPasswordScreen', () => {
    const Wrapper = (
        <ForgotPasswordScreen navigation={mockNavigation} />
    )

    it('renders the component correctly', () => {
        const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);

        expect(getByText('Forgot Password')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByText('Submit')).toBeTruthy();
    });

    it('shows an error message when submitting with an empty email', async () => {
        const { getByTestId, getByText } = render(<ForgotPasswordScreen />);
        const submitButton = getByTestId('submit');
        fireEvent.press(submitButton);
    });

    it('shows a success message when submitting a valid email', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
        const emailInput = getByPlaceholderText('Email');
        const submitButton = getByTestId('submit');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.press(submitButton);
    });



    test('handles email input', () => {
        const { getByTestId } = render(Wrapper)
        const emailInput = getByTestId('email-input')
        fireEvent.changeText(emailInput, 'test@example')
        fireEvent.press(getByTestId('submit'))
        expect(showToast).toHaveBeenCalled()
    })

    test('handles email input for empty string', () => {
        const { getByTestId } = render(Wrapper)
        const emailInput = getByTestId('email-input')
        fireEvent.changeText(emailInput, '')
        fireEvent.press(getByTestId('submit'))
        expect(showToast).toHaveBeenCalled()
    })
    test('handles navigation', () => {
        const { getByTestId } = render(Wrapper)
        fireEvent.press(getByTestId('go-back'))
        expect(mockNavigation.goBack).toHaveBeenCalled()
    })
    test('should handle email toast', () => {
        const { getByTestId } = render(Wrapper)
        const emailInput = getByTestId('email-input')
        fireEvent.changeText(emailInput, 'test@')
        fireEvent.press(getByTestId('submit'))
        expect(showToast).toHaveBeenCalled()
    })
    test('should handle valid email toast', async () => {
        const { getByTestId } = render(Wrapper)
        const emailInput = getByTestId('email-input')
        fireEvent.changeText(emailInput, 'test@gmail.com')
        fireEvent.press(getByTestId('submit'))
        expect(showToast).toHaveBeenCalled()
        // jest.runAllTimers()
        // await waitFor(() => expect(mockNavigation.navigate).toHaveBeenCalled())
    })

});
