import React from 'react'
import { Button, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  holder: {
    borderRadius: 20,
    marginTop: 30
  }
})

export default class GenericButton extends React.Component {

    render() {
        return(
          <View style={styles.holder}>
            <Button
              onPress={this.props.action}
              title={this.props.title}
              color={this.props.color}
              accessibilityLabel={this.props.accessibilityLabel} />
          </View>
        )
    }
}
