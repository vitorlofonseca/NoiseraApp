import { GetGigs, SaveGigAws } from '../services/GigsHttpService'

export const load_gigs = () => {
    return dispatch => {
        GetGigs().then(gigs => {
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
