import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const LoadingComponent = (props) => {
    return (
        <View>
            <Text style={styles.loadingText}>
            Loading {props.itemName}...
            </Text>
        </View>
        );
};

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        paddingTop: 30
    }
});

export default LoadingComponent;