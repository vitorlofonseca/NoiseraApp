const env = require("../env");
const spotifyUrl = env.spotify.url;

export const SpotifyGet = (requestData) => {
    let endpoint = requestData.endpoint;
    let arrayParametersRequest = requestData.parameters.map(parameter => Object.keys(parameter)[0] + "=" + Object.values(parameter)[0]);
    let stringParametersRequest = arrayParametersRequest.join("&");
    let requestUrl = spotifyUrl + endpoint + '?' + stringParametersRequest;

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + env.spotify.bearer);

    return new Promise((resolve, reject) => {
        fetch(requestUrl, {
            method: 'get',
            headers: myHeaders
        })
        .then((response) => {
            resolve(JSON.parse(response["_bodyInit"]));
        })
        .catch(err => reject(err));
    });
}