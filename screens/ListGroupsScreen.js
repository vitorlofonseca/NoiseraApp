import React from 'react'
import {
   FlatList,
   StyleSheet,
   View,
   TouchableOpacity,
   Button,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { GetLoggedUser } from '../spotify/SpotifyHttp'
import LoadingComponent from '../components/LoadingComponent'
import DataNotFoundComponent from '../components/DataNotFoundComponent'
import { connect } from 'react-redux'
import { load_groups } from '../store/groupStoreActions'

class ListGroupsScreen extends React.Component {
   static navigationOptions = {
      title: 'Bands',
   }

   componentDidMount() {
      this.loadGroups()
   }

   loadGroups = () => {
      GetLoggedUser().then(loggedUser => {
         this.props.load_groups(loggedUser.id)
      })
   }

   listGigsOfBand = band => {
      this.props.navigation.navigate('ListGigsScreen', {
         band,
      })
   }

   renderBand = ({ item }) => (
      <ListItem
         onPress={() => this.listGigsOfBand(item)}
         key={item.index}
         title={item.Name}
      />
   )

   render() {
      let groupsList = null

      if (!this.props.reducer.bands) {
         return <LoadingComponent itemName="Bands" />
      }

      if (
         this.props.reducer.bands != null &&
         this.props.reducer.bands.length == 0
      ) {
         groupsList = <DataNotFoundComponent dataName="Bands" />
      } else {
         groupsList = (
            <FlatList
               data={this.props.reducer.bands}
               renderItem={this.renderBand}
               keyExtractor={(item, index) => index.toString()}
            />
         )
      }

      return (
         <View style={styles.container}>
            {groupsList}
            <View style={{ textAlign: 'right' }}>
               <TouchableOpacity>
                  <Button
                     color="grey"
                     className="px-4"
                     title="Add Band"
                     onPress={() =>
                        this.props.navigation.navigate('AddGroupScreen', {
                           loadGroups: () => this.loadGroups(),
                        })
                     }
                  />
               </TouchableOpacity>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
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
   },
})

const mapStateToProps = state => state

const mapDispatchToProps = {
   load_groups,
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ListGroupsScreen)
