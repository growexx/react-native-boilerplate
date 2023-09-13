import configureStore from 'redux-mock-store';
import mockAxios from 'jest-mock-axios';
import thunk from 'redux-thunk';
import {
    fetchApiRequest,
    fetchApiSuccess,
    fetchApiFail,
    fetchApi,
    clearRedux,
} from './../api.action'; // Replace with the actual path to your actions

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock('@api/AxiosClient');

afterEach(() => {
    mockAxios.reset();
});

describe('API Actions', () => {
    it('should create an action to fetch API request', () => {
        const expectedAction = {
            type: 'FETCH_API_PENDING', // Replace with the actual type
        };
        expect(fetchApiRequest()).toEqual(expectedAction);
    });

    it('should create an action to fetch API success', () => {
        const data = { /* Your test data here */ };
        const expectedAction = {
            type: 'FETCH_API_SUCCESS', // Replace with the actual type
            data,
        };
        expect(fetchApiSuccess(data)).toEqual(expectedAction);
    });

    it('should create an action to fetch API fail', () => {
        const expectedAction = {
            type: 'FETCH_API_FAILED', // Replace with the actual type
            error: true,
        };
        expect(fetchApiFail()).toEqual(expectedAction);
    });

    it('should create an action to clear Redux', () => {
        const expectedAction = {
            type: 'CLEAR_REDUX', // Replace with the actual type
        };
        expect(clearRedux()).toEqual(expectedAction);
    });

    it('should dispatch the fetchApiRequest and fetchApiSuccess actions', async () => {
        const store = mockStore({}); // Initialize the mock store
        const fakeData = { data: 'fake data' }; // Replace with your fake data
        // Mock the getUsers function
        jest.mock('@api', () => ({
            getUsers: jest.fn(() => Promise.resolve(fakeData)),
        }));

        // Expected actions to be dispatched
        const expectedActions = [
            { type: 'FETCH_API_PENDING' }, // Replace with the actual type
            { type: 'FETCH_API_SUCCESS', data: fakeData }, // Replace with the actual type
        ];

        await store.dispatch(fetchApi());

        // Check if the expected actions were dispatched
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch the fetchApiRequest and fetchApiFail actions on error', async () => {
        const store = mockStore({}); // Initialize the mock store
        // Mock the getUsers function to throw an error
        jest.mock('@api', () => ({
            getUsers: jest.fn(() => Promise.reject(new Error('API error'))),
        }));

        // Expected actions to be dispatched
        const expectedActions = [
            { type: 'FETCH_API_PENDING' }, // Replace with the actual type
            { type: 'FETCH_API_FAILED', error: true }, // Replace with the actual type
        ];

        await store.dispatch(fetchApi());

        // Check if the expected actions were dispatched
        expect(store.getActions()).toEqual(expectedActions);
    });
});
