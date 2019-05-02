import React from 'react'
import GenericInput from '../presentational/GenericInput'
import GenericButton from '../presentational/GenericButton'
import GalleryComponent from './GalleryComponent'
import { View, StyleSheet } from 'react-native';
import { groupInsertStyle } from '../styles/GroupStyles'

export default class GroupInsert extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      photo: ''
    }
  }

  changeGroupName = (userInput) => {
    this.setState({ name: userInput, photo: this.state.photo })
  }

  handleImage = (photo) => {
    this.setState({photo: photo})
  }

  addGroup = () => {
    console.log(this.state)
  }

  render() {
    return (
      <View style={groupInsertStyle.container}>
        <View style={groupInsertStyle.content}>
          <GenericInput
            label="Group Name"
            changeInputHandler={this.changeGroupName}
            valueProp={this.state.name}/>
            <GalleryComponent
              style={groupInsertStyle.fakeDiv}
              handleImage={this.handleImage}
            />
          <GenericButton
            action={this.addGroup}
            color="#4076ce" />
        </View>
      </View>
    )
  }

}
