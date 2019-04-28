import { encode as btoa } from 'base-64'
import { getAuthorizationCode } from '../auth/getRedirectUrl'
const env = require('../env')

export const getTokens = async () => {
    try {
        const authorizationCode = await getAuthorizationCode()
        const spotifyAccessData = env.spotify
        const credsB64 = btoa(
            `${spotifyAccessData.clientId}:${spotifyAccessData.clientSecret}`
        )
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                spotifyAccessData.redirectUri
            }`,
        })
        const responseJson = await response.json()

        // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson

        const expirationTime = new Date().getTime() + expiresIn * 1000
        env.spotify.accessToken = accessToken
        env.spotify.refreshToken = refreshToken
        env.spotify.expirationTime = expirationTime
    } catch (err) {
        console.error(err)
    }
}
