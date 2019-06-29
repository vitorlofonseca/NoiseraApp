import { Group } from '../models/GroupModel'
import { Track } from '../models/TrackModel'

const env = require('../env.js')
const urlAwsApi = env.aws.url + env.aws.api
const awsApiKey = env.aws.apikey
let myHeaders = new Headers()

export const GetGroups = userId => {
   myHeaders.append('x-api-key', awsApiKey)

   return new Promise((resolve, reject) => {
      fetch(urlAwsApi + 'band/?spotifyUserId=' + userId, {
         method: 'get',
         headers: myHeaders,
      })
         .then(response => {
            let responseObject: Array<Group> = JSON.parse(
               response['_bodyInit']
            )['bands']
            resolve(responseObject)
         })
         .catch(err => reject(err))
   })
}

export const SaveGroupAws = (group: Group) => {
   myHeaders.append('x-api-key', awsApiKey)
   return new Promise((resolve, reject) => {
      fetch(urlAwsApi + 'band', {
         method: 'post',
         body: JSON.stringify(group),
         headers: myHeaders,
      })
         .then(() => {
            resolve(group)
         })
         .catch(err => reject(err))
   })
}

export const UpdateTracksOrder = (tracks: Array<Track>, groupGUID: string) => {
   let body = { groupGUID, tracks }
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
