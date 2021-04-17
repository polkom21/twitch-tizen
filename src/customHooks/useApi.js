import { useState } from 'react';
import axios from 'axios';
import { config } from '../config';

export default () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const call = (url, method = 'GET', body = undefined) => {
        setLoading(true);
        console.log(config.API_URL);
        axios({
            url: config.API_URL + url,
            method,
            data: body,
            headers: {
                'content-type': 'application/json',
                'client-id': config.CLIENT_ID,
                'Accept': 'application/vnd.twitchtv.v5+json',
            },
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
        })
        .catch(err => {
            setError(err);
            setLoading(false);
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