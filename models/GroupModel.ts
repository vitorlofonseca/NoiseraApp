import Gig from './GigModel'

export default interface Group {
   GUID?: string
   Gigs?: Array<Gig>
   Name: string
   SpotifyUsersId: Array<string>
}
