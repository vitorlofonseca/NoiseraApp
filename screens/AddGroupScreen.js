import React from 'react'
import GroupInsert from '../components/container/GroupInsert'

export default class AddGroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Groups',
    }

    render() {
        return <GroupInsert navigation={this.props.navigation} />
    }
}
