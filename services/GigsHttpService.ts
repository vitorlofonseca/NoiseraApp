import { SpotifyGet } from '../spotify/SpotifyHttp.js'
import { Track } from '../models/TrackModel'
import { Gig } from '../models/GigModel'

const env = require('../env.js')
const urlAwsApi = env.aws.url + env.aws.api
const awsApiKey = env.aws.apikey
let myHeaders = new Headers()

export const GetGigs = () => {
    myHeaders.append('x-api-key', awsApiKey)

    return new Promise((resolve, reject) => {
        fetch(urlAwsApi + '/gig', {
            method: 'get',
            headers: myHeaders,
        })
            .then(response => {
                let responseObject: Array<Gig> = JSON.parse(
                    response['_bodyInit']
                )['Gigs']

                resolve(responseObject)
            })
            .catch(err => reject(err))
    })
}

export const SaveGigAws = (gig: Gig) => {
    myHeaders.append('x-api-key', awsApiKey)
    return new Promise((resolve, reject) => {
        fetch(urlAwsApi + 'gig', {
            method: 'post',
            body: JSON.stringify(gig),
            headers: myHeaders,
        })
            .then(() => {
                resolve(gig)
            })
            .catch(err => reject(err))
    })
}

export const UpdateTracksOrder = (tracks: Array<Track>, gigGUID: string) => {
    let body = { gigGUID, tracks }
    myHeaders.append('x-api-key', awsApiKey)
    return new Promise((resolve, reject) => {
        fetch(urlAwsApi + 'gig/updateTracksOrder', {
            method: 'post',
            body: JSON.stringify(body),
            headers: myHeaders,
        })
            .then(() => {
                resolve(tracks)
            })
            .catch(err => reject(err))
    })
}
