import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTodo from '../addTodo/AddTodo';

// Mock SQLite
jest.mock('react-native-sqlite-storage', () => ({
    openDatabase: () => ({
        transaction: () => ({
            executeSql: (callback) => callback(),
        }),
    }),
}));

describe('AddTodo Component', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<AddTodo />);

        const titleInput = getByPlaceholderText('Enter todo title');
        const descriptionInput = getByPlaceholderText('Enter todo description');
        const addButton = getByText('Add Todo');

        expect(titleInput).toBeTruthy();
        expect(descriptionInput).toBeTruthy();
        expect(addButton).toBeTruthy();
    });

    it('adds a todo with valid input', () => {
        const { getByPlaceholderText, getByText } = render(<AddTodo />);
        const titleInput = getByPlaceholderText('Enter todo title');
        const descriptionInput = getByPlaceholderText('Enter todo description');
        const addButton = getByText('Add Todo');

        fireEvent.changeText(titleInput, 'Sample Title');
        fireEvent.changeText(descriptionInput, 'Sample Description');
        fireEvent.press(addButton);

        // Add your assertions here, e.g., check if the alert message is shown or navigate is called.
    });

    it('shows an alert with invalid input', () => {
        const { getByText } = render(<AddTodo />);
        const addButton = getByText('Add Todo');

        fireEvent.press(addButton);

        // Add your assertions here, e.g., check if the alert message is shown.
    });
});
