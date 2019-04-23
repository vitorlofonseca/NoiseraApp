import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { GetGigs } from '../services/GigsHttpService'
import LoadingComponent from '../components/LoadingComponent'
import DataNotFoundComponent from '../components/DataNotFoundComponent'

export default class ListGroupsScreen extends React.Component {
    static navigationOptions = {
        title: 'Groups',
    }

    constructor() {
        super()
        this.state = {
            groups: null,
            searchHappened: false,
        }
    }

    componentDidMount() {
        const setState = this.setState.bind(this)
        setState({ groups: [], searchHappened: true })
        /*
        GetGigs().then(function(groups) {
            setState({ groups })
        })
        */
    }

    renderGroup = ({ item }) => (
        <ListItem
            key={item.index}
            leftAvatar={{ source: { uri: item.avatar } }}
            title={item.name}
            subtitle={item.description}
        />
    )

    render() {
        let groupsList = null

        if (!this.state.searchHappened && this.state.groups === null) {
            return <LoadingComponent itemName="Groups" />
        }

        if (
            this.state.searchHappened &&
            this.state.groups !== null &&
            this.state.groups.length == 0
        ) {
            groupsList = <DataNotFoundComponent dataName="Groups" />
        } else {
            groupsList = (
                <FlatList
                    data={this.state.groups}
                    renderItem={this.renderGroup}
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
                            title="Add Group"
                            onPress={() =>
                                this.props.navigation.navigate('AddGroupScreen')
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
