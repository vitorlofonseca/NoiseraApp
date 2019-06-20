import React from 'react'
import { View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { ListItem } from 'react-native-elements'
import { update_tracks_order } from '../store/gigStoreActions'
import { connect } from 'react-redux'
import { UpdateTracksOrder } from '../services/GigsHttpService'

class TracksOfGigScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.gig.Name,
        }
    }

    constructor() {
        super()

        this.state = {
            data: [],
        }
    }

    componentWillMount() {
        let gig = this.props.navigation.state.params.gig
        this.state.data = gig.Tracks.map((track, index) => ({
            key: `item-${index}`,
            track,
        }))
    }

    openTrackScreen = track => {
        let gig = this.props.navigation.state.params.gig
        track.gigName = gig.Name
        track.gigGUID = gig.GUID
        this.props.navigation.navigate('TrackViewScreen', {
            track,
        })
    }

    renderTrack = ({ item, index, move, moveEnd, isActive }) => {
        let track = item.track

        return (
            <View opacity={track.Active ? 1 : 0.2}>
                <ListItem
                    button
                    key={track.SpotifyId}
                    leftAvatar={{ source: { uri: track.Image } }}
                    title={track.Name}
                    subtitle={track.Album + ' - ' + track.Artist}
                    onPress={() => this.openTrackScreen(track)}
                    onLongPress={move}
                    onPressOut={moveEnd}
                    rightIcon={{
                        name: 'keyboard-arrow-right',
                        type: 'material-design',
                        style: { marginRight: 10, fontSize: 15 },
                    }}
                />
            </View>
        )
    }

    changeTracksOrder = tracks => {
        tracks = tracks.map((item, index) => {
            item.track.Order = index
            return item
        })
        tracksToDispatch = tracks.map((item, index) => {
            let track = item.track
            track.Order = index
            return track
        })
        this.setState({ data: tracks })
        let gigGUID = this.props.navigation.state.params.gig.GUID
        UpdateTracksOrder(tracksToDispatch, gigGUID)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={this.state.data}
                    renderItem={this.renderTrack}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.changeTracksOrder(data)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    update_tracks_order,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TracksOfGigScreen)
