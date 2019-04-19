import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import TracksSearchComponent from '../components/TracksSearchComponent';
import AddedTracksListComponent from './AddedTracksListComponent';

const styles = require('./styles/GigManagementStyles');

export default class GigManagementComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            foundTracks: [],
            addedTracks: [],
            searchHappened: false
        };  
    }

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

    render(){      
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