import React from 'react';
import { View, TextInput, FlatList, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import { SearchTracks } from './GigsHttpService';
import NoDataFound from '../components/NoDataFound';
import GigManagementScreen from '../components/GigManagementScreen';

export default class AddGigScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Gig'
    }

    constructor(){
        super();
        this.state = {
            trackName: "",
            foundTracks: [],
            addedTracks: [],
            searchHappened: false
        };  

        this.handler = this.handler.bind(this)
    }

    handler() {
        this.setState({})
    }

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
        for(let i=0 ; i < this.state.addedTracks.length ; i++){
            let addedTrack = this.state.addedTracks[i];
            if(addedTrack.spotifyId == item.spotifyId){
                const setState = this.setState.bind(this);  
                let updatedAddedTracks = this.state.addedTracks;
                updatedAddedTracks.splice(i, 1);
                setState({"addedTracks": updatedAddedTracks});    
            }
        }
    };

    saveGig = () =>{
        this.props.navigation.navigate('GigsScreen');
    };

    render(){      
        let foundTracks = null;
        let addedTracks = null;

        //console.log("ASOKKOSAOKPKOPSA ", this.state);

        if (this.state.searchHappened && this.state.foundTracks.length == 0){
            foundTracks = (
                <NoDataFound dataName="tracks"/>
            );
        } else {
            foundTracks = (<GigManagementScreen foundTracks={this.state.foundTracks} handler={this.handler}/>);
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
                            onPress={() => saveGig()}
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const styles = {
    inputText: {
        height: 40,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },

    btnSaveGig: {
        marginBottom: 20
    },

    box: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        borderRadius:10,
    },

    rootView: {
        backgroundColor: 'lightgrey',
        height: 100000
    },

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

    noTracksText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
}
