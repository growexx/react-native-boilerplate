import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatScreen from './../Chat.screen';

describe('ChatScreen', () => {
  it('renders the initial message', () => {
    const { getByText } = render(<ChatScreen />);
    expect(getByText('Hello!')).toBeTruthy();
  });

  it('adds a new message when sending', () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'New message');
    fireEvent.press(getByText('Send'));
    expect(getByText('New message')).toBeTruthy();
  });

  // Add more test cases as needed
});

