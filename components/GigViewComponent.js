import React from 'react'
import { Text } from 'react-native'

export default class GigViewComponent extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.gig.Name,
        }
    }

    constructor() {
        super()

        this.state = {
            gig: {},
        }
    }

    componentWillMount() {
        this.state.gig = this.props.navigation.state.params.gig
    }

    render() {
        return <Text>this is the {this.state.gig.Name} gig</Text>
    }
}
