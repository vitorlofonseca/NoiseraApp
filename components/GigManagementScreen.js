import React from 'react';

import { View, StyleSheet, Text, TextInput, Icon, FlatList } from 'react-native';

export default class GigManagementScreen extends React.Component {
    constructor(){
        this.parentHandler = this.props.handler;
    }

    addTrack = (item) => {
        var index = this.state.addedTracks.find(function(addedTrack) {
            return addedTrack.spotifyId == item.spotifyId;
        });

        if(index == null){
            let updatedAddedTracks = this.state.addedTracks;
            updatedAddedTracks.push(item);
            this.parentHandler({addedTracks: updatedAddedTracks});
        }
    };

    renderFoundTrack = ({item}) => (
        <ListItem
            key={item.spotifyId}
            leftAvatar={{ source: { uri: item.image } }}
            onPress={() => this.addTrack(item)}
            title={item.name}
            subtitle={item.artist + " - " + item.album}
        />
    );

    searchTrack = () => {
        SearchTracks(this.state.trackName)
        .then(function(tracks){
            parentHandler({foundTracks: tracks, searchHappened: true});
        });
    };

    render (){
        return (
            <View>
                <Text style={styles.boxTitle}>Tracks search</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.searchTrackSpotify}
                        placeholder="Search tracks"
                        selectionColor='#000000'
                        underlineColorAndroid='#555555'
                        onChangeText={(trackName) => this.parentHandler({ trackName: trackName })}
                    />

                    <Icon
                        name='search'
                        type='material'
                        onPress={this.searchTrack}
                        size={40}
                    />
                </View>

                <FlatList
                    data={this.props.foundTracks}
                    renderItem={this.renderFoundTrack}
                    keyExtractor = { (item, index) => index.toString() }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxTitle: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },

    searchTrackSpotify: {
        width: 330,
        height: 40,
        marginLeft: 10,
        marginTop: 5,
    },
});