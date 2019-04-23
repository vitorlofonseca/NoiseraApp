import React from 'react'
import {ToastAndroid, Linking} from 'react-native';
import env from '../../env'
import GenericButton from '../../components/presentational/GenericButton'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    }

    doNothing = () => ToastAndroid.show('Nothing...', ToastAndroid.SHORT)

    doRedirect = () => {
      let scopes = 'user-read-private user-read-email'
      let redirect = 'https://www.google.com/'
      Linking.openURL(
        `https://accounts.spotify.com/authorize?response_type=code` +
        `&client_id=${env.spotify.clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect)}'`
      )
    }

    render() {
        return (
          <GenericButton
            action={this.doRedirect}
            title="Login with Spotify"
            color="#1DB954"
            style="round"
            accessibilityLabel="Teu cu" />
        )
    }
}
