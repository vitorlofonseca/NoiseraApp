import React from 'react'
import {
    Text,
    Image,
    View,
    Switch,
    FlatList,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import DataNotFoundComponent from '../components/DataNotFoundComponent'
import { save_track } from '../store/trackStoreActions'
import { connect } from 'react-redux'

const styles = require('./styles/TrackViewStyle')

class TrackViewScreen extends React.Component {
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

    saveTrack = () => {
        this.props.save_track(this.state.track)

        const { goBack } = this.props.navigation
        goBack()
    }

    changeTrackActive = () => {
        let track = this.state.track
        track.Active = !track.Active
        this.setState({ track })
    }

    changeObservations = newObservation => {
        let track = this.state.track
        track.Observations = newObservation
        this.setState({ track })
    }

    render() {
        let trackAttaches

        if (
            !this.state.track.attaches ||
            this.state.track.attaches.lenght == 0
        ) {
            trackAttaches = <DataNotFoundComponent dataName="Attaches" />
        } else {
            trackAttaches = (
                <FlatList
                    data={this.state.track.attaches}
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
                            uri: this.state.track.Image,
                        }}
                    />

                    <View style={styles.track_info__div}>
                        <Text
                            style={[
                                styles.track_info__text,
                                styles.track_title,
                            ]}
                        >
                            {this.state.track.Name}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {this.state.track.Album}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {this.state.track.Artist}
                        </Text>
                        <Text style={styles.track_info__text}>
                            {this.state.track.Year}
                        </Text>
                    </View>
                </View>
                <View style={styles.div_row_body}>
                    <Text style={styles.info_title}>Active</Text>
                    <Switch
                        value={this.state.track.Active}
                        onValueChange={this.changeTrackActive}
                    />
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
                        value={this.state.track.Observations}
                        onChangeText={text => this.changeObservations(text)}
                    />
                </View>

                <View style={[styles.box, styles.btnSaveGig]}>
                    <TouchableOpacity>
                        <Button
                            color="grey"
                            className="px-4"
                            title="Save Track"
                            onPress={this.saveTrack}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    save_track,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackViewScreen)
