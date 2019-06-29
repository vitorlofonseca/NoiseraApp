import { GetGigs, SaveGigAws } from '../services/GigsHttpService'

export const load_gigs = band => {
   return dispatch => {
      GetGigs(band).then(gigs => {
         dispatch({
            type: 'LOAD_GIGS',
            gigs,
         })
      })
   }
}

export const save_gig = gig => {
   return dispatch => {
      SaveGigAws(gig).then(() => {
         dispatch({
            type: 'SAVE_GIG',
            gig,
         })
      })
   }
}
