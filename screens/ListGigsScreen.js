import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import LoadingComponent from '../components/LoadingComponent'
import DataNotFoundComponent from '../components/DataNotFoundComponent'

import { connect } from 'react-redux'
import { load_gigs } from '../store/storeActions'

class ListGigsScreen extends React.Component {
    static navigationOptions = {
        title: 'Gigs',
    }

    componentDidMount() {
        this.props.load_gigs()
    }

    openGig = gig => {
        this.props.navigation.navigate('TracksOfGigScreen', {
            gig,
        })
    }

    renderGigItem = ({ item }) => (
        <ListItem
            button
            key={item.index}
            leftAvatar={{ source: { uri: item.AvatarUrl } }}
            title={item.Name}
            subtitle={item.Description}
            onPress={() => this.openGig(item)}
            rightIcon={{
                name: 'keyboard-arrow-right',
                type: 'material-design',
                style: { marginRight: 10, fontSize: 20 },
            }}
        />
    )

    render() {
        let gigsList = null

        if (this.props.gigsReducer.gigs == null) {
            return <LoadingComponent itemName="GIGs" />
        }

        if (
            this.props.gigsReducer.gigs != null &&
            this.props.gigsReducer.gigs.length == 0
        ) {
            gigsList = <DataNotFoundComponent dataName="GIGs" />
        } else {
            gigsList = (
                <FlatList
                    data={this.props.gigsReducer.gigs}
                    renderItem={this.renderGigItem}
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
                                    loadGigs: () => this.props.load_gigs(),
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
    load_gigs,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListGigsScreen)
