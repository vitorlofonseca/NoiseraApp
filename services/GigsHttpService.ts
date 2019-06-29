import { Track } from '../models/TrackModel'
import { Gig } from '../models/GigModel'
import Group from '../models/GroupModel'

const env = require('../env.js')
const urlAwsApi = env.aws.url + env.aws.api
const awsApiKey = env.aws.apikey
let myHeaders = new Headers()
myHeaders.append('x-api-key', awsApiKey)

export const GetGigs = (band: Group) => {
   return new Promise((resolve, reject) => {
      fetch(urlAwsApi + 'gig/?bandGUID=' + band.GUID, {
         method: 'get',
         headers: myHeaders,
      })
         .then(response => {
            let responseObject: Array<Gig> = JSON.parse(response['_bodyInit'])[
               'Gigs'
            ]

            resolve(responseObject)
         })
         .catch(err => reject(err))
   })
}

export const SaveGigAws = (gig: Gig) => {
   return new Promise((resolve, reject) => {
      fetch(urlAwsApi + 'gig', {
         method: 'post',
         body: JSON.stringify(gig),
         headers: myHeaders,
      })
         .then(response => {
            resolve(gig)
         })
         .catch(err => reject(err))
   })
}

export const UpdateTracksOrder = (tracks: Array<Track>, gigGUID: string) => {
   let body = { gigGUID, tracks }
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
