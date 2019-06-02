import { GetGigs } from '../services/GigsHttpService'

export const initialize_gigs = () => {
    return dispatch => {
        GetGigs().then(gigs => {
            dispatch({
                type: 'INITIALIZE_GIGS',
                gigs,
            })
        })
    }
}
