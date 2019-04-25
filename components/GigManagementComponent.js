import React from 'react'
import {
    Alert,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Button,
} from 'react-native'
import TracksSearchComponent from '../components/TracksSearchComponent'
import AddedTracksListComponent from './AddedTracksListComponent'
import { SaveGig } from '../services/GigsHttpService'

const styles = require('./styles/GigManagementStyles')

export default class GigManagementComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            gigName: '',
            gigDescription: '',
            foundTracks: [],
            addedTracks: [],
            searchHappened: false,
        }
    }

    addTrack = item => {
        const setState = this.setState.bind(this)

        var index = this.state.addedTracks.find(function(addedTrack) {
            return addedTrack.spotifyId == item.spotifyId
        })

        if (index == null) {
            let newAddedTracksArray = this.state.addedTracks
            newAddedTracksArray.push(item)

            setState({ addedTracks: newAddedTracksArray })
        }
    }

    saveGig = () => {
        if (!this.state.gigName) {
            Alert.alert(':(', 'You need to define a name to gig')
            return
        }

        if (this.state.addedTracks.length == 0) {
            Alert.alert(':(', 'You need add at least one track to the gig')
            return
        }

        let trackIndex = 0

        let newGig = {
            Name: this.state.gigName,
            Description: this.state.gigDescription,
            AvatarUrl: 'https://image.flaticon.com/icons/png/512/37/37543.png',
            Tracks: this.state.addedTracks.map(function(addedTracks) {
                addedTracks.order = trackIndex
                addedTracks.active = true
                trackIndex++
                return addedTracks
            }),
        }

        SaveGig(newGig)

        this.props.navigation.state.params.updateGigsList()

        this.props.navigation.goBack()
    }

    render() {
        return (
            <ScrollView style={styles.rootView}>
                <View style={styles.box}>
                    <Text style={styles.boxTitle}>General Informations</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Gig name"
                        selectionColor="#000000"
                        underlineColorAndroid="#555555"
                        onChangeText={text => this.setState({ gigName: text })}
                    />

                    <TextInput
                        style={styles.inputText}
                        placeholder="Gig description"
                        selectionColor="#000000"
                        underlineColorAndroid="#555555"
                        onChangeText={text =>
                            this.setState({ gigDescription: text })
                        }
                    />
                </View>

                <View style={styles.box}>
                    <TracksSearchComponent
                        setParentState={this.setState.bind(this)}
                        addTrack={this.addTrack}
                    />
                </View>

                <View style={styles.box}>
                    <AddedTracksListComponent
                        setParentState={this.setState.bind(this)}
                        addedTracks={this.state.addedTracks}
                        searchHappened={this.state.searchHappened}
                    />
                </View>

                <View style={[styles.box, styles.btnSaveGig]}>
                    <TouchableOpacity>
                        <Button
                            color="grey"
                            className="px-4"
                            title="Save Gig"
                            onPress={() => this.saveGig()}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
