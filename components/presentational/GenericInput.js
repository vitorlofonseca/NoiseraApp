import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native';

const defaultStyle = { height: 40, width: 300,  borderColor: 'blue', borderWidth: 2 }

export default class GenericInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {text: this.props.placeholder || ''}
  }

  changeInputText = this.props.changeInputHandler

  render() {
    return (
      <View>
        <Text>{this.props.label}</Text>
        <TextInput
          style={this.props.style || defaultStyle}
          onChangeText={(userInput) => this.changeInputText(userInput)}
          value={this.props.valueProp} />
      </View>
    )
  }
}
