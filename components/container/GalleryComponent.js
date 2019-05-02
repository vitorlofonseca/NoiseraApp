import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { ImagePicker } from 'expo'
import GenericButton from '../presentational/GenericButton'

export default class GalleryComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3]})
      .then((userResponse) => {
        if (userResponse.cancelled) {
          return
        }
        this.props.handleImage(userResponse.uri)
        this.setState({image: userResponse.uri})
      })
  }
  render() {

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <GenericButton
          title="Pick an image from camera roll"
          action={this.pickImage}
        />
        {this.state.image &&
          <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

}
