import React from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

export default class TracksOfGigScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.gig.Name,
        }
    }

    constructor() {
        super()

        this.state = {
            gig: {},
        }
    }

    componentWillMount() {
        this.state.gig = this.props.navigation.state.params.gig
    }

    openTrackScreen = track => {
        track.gigName = this.state.gig.Name
        track.gigGUID = this.state.gig.GUID
        this.props.navigation.navigate('TrackViewScreen', {
            track,
        })
    }

    renderTracks = track => (
        <ListItem
            button
            key={track.item.SpotifyId}
            leftAvatar={{ source: { uri: track.item.Image } }}
            title={track.item.Name}
            subtitle={track.item.Album + ' - ' + track.item.Artist}
            onPress={() => this.openTrackScreen(track.item)}
            rightIcon={{
                name: 'keyboard-arrow-right',
                type: 'material-design',
                style: { marginRight: 10, fontSize: 15 },
            }}
        />
    )

    render() {
        return (
            <FlatList
                data={this.state.gig.Tracks}
                renderItem={this.renderTracks}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}
