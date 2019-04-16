import { Track } from "./TrackModel";

export default interface Gig {
    tracks: Array<Track>,
    name: string,
    description: string
}