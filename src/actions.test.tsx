import * as actions from './actions';
import { IRobot } from './containers/App';
import { roboAction } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import  AnyAction from '@types/react-redux'
import "jest"

import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS
    } from './constants';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { handlers } from './mocks/handlers';
import { setupServer } from 'msw/node'

interface AppState {}

const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>([thunkMiddleware])

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction: roboAction = {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }

    expect(actions.setSearchField(text)).toEqual(expectedAction)
})

const server = setupServer(...handlers)

const mockRobots: Array<IRobot> = [
    {
       id: 1,
       name: "User One",
       email: 'user1@email.com' 
    },
    {
        id: 2,
        name: "User Two",
        email: 'user2@email.com' 
     },
    {
        id: 3,
        name: "User Three",
        email: 'user3@email.com' 
    }
]

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('handles requesting robots API', () => {    
    const store = mockStore()
    store.dispatch(actions.requestRobots())
    const action: Array<AnyAction> = store.getActions()
    const expectedAction: roboAction = {
        type: REQUEST_ROBOTS_PENDING,
    }

    expect(action[0]).toEqual(expectedAction)
})

const fetchRobots: Function = () => (dispatch: Function) => {
    return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(data => {
        dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });
        // console.log(data)
    })
}

it('should successfully fetch robots', () => {    
    const store = mockStore()
    return store.dispatch(fetchRobots())
    .then(() => {
        const action = store.getActions()
        const expectedAction: roboAction = {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: mockRobots
        }

        expect(action[0]).toEqual(expectedAction)
    })
})