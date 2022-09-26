import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING, 
    REQUEST_ROBOTS_SUCCESS, 
    REQUEST_ROBOTS_FAILED
} from './constants'

import type { IRobot } from './containers/App';
import type { roboAction } from './actions';
import "react-redux"


export type searchState = {
    searchField: string
}

export type robotsState = {
    isPending: boolean,
    robots: Array<IRobot>,
    error: string | undefined
}


const initialStateSearch: searchState = {
    searchField: ''
}

export const searchRobots = (state:searchState=initialStateSearch, action:roboAction={}): searchState => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchField: action.payload})
        default:
            return state;
    }
}

const initialStateRobots: robotsState = {
    isPending: false,
    robots: [],
    error: ""
}

export const requestRobots = (state:robotsState=initialStateRobots, action:roboAction={}): robotsState => {
    switch(action.type) {
        case REQUEST_ROBOTS_PENDING:
            return Object.assign({}, state, { isPending: true })
        case REQUEST_ROBOTS_SUCCESS:
            return Object.assign({}, state, { robots: action.payload, isPending: false })
        case REQUEST_ROBOTS_FAILED:
            return Object.assign({}, state, { isPending: false, error: action.payload })
        default:
            return state;
    }
}