import React from 'react'
import {
   View,
   Text,
   TextInput,
   ScrollView,
   TouchableOpacity,
   Button,
   FlatList,
} from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { save_group } from '../store/groupStoreActions'
import { connect } from 'react-redux'
import { GetLoggedUser } from '../spotify/SpotifyHttp'

const styles = require('./styles/GroupManagementStyles')

class GroupManagementComponent extends React.Component {
   currentMemberId = ''

   constructor(props) {
      super(props)

      this.state = {
         Name: '',
         SpotifyUsersId: [],
      }
   }

   componentWillUnmount() {
      //this.props.navigation.state.params.loadGigs()
   }

   saveGroup = () => {
      GetLoggedUser().then(loggedUser => {
         this.currentMemberId = loggedUser.id
         this.addMemberId()

         this.props.save_group(this.state)

         const { goBack } = this.props.navigation
         goBack()
      })
   }

   updateCurrentMemberId = id => {
      this.currentMemberId = id
   }

   updateGroupName = Name => {
      this.setState({ Name })
   }

   addMemberId = () => {
      let SpotifyUsersId = this.state.SpotifyUsersId
      SpotifyUsersId.push(this.currentMemberId)
      this.setState({ SpotifyUsersId })
   }

   removeMemberId = item => {
      let SpotifyUsersId = this.state.SpotifyUsersId
      SpotifyUsersId = SpotifyUsersId.filter(memberId => {
         return memberId != item
      })
      this.setState({ SpotifyUsersId })
   }

   renderMemberId = ({ item }) => (
      <ListItem onPress={() => this.removeMemberId(item)} title={item} />
   )

   render() {
      let spotifyMembersIdList = null

      if (this.state.SpotifyUsersId.length == 0) {
         spotifyMembersIdList = <Text>Members ID not found</Text>
      } else {
         spotifyMembersIdList = (
            <FlatList
               extraData={this.state}
               data={this.state.SpotifyUsersId}
               renderItem={this.renderMemberId}
               keyExtractor={(item, index) => index.toString()}
            />
         )
      }

      return (
         <ScrollView style={styles.rootView}>
            <View style={styles.box}>
               <Text style={styles.boxTitle}>General Informations</Text>
               <TextInput
                  style={styles.inputText}
                  placeholder="Group name"
                  selectionColor="#000000"
                  underlineColorAndroid="#555555"
                  onChangeText={text => this.updateGroupName(text)}
               />

               <View style={{ flexDirection: 'row' }}>
                  <TextInput
                     style={styles.inputSpotifyMemberId}
                     placeholder="Members Id"
                     selectionColor="#000000"
                     underlineColorAndroid="#555555"
                     onChangeText={text => this.updateCurrentMemberId(text)}
                  />

                  <Icon
                     name="plus"
                     type="font-awesome"
                     onPress={this.addMemberId}
                     size={30}
                  />
               </View>

               <View style={styles.box}>{spotifyMembersIdList}</View>
            </View>

            <View style={[styles.box, styles.btnSaveGig]}>
               <TouchableOpacity>
                  <Button
                     color="grey"
                     className="px-4"
                     title="Save Gig"
                     onPress={() => this.saveGroup()}
                  />
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
   save_group,
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(GroupManagementComponent)
