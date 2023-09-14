import apiReducer from './../api.reducer'; // Import your reducer
import {
  FETCH_API_PENDING,
  FETCH_API_SUCCESS,
  FETCH_API_FAILED,
  CLEAR_REDUX
} from '@types/api.types';

describe('apiReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      isFetching: false,
      userList: [],
      error: null
    };

    expect(apiReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_API_PENDING', () => {
    const action = { type: FETCH_API_PENDING };
    const expectedState = {
      isFetching: true,
      userList: [],
      error: null
    };

    expect(apiReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_API_SUCCESS', () => {
    const data = [/* Your data here */];
    const action = { type: FETCH_API_SUCCESS, data };
    const initialState = {
      isFetching: true,
      userList: [],
      error: null
    };
    const expectedState = {
      isFetching: false,
      userList: data,
      error: false
    };

    expect(apiReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_API_FAILED', () => {
    const error = 'Some error message';
    const action = { type: FETCH_API_FAILED, error };
    const initialState = {
      isFetching: true,
      userList: [],
      error: null
    };
    const expectedState = {
      isFetching: false,
      userList: [],
      error
    };

    expect(apiReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_REDUX', () => {
    const action = { type: CLEAR_REDUX };
    const initialState = {
      isFetching: true,
      userList: [/* Your data here */],
      error: 'Some error message'
    };
    const expectedState = {
      isFetching: false,
      userList: [],
      error: null
    };

    expect(apiReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return the current state for an unknown action', () => {
    const currentState = {
      isFetching: false,
      userList: [/* Your data here */],
      error: 'Some error message'
    };
    const action = { type: 'UNKNOWN_ACTION' };

    expect(apiReducer(currentState, action)).toEqual(currentState);
  });
});
