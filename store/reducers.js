import { combineReducers } from 'redux'

const gigsReducer = (state = {}, action) => {
    let gigs = action.gigs
    switch (action.type) {
        case 'INITIALIZE_GIGS':
            state = { ...state, gigs }
            return state
        default:
            return state
    }
}

export default combineReducers({
    gigsReducer,
})
