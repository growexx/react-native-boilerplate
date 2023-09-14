import { Provider } from 'react-redux'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import PaymentScreen from "../payment.screen"

jest.mock('@stripe/stripe-react-native', () => ({
    getConstants: jest.fn(() => null),
    StripeProvider: jest.fn(({ children }) => children),
    useApplePay: jest.fn(() => ({
        presentApplePay: jest.fn(() => Promise.resolve()),
        confirmApplePayPayment: jest.fn(() => Promise.resolve())
    }),),
    CardField: jest.fn(() => null),
    useStripe: jest.fn(() => {
        return {
            initPaymentSheet: jest.fn(),
            presentPaymentSheet: jest.fn(() => {
                return {
                    error: false
                }
            }),
        }
    }),
}));


jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useIsFocused: jest.fn(() => true)
    };
});

describe('payment screen test', () => {
    test('should render payment button', () => {
        const screen = render(  <PaymentScreen />)
        expect(screen).toBeDefined()
    })

})