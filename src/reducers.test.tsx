import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING, 
    REQUEST_ROBOTS_SUCCESS, 
    REQUEST_ROBOTS_FAILED
} from './constants';
import { IRobot } from './containers/App';

import * as reducers from './reducers';

describe('searchRobots', () => {
    const initialStateSearch: reducers.searchState = {
        searchField: ''
    }
    it('should return the initial state', () => {
        expect(reducers.searchRobots(undefined, {})).toEqual(initialStateSearch)
    })

    it('should handle CHANGE_SEARCH_FIELD action', () => {
        expect(reducers.searchRobots(initialStateSearch, {
            type: CHANGE_SEARCH_FIELD,
            payload: 'test'
        })).toEqual({ searchField: 'test' })
    })
})

describe('requestRobots', () => {
    const initialStateRobots: reducers.robotsState = { isPending: false, robots: [], error: '' }
    const pendingStateRobots: reducers.robotsState = { isPending: true, robots: [], error: '' }
    
    it('should return the initial state', () => {
        expect(reducers.requestRobots(undefined, {}))
        .toEqual(initialStateRobots)
    })

    it('should handle REQUEST_ROBOTS_PENDING action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_PENDING
        })).toEqual(pendingStateRobots)
    })

    const robots: Array<IRobot> = [
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
    it('should handle REQUEST_ROBOTS_SUCCESS action', () => {
        expect(reducers.requestRobots(pendingStateRobots, {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: robots
        })).toEqual({ isPending: false, robots: robots, error: '' })
    })

    it('should handle REQUEST_ROBOTS_FAILED action', () => {
        expect(reducers.requestRobots(pendingStateRobots, {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'error: fetching robots failed'
        })).toEqual({ isPending: false, robots: [], error: 'error: fetching robots failed' })
    })



})