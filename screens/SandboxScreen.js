import React from 'react'
import GroupInsert from '../components/container/GroupInsert'

export default class SandboxScreen extends React.Component {
    static navigationOptions = {
        title: 'Sandbox',
    }

    render() {
        return <GroupInsert navigation={this.props.navigation} />
    }
}
