import React from 'react';

import { Icon, ListItem } from 'react-native-elements';
import { View, Text, TextInput, FlatList } from 'react-native';

import { SearchTracks } from "../services/GigsHttpService";

const styles = require('./styles/GigManagementStyles');

export default class TracksSearchComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            trackName: "",
            foundTracks: [],
            searchHappened: false
        };  
    }    

    renderFoundTrack = ({item}) => (
        <ListItem
            key={item.spotifyId}
            leftAvatar={{ source: { uri: item.image } }}
            onPress={() => this.props.addTrack(item)}
            title={item.name}
            subtitle={item.artist + " - " + item.album}
        />
    );

    searchTrack = () => {
        const setState = this.setState.bind(this);
        const setParentState = this.props.setParentState;

        SearchTracks(this.state.trackName)
        .then(function(tracks){
            setState({foundTracks: tracks, searchHappened: true});
            setParentState({foundTracks: tracks, searchHappened: true});
        });
    };

    render (){
        let foundTracks = null;

        if (this.state.searchHappened && this.state.foundTracks.length == 0){
            foundTracks = (
                <DataNotFoundComponent dataName="Tracks"/>
            );
        } else {
            foundTracks = (
                <FlatList
                    data={this.state.foundTracks}
                    renderItem={this.renderFoundTrack}
                    keyExtractor = { (item, index) => index.toString() }
                />
            );
        }

        return (
            <View>
                <Text style={styles.boxTitle}>Tracks search</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.searchTrackSpotify}
                        placeholder="Search tracks"
                        selectionColor='#000000'
                        underlineColorAndroid='#555555'
                        onChangeText={(trackName) => this.setState({ trackName: trackName })}
                    />

                    <Icon
                        name='search'
                        type='font-awesome'
                        onPress={this.searchTrack}
                        size={30}
                        />
                </View>

                <View style={styles.box}>
                    {foundTracks}
                </View>
            </View>
        );
    }

}