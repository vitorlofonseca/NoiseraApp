import React from 'react'
import { Text, Image, View, Switch, FlatList, TextInput } from 'react-native'
import { ListItem } from 'react-native-elements'
import DataNotFoundComponent from './DataNotFoundComponent'

const styles = require('./styles/TrackViewStyle')

export default class TrackViewComponent extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.track.gigName,
        }
    }

    constructor() {
        super()

        this.state = {
            track: {},
        }
    }

    componentWillMount() {
        let track = this.props.navigation.state.params
        this.state.track = track.track
        this.state.gig = track.Name + ' - ' + track.Artist
    }

    renderAttach = attach => {
        return (
            <ListItem
                key={attach.index}
                title={attach.item.name}
                subtitle={attach.item.type}
            />
        )
    }

    render() {
        let track = this.state.track

        let trackAttaches

        if (!track.attaches || track.attaches.lenght == 0) {
            trackAttaches = <DataNotFoundComponent dataName="Attaches" />
        } else {
            trackAttaches = (
                <FlatList
                    data={track.attaches}
                    style={styles.box}
                    renderItem={this.renderAttach}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.div_row_header}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{
                            uri: track.Image,
                        }}
                    />

                    <View style={styles.track_info__div}>
                        <Text
                            style={[
                                styles.track_info__text,
                                styles.track_title,
                            ]}
                        >
                            {track.Name}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {track.Album}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {track.Artist}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {track.Year}
                        </Text>
                    </View>
                </View>
                <View style={styles.div_row_body}>
                    <Text style={styles.info_title}>Active</Text>
                    <Switch value={track.Active} />
                </View>
                <View style={styles.div_row_body__without_row}>
                    <Text style={styles.info_title}>Track's attaches</Text>
                    {trackAttaches}
                </View>
                <View style={styles.div_row_body__without_row}>
                    <Text style={styles.info_title}>Observations</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.box}
                        value={track.observations}
                    />
                </View>
            </View>
        )
    }
}
