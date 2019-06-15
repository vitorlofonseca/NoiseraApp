import { combineReducers } from 'redux'

let gigs

const reducer = (state = {}, action) => {
    const updateTrackOnGig = (gig, updatedTrack) => {
        gig.Tracks.forEach((track, index) => {
            if (track.GUID == updatedTrack.GUID) {
                gig.Tracks[index] = updatedTrack
            }
        })
    }

    const getGigByTrack = (state, track) => {
        return state.gigs.filter(gig => {
            return gig.GUID == track.gigGUID
        })[0]
    }

    switch (action.type) {
        case 'LOAD_GIGS':
            gigs = action.gigs
            state = { ...state, gigs }
            return state
        case 'SAVE_GIG':
            gigs = state.gigs
            gigs.push(action.gig)
            state.gigs = gigs
            return state
        case 'SAVE_TRACK':
            let updatedTrack = action.track

            let gig = getGigByTrack(state, updatedTrack)

            updateTrackOnGig(gig, updatedTrack)

            console.log('QWE', gig)
            return state
        default:
            return state
    }
}

export default combineReducers({
    reducer,
})
