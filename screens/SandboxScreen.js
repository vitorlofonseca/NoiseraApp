import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

export default class SandboxScreen extends React.Component {
    state = {
        data: [...Array(20)].map((d, index) => ({
            key: `item-${index}`,
            label: index,
        })),
    }

    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        return (
            <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    changeTracksOrder = tracks => {
        this.setState({ data: tracks })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.changeTracksOrder({ data })}
                />
            </View>
        )
    }
}
