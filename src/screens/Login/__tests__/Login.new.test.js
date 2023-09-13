import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store'; // For mocking Redux store
import { Provider } from 'react-redux'; // For providing the Redux store
import Login from '../Login.screen' // Import your Login component
import renderer from 'react-test-renderer'

// Mocked Redux store
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

describe('Login Component', () => {
    it('renders correctly', () => {
        // const { getByText, getByPlaceholderText } = render(
        //   <Provider store={store}>
        //     <Login />
        //   </Provider>
        // );
        const snap = renderer.create(
            <Provider store={store}>
                <Login />
            </Provider>
        ).toJSON();
        expect(snap).toMatchSnapshot();


        // Check if important text elements are rendered
        // expect(getByText('Login')).toBeTruthy();
        // expect(getByPlaceholderText('Email')).toBeTruthy();
        // expect(getByPlaceholderText('Password')).toBeTruthy();
    });

    it('handles email and password input', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        // Simulate user input for email and password fields
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');

        // Check if the input values are updated correctly
        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
    });

    it('handles login button press', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        // Mock the login function from Redux actions
        const mockLogin = jest.fn();
        store.dispatch = mockLogin;

        // Simulate button press
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);

        // Check if the login function was called
        expect(mockLogin).toHaveBeenCalled();
    });
});
