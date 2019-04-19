import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class LoadingComponent extends React.Component {
    render (){
        return (
            <View>
                <Text style={styles.loadingText}>
                Loading {this.props.itemName}...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        paddingTop: 30
    }
});