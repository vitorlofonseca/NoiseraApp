import React from 'react'
import GigManagementComponent from '../components/GigManagementComponent'

export default class AddGigScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Gig',
    }

    render() {
        return <GigManagementComponent navigation={this.props.navigation} />
    }
}
