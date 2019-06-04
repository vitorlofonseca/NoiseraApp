import { SpotifyGet } from '../spotify/SpotifyHttp.js'
import { Track } from '../models/TrackModel'
import { Gig } from '../models/GigModel'

const env = require('../env.js')
const urlAwsApi = env.aws.url + env.aws.api
const awsApiKey = env.aws.apikey

export const GetGigs = () => {
    let myHeaders = new Headers()
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
    let myHeaders = new Headers()
    myHeaders.append('x-api-key', awsApiKey)
    return new Promise((resolve, reject) => {
        fetch(urlAwsApi + 'gig', {
            method: 'post',
            body: JSON.stringify(gig),
            headers: myHeaders,
        })
            .then(() => resolve(gig))
            .catch(err => reject(err))
    })
}

export const SearchTracks = trackName => {
    trackName = trackName.replace(/\s/g, '+')
    let spotifyMarket = env.spotify.market

    let requestData = {
        endpoint: 'search',
        parameters: [
            { q: trackName },
            { type: 'track' },
            { market: spotifyMarket },
            { limit: 10 },
            { offset: 5 },
        ],
    }

    return new Promise((resolve, reject) => {
        SpotifyGet(requestData).then(function(response) {
            let tracks: Array<Track> = response.tracks.items.map(function(
                track
            ) {
                let trackModel: Track
                let realeaseDate = track.album.release_date
                let year = new Date(realeaseDate).getFullYear()

                trackModel = {
                    spotifyId: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    year: year,
                    album: track.album.name,
                    image: track.album.images[0].url,
                }

                return trackModel
            })

            resolve(tracks)
        })
    })
}
