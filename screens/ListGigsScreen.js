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

export default class ListGigsScreen extends React.Component {
    static navigationOptions = {
        title: 'Gigs',
    }

    constructor() {
        super()
        this.state = {
            gigs: null,
        }
    }

    loadGigs() {
        const setState = this.setState.bind(this)
        GetGigs().then(function(gigs) {
            setState({ gigs })
        })
    }

    componentDidMount() {
        this.loadGigs()
    }

    openGig = gig => {
        this.props.navigation.navigate('GigViewComponent', {
            gig,
        })
    }

    renderGig = ({ item }) => (
        <ListItem
            button
            key={item.index}
            leftAvatar={{ source: { uri: item.AvatarUrl } }}
            title={item.Name}
            subtitle={item.Description}
            onPress={() => this.openGig(item)}
        />
    )

    render() {
        let gigsList = null

        if (this.state.gigs === null) {
            return <LoadingComponent itemName="GIGs" />
        }

        if (this.state.gigs !== null && this.state.gigs.length == 0) {
            gigsList = <DataNotFoundComponent dataName="GIGs" />
        } else {
            gigsList = (
                <FlatList
                    data={this.state.gigs}
                    renderItem={this.renderGig}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        }

        return (
            <View style={styles.container}>
                {gigsList}
                <View style={{ textAlign: 'right' }}>
                    <TouchableOpacity>
                        <Button
                            color="grey"
                            className="px-4"
                            title="Add Gig"
                            onPress={() =>
                                this.props.navigation.navigate('AddGigScreen', {
                                    updateGigsList: this.loadGigs.bind(this),
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
