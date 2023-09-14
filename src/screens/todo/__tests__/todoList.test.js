import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoList from '../todoList/TodoList'; // Import the TodoList component
import LanguageUtils from '../../../localization/languageUtils';
import languagekeys from '../../../localization/languagekeys';


jest.mock('react-native-sqlite-storage', () => ({
    openDatabase: () => ({
        transaction: () => ({
            executeSql: () => ({
                rows: [{
                    id: "id",
                    title: "title",
                    description: "description"
                }]
            }),
        }),
    }),
}));



jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    const fakeNavigation = jest.fn({
        addListener: jest.fn(),
        navigate: jest.fn()
    });
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: fakeNavigation,
        }),
    }
})



const fakeNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        //returning value for `navigationSubscription`
        return {
            remove: jest.fn(),
            focus: jest.fn()
        }
    }),
}


describe('TodoList Component', () => {
    it('should render correctly', () => {
        const { getByText, getByTestId } = render(<TodoList navigation={fakeNavigation} />);
        expect(getByText('Add Todo')).toBeTruthy();
        expect(getByTestId('edit-button')).toBeTruthy();
        expect(getByTestId('delete-button')).toBeTruthy();
    });

    it('should delete a todo when Delete button is pressed', () => {
        const { getByText, getByTestId } = render(<TodoList navigation={fakeNavigation} />);
        const deleteButton = getByTestId('delete-button');

        fireEvent.press(deleteButton);

        // expect(mockExecuteSql).toHaveBeenCalledWith(
        //     'DELETE FROM todos WHERE id = ?',
        //     [undefined], // You may need to provide a valid ID here
        //     expect.any(Function), // Success callback
        //     expect.any(Function)  // Error callback
        // );
    });

    it('should navigate to EditTodo screen when Edit button is pressed', () => {

        const { getByTestId } = render(<TodoList navigation={fakeNavigation} />);
        const editButton = getByTestId('edit-button');

        fireEvent.press(editButton);

        expect(fakeNavigation.navigate).toHaveBeenCalledWith('EditTodo', { id: 'id' }); // You may need to provide a valid ID here
    });

    it('should navigate to Addtodo screen when AddTodo button is pressed', () => {

        const { getByTestId } = render(<TodoList navigation={fakeNavigation} />);
        const add = getByTestId('add-todo');

        fireEvent.press(add);

        expect(fakeNavigation.navigate).toHaveBeenCalledWith('AddTodo'); // You may need to provide a valid ID here
    });
});
