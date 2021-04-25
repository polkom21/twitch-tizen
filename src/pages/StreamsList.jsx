import React from 'react'
import PropTypes from 'prop-types'
import useApi from '../customHooks/useApi'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../config';

const StreamsList = props => {
    const { isLoading, data, apiCall } = useApi();
    const userProfile = useSelector(state => state.Auth.profile);

    useEffect(() => {
        if (userProfile?.id)
            apiCall(`/streams?language=${config.LANG}`)
    }, [userProfile?.id])

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {isLoading === true || data === null ? <p>Loading...</p> : data.data.map(stream => <div key={stream.id} style={{ width: 400 }}>
                    <img src={stream.thumbnail_url.replace('{width}', '400').replace('{height}', '225')} alt={stream.user_name} />
                    <p>{stream.title}</p>
                    <p>{stream.user_name}</p>
                    <p>{stream.viewer_count}</p>
                </div>)}
            </div>
        </div>
    )
}

StreamsList.propTypes = {

}

export default StreamsList
