import React from 'react';

import { ListItem } from 'react-native-elements';
import { View, Text, FlatList } from 'react-native';

const styles = require('./styles/GigManagementStyles');

export default class AddedTracksListComponent extends React.Component {
    renderAddedTrack = ({item}) => (
        <ListItem
            key={item.spotifyId}
            leftAvatar={{ source: { uri: item.image } }}
            title={item.name}
            onPress={() => this.removeAddedTrack(item)}
            subtitle={item.artist + " - " + item.album}
        />
    );

    removeAddedTrack = (item) => {
        const setParentState = this.props.setParentState;

        for(let i=0 ; i < this.props.addedTracks.length ; i++){
            let addedTrack = this.props.addedTracks[i];
            if(addedTrack.spotifyId == item.spotifyId){
                let updatedAddedTracks = this.props.addedTracks;
                updatedAddedTracks.splice(i, 1);
                setParentState({addedTracks: updatedAddedTracks});    
            }
        }
    };

    render () {
        let addedTracks = null;
        console.log("APKOSKOPSAKPOKOPSAKOP ", JSON.stringify(this.props.addedTracks));

        if (this.props.searchHappened && this.props.addedTracks.length == 0){
            addedTracks = (
                <Text style={styles.noTracksText}>No tracks added</Text>
            );
        } else {
            addedTracks = (
                <View>
                    {this.props.addedTracks.length > 0 ? <Text style={styles.boxTitle}>Added Tracks</Text> : undefined}
                    <FlatList
                        data={this.props.addedTracks}
                        renderItem={this.renderAddedTrack}
                        props={this.props}
                        keyExtractor = { (item, index) => index.toString() }
                    />
                </View>
            );
        }

        return addedTracks;
    }
}