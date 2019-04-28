import { getTokens } from '../auth/getTokens'
import { encode as btoa } from 'base-64'

const env = require('../env')

export const refreshTokens = async () => {
    try {
        const spotifyAccessData = env.spotify
        const credsB64 = btoa(
            `${spotifyAccessData.clientId}:${spotifyAccessData.clientSecret}`
        )
        const refreshToken = spotifyAccessData.refreshToken
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        })
        const responseJson = await response.json()

        if (responseJson.error) {
            await getTokens()
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson

            const expirationTime = new Date().getTime() + expiresIn * 1000
            env.spotify.expirationTime = expirationTime
            env.spotify.accessToken = newAccessToken
            if (newRefreshToken) {
                env.spotify.refreshToken = newRefreshToken
            }
        }
    } catch (err) {
        console.error(err)
    }
}
