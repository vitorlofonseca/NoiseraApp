import { SaveTrackAws } from '../services/TracksHttpService'

export const save_track = track => {
    return dispatch => {
        SaveTrackAws(track).then(() => {
            dispatch({
                type: 'SAVE_TRACK',
                track,
            })
        })
    }
}
