import { combineReducers } from 'redux'

const gigsReducer = (state = {}, action) => {
    let gigs
    switch (action.type) {
        case 'INITIALIZE_GIGS':
            gigs = action.gigs
            state = { ...state, gigs }
            return state
        case 'SAVE_GIG':
            gigs = state.gigs
            gigs.push(action.gig)
            state.gigs = gigs
            return state
        default:
            return state
    }
}

export default combineReducers({
    gigsReducer,
})
