import { config } from "./config";

export function myFetch(url, requestParams) {
    return new Promise((resolve, reject) => {
        if (!requestParams.headers)
            requestParams.headers = {};

        requestParams.headers['Client-ID'] = config.CLIENT_ID

        if(requestParams.body && typeof requestParams.body === 'object') {
            requestParams.body = JSON.stringify(requestParams.body)
        }

        fetch(config.API_URL + url, requestParams)
        .then(response => {
            console.log(response)
            console.log(Number(String(response.status)[0]) === 2)
            if (Number(String(response.status)[0]) === 2) {
                return response.json()
            } else {

            }
        })
        .then(resJSON => {
            resolve(resJSON)
        })
        .catch(err => {
            reject(err)
        })
    })
}