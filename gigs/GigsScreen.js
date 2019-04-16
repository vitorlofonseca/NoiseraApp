import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import { GetGigs } from './GigsHttpService'
import LoadingScreen from '../components/LoadingScreen';
import NoDataFound from '../components/NoDataFound';


export default class GigsScreen extends React.Component {
  static navigationOptions = {
    title: 'Gigs',
  };

  constructor(){
    super();
    this.state = {
        _gigs: null
    }         
  }

  componentDidMount() {
    const setState = this.setState.bind(this);  
    GetGigs()
      .then(function(gigs) {
        setState({_gigs: gigs});
      });
  } 

  _renderGig = ({item}) => (
    <ListItem
      key={item.key}
      leftAvatar={{ source: { uri: item.avatar } }}
      title={item.name}
      subtitle={item.description}
    />
  );

  render() {

    if (this.state._gigs === null){
        return <LoadingScreen itemName="GIGs"/>;
    }

    if (this.state._gigs !== null && this.state._gigs.length == 0){
      return <NoDataFound dataName="GIGs"/>;
  }

    return (<View style={styles.container}>
              <FlatList
                data={this.state._gigs}
                renderItem={this._renderGig}
                keyExtractor = { (item, index) => index.toString() }
              />
              <View style={{textAlign: 'right'}}>
                <TouchableOpacity>
                  <Button color="grey" 
                      className="px-4"
                      title='Add Gig'
                      onPress={() => this.props.navigation.navigate('AddGigScreen')}
                  />
                </TouchableOpacity>
              </View>
            </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  }
});