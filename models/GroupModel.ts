import Gig from './GigModel'

export default interface Group {
   gigs?: Array<Gig>
   Name: string
   SpotifyUsersId: Array<string>
}
