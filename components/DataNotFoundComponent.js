import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const DataNotFoundComponent = props => {
    return (
        <View>
            <Text style={styles.noDataFoundText}>
                {props.dataName} not found
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noDataFoundText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
})

export default DataNotFoundComponent
