import React from 'react'
import PropTypes from 'prop-types'
import { config } from '../config'
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, AuthStatus } from '../features/Auth'
import { useSelector } from 'react-redux'
import { parseHash } from '../helpers'

const claims = {
    "id_token": {
        "email_verified": null,
    }
}


const LoginPage = props => {
    const requestParams = useLocation();

    const authStatus = useSelector(state => state.Auth.status)
    const dispatch = useDispatch();
    
    useEffect(() => {
        const params = parseHash(requestParams.hash.substr(1));
        console.log(params);
        if (params.access_token) {
            dispatch(login(params.access_token))
        }
    }, [])

    if (authStatus === AuthStatus.LOGGED_IN)
        return <Redirect to="/" />

    return (
        <div>
            <h1>LoginPage</h1>
            <a href={`https://id.twitch.tv/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http://localhost:3000/login&response_type=token+id_token&scope=viewing_activity_read+openid&claims=${JSON.stringify(claims)}`}>Zaloguj się</a>
        </div>
    )
}

LoginPage.propTypes = {

}

export default LoginPage
