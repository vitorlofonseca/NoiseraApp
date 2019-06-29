import React from 'react'
import GroupManagementComponent from '../components/GroupManagementComponent'

export default class AddGigScreen extends React.Component {
   static navigationOptions = {
      title: 'Add Group',
   }

   render() {
      return <GroupManagementComponent navigation={this.props.navigation} />
   }
}
