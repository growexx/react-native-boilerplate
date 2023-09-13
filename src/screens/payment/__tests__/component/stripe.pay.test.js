import { Provider } from 'react-redux'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import StripeButton from '../../component/stripe'

jest.mock('react-native-gesture-handler')

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
}));

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

describe('should handle test case of stripe component', () => {
    it('renders Stripe button correctly', () => {
        const navigationMock = { navigate: jest.fn() };
        const snap = renderer
            .create(
                <StripeButton navigation={navigationMock} />
            )
            .toJSON()
        fireEvent.press(getByTestId("stripe-btn"))
        fireEvent.press(getByTestId("apple-pay"))
        expect(snap).toMatchSnapshot()

    });
    // it('should click on stripe button', () => {
    //     const { getByTestId } = render(Wrapper)
    //     fireEvent.press(getByTestId("stripe-btn"))

    // })
    // it('should click on apple pay button', () => {
    //     const { getByTestId } = render(Wrapper)
    //     fireEvent.press(getByTestId("apple-pay"))
    // })
})
