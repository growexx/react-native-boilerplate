import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditTodo from '../editTodo/EditTodo'; // Import the EditTodo component

jest.mock('react-native-sqlite-storage', () => ({
    openDatabase: () => ({
        transaction: () => ({
            executeSql: (callback) => callback(),
        }),
    }),
}));


describe('EditTodo Component', () => {
    it('should render correctly', () => {
        const { getByText, getByPlaceholderText } = render(<EditTodo route={{ params: { id: "id" } }} />);
        expect(getByPlaceholderText('Todo title')).toBeTruthy();
        expect(getByPlaceholderText('Todo Description')).toBeTruthy();
        expect(getByText('Edit Todo')).toBeTruthy();
        expect(getByText('Update Todo')).toBeTruthy();
    });

    it('should render correctly todo when Update button is pressed', () => {
        const { getByText, getByPlaceholderText } = render(<EditTodo route={{ params: { id: "id" } }} />);
        const titleInput = getByPlaceholderText('Todo title');
        const descriptionInput = getByPlaceholderText('Todo Description');
        const updateButton = getByText('Update Todo');

        fireEvent.changeText(titleInput, 'New Todo Title');
        fireEvent.changeText(descriptionInput, 'New Todo Description');

        fireEvent.press(updateButton);

        // Assert that executeSql was called with the correct parameters
        // expect(mockExecuteSql).toHaveBeenCalledWith(
        //     'UPDATE todos SET title = ?, description = ? WHERE id = ?',
        //     ['New Todo Title', 'New Todo Description', 'id'],
        //     expect.any(Function), 
        //     expect.any(Function)  
        // );
    });
});
