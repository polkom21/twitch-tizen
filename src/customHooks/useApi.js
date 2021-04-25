import { useState } from 'react';
import axios from 'axios';
import { config } from '../config';

export const apiCall = (url, method = 'GET', body = undefined) => {
    return new Promise((resolve, reject) => {
        const headers = {
            'content-type': 'application/json',
            'client-id': config.CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
        }

        if (localStorage.getItem('authToken')) {
            headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`
        }

        axios({
            url: config.API_URL + url,
            method,
            data: body,
            headers,
            // onDownloadProgress: (progressEvent) => {
            //     // console.log(progressEvent)
            //     setProgress(progressEvent.loaded / (progressEvent.total || progressEvent.loaded) * 100)
            // },
            // onUploadProgress: (progressEvent) => {
            //     // console.log(progressEvent)
            //     setProgress(progressEvent.loaded / (progressEvent.total || progressEvent.loaded) * 100);
            // }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export default () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const call = (url, method = 'GET', body = undefined) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            console.log(config.API_URL);

            const headers = {
                'content-type': 'application/json',
                'client-id': config.CLIENT_ID,
                'Accept': 'application/vnd.twitchtv.v5+json',
            }

            if (localStorage.getItem('authToken')) {
                headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`
            }

            axios({
                url: config.API_URL + url,
                method,
                data: body,
                headers,
                onDownloadProgress: (progressEvent) => {
                    // console.log(progressEvent)
                    setProgress(progressEvent.loaded / (progressEvent.total || progressEvent.loaded) * 100)
                },
                onUploadProgress: (progressEvent) => {
                    // console.log(progressEvent)
                    setProgress(progressEvent.loaded / (progressEvent.total || progressEvent.loaded) * 100);
                }
            })
                .then(res => {
                    setResponse(res.data);
                    setLoading(false);
                    resolve(res.data)
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                    reject(err)
                })
        })
    }

    return {
        isLoading: loading,
        progress,
        data: response,
        error,
        apiCall: call,
    };
}