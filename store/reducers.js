import { combineReducers } from 'redux'
let gigs
let bands
let gig

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
         gig = getGigByTrack(state, updatedTrack)
         updateTrackOnGig(gig, updatedTrack)
         return state
      case 'LOAD_GROUPS':
         bands = action.groups
         state = { ...state, bands }
         return state
      default:
         return state
   }
}

export default combineReducers({
   reducer,
})
