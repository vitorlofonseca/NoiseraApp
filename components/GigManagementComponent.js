import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Button } from 'react-native';
import DataNotFoundComponent from '../components/DataNotFoundComponent';
import { SearchTracks } from "../services/GigsHttpService";

var styles = require('./styles/GigManagementStyles');

export default class GigManagementComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            trackName: "",
            foundTracks: [],
            addedTracks: [],
            searchHappened: false
        };  
    }

    renderFoundTrack = ({item}) => (
        <ListItem
            key={item.spotifyId}
            leftAvatar={{ source: { uri: item.image } }}
            onPress={() => this.addTrack(item)}
            title={item.name}
            subtitle={item.artist + " - " + item.album}
        />
    );

    renderAddedTrack = ({item}) => (
        <ListItem
            key={item.spotifyId}
            leftAvatar={{ source: { uri: item.image } }}
            title={item.name}
            onPress={() => this.removeAddedTrack(item)}
            subtitle={item.artist + " - " + item.album}
        />
    );

    searchTrack = () => {
        const setState = this.setState.bind(this);

        SearchTracks(this.state.trackName)
        .then(function(tracks){
            setState({foundTracks: tracks, searchHappened: true});
        });
    };

    addTrack = (item) => {
        const setState = this.setState.bind(this);

        var index = this.state.addedTracks.find(function(addedTrack) {
            return addedTrack.spotifyId == item.spotifyId;
        });

        if(index == null){
            let newAddedTracksArray = this.state.addedTracks;
            newAddedTracksArray.push(item);

            setState({addedTracks: newAddedTracksArray});
        }
    };

    saveGig = () =>{
        this.state.navigation.navigate('ListGigsScreen');
    };

    removeAddedTrack = (item) => {
        const setState = this.setState.bind(this);

        for(let i=0 ; i < this.state.addedTracks.length ; i++){
            let addedTrack = this.state.addedTracks[i];
            if(addedTrack.spotifyId == item.spotifyId){
                let updatedAddedTracks = this.state.addedTracks;
                updatedAddedTracks.splice(i, 1);
                setState({"addedTracks": updatedAddedTracks});    
            }
        }
    };

    render(){      
        let foundTracks = null;
        let addedTracks = null;

        if (this.state.searchHappened && this.state.foundTracks.length == 0){
            foundTracks = (
                <DataNotFoundComponent dataName="tracks"/>
            );
        } else {
            foundTracks = (
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

                                <FlatList
                                    data={this.state.foundTracks}
                                    renderItem={this.renderFoundTrack}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                            </View>);
        }

        if (this.state.searchHappened && this.state.addedTracks.length == 0){
            addedTracks = (
                <Text style={styles.noTracksText}>No tracks added</Text>
            );
        } else {
            addedTracks = (
                <View>
                    {this.state.addedTracks.length > 0 ? <Text style={styles.boxTitle}>Added Tracks</Text> : undefined}
                    <FlatList
                        data={this.state.addedTracks}
                        extraData={this.state}
                        renderItem={this.renderAddedTrack}
                        keyExtractor = { (item, index) => index.toString() }
                    />
                </View>
            );
        }   

        return (
            <ScrollView style={styles.rootView}>
                <View style={styles.box}>
                    <Text style={styles.boxTitle}>General Informations</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Gig name"
                        selectionColor='#000000'
                        underlineColorAndroid='#555555'
                        onChangeText={(text) => this.setState({text})}
                    />

                    <TextInput
                        style={styles.inputText}
                        placeholder="Gig description"
                        selectionColor='#000000'
                        underlineColorAndroid='#555555'
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>

                <View style={styles.box}>
                    {foundTracks}
                </View>

                <View style={styles.box}>
                    {addedTracks}
                </View>

                <View style={[styles.box, styles.btnSaveGig]}>
                    <TouchableOpacity>
                        <Button color="grey" 
                            className="px-4"
                            title='Save Gig'
                            onPress={() => this.saveGig()}
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}